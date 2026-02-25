const { validationResult } = require('express-validator');
const Task = require('../models/Task');
const asyncHandler = require('../middleware/asyncHandler');
const ApiError = require('../utils/ApiError');

// Build dynamic query based on filters
const buildTaskQuery = (userId, { status, search }) => {
  const query = { user: userId };

  if (status) {
    query.status = status;
  }

  if (search) {
    query.title = { $regex: search, $options: 'i' };
  }

  return query;
};

const getTasks = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const status = req.query.status;
  const search = req.query.search;

  const query = buildTaskQuery(req.user._id, { status, search });

  const total = await Task.countDocuments(query);
  const tasks = await Task.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  res.status(200).json({
    success: true,
    data: tasks,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit) || 1
    }
  });
});

const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

  if (!task) {
    throw new ApiError(404, 'Task not found');
  }

  res.status(200).json({ success: true, data: task });
});

const createTask = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, errors.array()[0].msg);
  }

  const { title, description, status } = req.body;

  const task = await Task.create({
    title,
    description,
    status: status || 'pending',
    user: req.user._id
  });

  res.status(201).json({ success: true, data: task });
});

const updateTask = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, errors.array()[0].msg);
  }

  const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

  if (!task) {
    throw new ApiError(404, 'Task not found');
  }

  const { title, description, status } = req.body;

  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (status !== undefined) task.status = status;

  const updatedTask = await task.save();

  res.status(200).json({ success: true, data: updatedTask });
});

const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id
  });

  if (!task) {
    throw new ApiError(404, 'Task not found');
  }

  res.status(200).json({ success: true, message: 'Task deleted' });
});

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};
