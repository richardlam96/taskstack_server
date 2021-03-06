const db = require('../models');


exports.indexProjects = async function(req, res, next) {
  try {
    // Get all user's Projects.
    let projects = await db.Project.find({
      owner: req.params.userId,
    });

    // Normalize data.
    let projectsById = projects.reduce((acc, project) => {
      acc[project._id] = project;
      return acc;
    }, {});

    let projectIds = Object.keys(projectsById);

    return res.status(200).json({
      projectsById,
      projectIds,
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

    return res.status(200).json({
      ...project.toObject(),
    });
  
  } catch(error) {
    next(error);
  }
}

exports.deleteProject = async function(req, res, next) {
  try {
    // Attempt to delete the given project.
    let deletedProject = await db.Project.findOneAndDelete({
      _id: req.params.projectId,
    });

    return res.status(200).json({
      ...deletedProject.toObject(),
    });

  } catch(error) {
    next(error);
  }
}


exports.updateProject = async function(req, res, next) {
  try {
    // Find task by id, update it, and return the new version.
    let project = await db.Project.findOneAndUpdate(
      { _id: req.params.projectId }, 
      req.body,
      { new: true }
    );

    return res.status(200).json({
      ...project.toObject(),
    });
  
  } catch(error) {
    next(error);
  }
}

     
