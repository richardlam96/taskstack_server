const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  indexProjects,
  createProject,
  deleteProject,
  updateProject,
} = require('../handlers/project');


router.route('/')
  .get(indexProjects)
  .post(createProject);

router.route('/:projectId')
  .delete(deleteProject)
  .put(updateProject);


module.exports = router;
