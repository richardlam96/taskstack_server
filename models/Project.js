const mongoose = require('mongoose');
const db = require('.');


var projectSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  timeslice: {
    type: Number,
    required: true,
  },
});

projectSchema.pre('remove', async function(next) {
  try {
    await db.Task.remove({ _id: {$in: this.tasks} });
  } catch(error) {
    next(error);
  }
});


module.exports = mongoose.model('Project', projectSchema);
