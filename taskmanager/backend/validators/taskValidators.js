const { body } = require('express-validator');

const createTaskValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').optional().isString().trim(),
  body('status')
    .optional()
    .isIn(['pending', 'completed'])
    .withMessage('Invalid status')
];

const updateTaskValidation = [
  body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
  body('description').optional().isString().trim(),
  body('status')
    .optional()
    .isIn(['pending', 'completed'])
    .withMessage('Invalid status')
];

module.exports = { createTaskValidation, updateTaskValidation };
