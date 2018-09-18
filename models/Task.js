const mongoose = require('mongoose');


var taskSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  },
  description: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
  },
});


module.exports = mongoose.model('Task', taskSchema);
