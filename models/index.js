const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGODB_DEV, {
  keepAlive: true,
});

module.exports.User = require('./User');
module.exports.Project = require('./Project');
module.exports.Task = require('./Task');
