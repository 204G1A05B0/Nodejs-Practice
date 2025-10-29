import express from 'express';

import {
  addtask,
  deletetask,
  updatetask,
  getall,
  completedtasks,
} from '../controller/taskController.js';
const router = express.Router();

router.route('/').post(addtask).get(getall);
router.route('/:id').delete(deletetask).patch(updatetask);
router.get('/checked', completedtasks);

export default router;
