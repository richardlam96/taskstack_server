const mongoose = require('mongoose');


var taskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
  },
});


module.exports = mongoose.model('Task', taskSchema);
