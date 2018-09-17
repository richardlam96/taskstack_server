const mongoose = require('mongoose');
const db = require('.');


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

projectSchema.pre('remove', async function(next) {
  try {
    await db.Task.remove({ _id: {$in: this.tasks} });
  } catch(error) {
    next(error);
  }
});


module.exports = mongoose.model('Project', projectSchema);
