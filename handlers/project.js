const db = require('../models');


exports.indexProjects = async function(req, res, next) {
  try {
    // Get all user's Projects.
    let projects = await db.Project.find({
      owner: req.params.userId,
    });

    // Normalize data.
    let projectIds = [];
    let projectsById = projects.reduce((acc, project) => {
      projectIds.push(project._id);
      acc[project._id] = project;
      return acc;
    }, {});

    return res.status(200).json({
      projectIds,
      projectsById,
    });

  } catch(error) {
    next(error);
  }
}

exports.createProject = async function(req, res, next) {
  try {
    // Attempt to create Project.
    let project = await db.Project.create({
      owner: req.params.userId,
      name: req.body.name,
      timeslice: req.body.timeslice,
    });

    let { id, owner, name, timeslice, tasks } = project;
    return res.status(200).json({
      id, name, timeslice, tasks,
    });
  
  } catch(error) {
    next(error);
  }
}

exports.deleteProject = async function(req, res, next) {
  try {
    // Attempt to delete the given project.
    let deletedProject = await db.Project.findOneAndDelete({
      _id: req.params.id,
    });

    let { id, owner, name, timeslice, tasks } = deletedProject;
    return res.status(200).json({
      id, owner, name, timeslice, tasks,
    });

  } catch(error) {
    next(error);
  }
}


      
