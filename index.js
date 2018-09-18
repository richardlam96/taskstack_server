require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

// Route imports.
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/project');
const taskRoutes = require('./routes/task');

// Utility and Middleware imports.
const { errorHandler } = require('./handlers/error');
const { loginRequired, ensureCorrectUser } = require('./middleware/auth');


// Configuration.
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/users/:userId/projects', projectRoutes);
app.use('/api/users/:userId/projects/:projectId/tasks', taskRoutes);

// Default error handlers.
app.use(function(req, res, next) {
  let error = new Error('Path not found');
  error.status = 404;
  next(error);
});

app.use(errorHandler);


app.listen(process.env.PORT, process.env.IP, () => {
  console.log(`<${process.env.IP}:${process.env.PORT}> TaskStack server`);
});
