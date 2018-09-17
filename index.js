require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

// Route imports.
const authRoutes = require('./routes/auth');

// Middleware imports.
const { errorHandler } = require('./handlers/errorHandler');


// Configuration.
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);

// Default error handlers.
app.use(function(req, res, next) {
  let error = new Error('Path not found');
  error.status = 404;
  next(error);
});

app.use(errorHandler);


app.listen(process.env.IP, process.env.PORT, () => {
  console.log(`<${arguments[0]}:${arguments[1]}> TaskStack server`);
});
