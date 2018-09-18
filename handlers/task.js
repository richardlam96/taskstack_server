const db = require('../models');


exports.indexTasks = async function(req, res, next) {
  try {
    // Find tasks with project id.
    let tasks = await db.Task.find({
      project: req.params.projectId,
    });

    // Transform into normalized format.
    let tasksById = tasks.reduce((acc, task) => {
      acc[task._id] = task;
      return acc;
    }, {});

    let taskIds = Object.keys(tasksById);

    return res.status(200).json({
      tasksById,
      taskIds,
    });
  
  } catch(error) {
    next(error);
  }
}


exports.createTask = async function(req, res, next) {
  try {
    // Create task with data in body and project id in params.
    let task = await db.Task.create({
      project: req.params.projectId,
      ...req.body,
    });

    return res.status(200).json({
      ...task.toObject(),
    });

  } catch(error) {
    next(error);
  }
}


exports.deleteTask = async function(req, res, next) {
  try {
    // Delete task given the task's id.
    let task = await db.Task.findOneAndDelete({
      _id: req.params.taskId,
    });

    return res.status(200).json({
      ...task.toObject(),
    });

  } catch(error) {
    next(error);
  }
}


exports.updateTask = async function(req, res, next) {
  try {
    // Find task by id, update it, and return the new version.
    let task = await db.Task.findOneAndUpdate(
      { _id: req.params.taskId }, 
      req.body,
      { new: true }
    );

    return res.status(200).json({
      ...task.toObject(),
    });
  
  } catch(error) {
    next(error);
  }
}


