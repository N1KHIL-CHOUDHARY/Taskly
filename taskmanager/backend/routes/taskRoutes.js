const express = require('express');
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');
const { createTaskValidation, updateTaskValidation } = require('../validators/taskValidators');

const router = express.Router();

router.use(protect);

router.route('/').get(getTasks).post(createTaskValidation, createTask);
router
  .route('/:id')
  .get(getTaskById)
  .put(updateTaskValidation, updateTask)
  .delete(deleteTask);

module.exports = router;
