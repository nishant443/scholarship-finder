const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  scholarship: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Scholarship',
    required: true
  },
  status: {
    type: String,
    enum: ['saved', 'applied', 'in-progress', 'accepted', 'rejected'],
    default: 'saved'
  },
  appliedAt: {
    type: Date
  },
  notes: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

applicationSchema.index({ user: 1, scholarship: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);
