const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  indexProjects,
  createProject,
} = require('../handlers/project');


router.route('/')
  .get(indexProjects)
  .post(createProject);

router.route('/:projectId')
  .get


module.exports = router;
