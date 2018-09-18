const express = require('express');
const router = express.Router({ mergeParams: true });

const {
  indexTasks,
  createTask,
  deleteTask,
  updateTask,
} = require('../handlers/task');


router.route('/')
  .get(indexTasks)
  .post(createTask);

router.route('/:taskId')
  .delete(deleteTask)
  .put(updateTask);


module.exports = router;
