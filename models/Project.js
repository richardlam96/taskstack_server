const mongoose = require('mongoose');


var projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  timeslice: {
    type: Number,
    required: true,
  },
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
  }],
});


module.exports = mongoose.model('Project', projectSchema);
