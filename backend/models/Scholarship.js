const mongoose = require('mongoose');

const scholarshipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Scholarship name is required'],
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  amount: {
    type: String
  },
  deadline: {
    type: Date,
    required: true
  },
  link: {
    type: String
  },
  
  eligibility: {
    education: {
      type: [String]
    },
    field: {
      type: [String]
    },
    state: {
      type: [String]
    },
    category: {
      type: [String]
    },
    gender: {
      type: [String]
    },
    maxIncome: {
      type: Number
    }
  },
  
  documents: {
    type: [String]
  },
  
  provider: {
    type: String,
    enum: ['Government', 'Private', 'University'],
    default: 'Government'
  },
  
  benefits: {
    type: String
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  }
});

scholarshipSchema.index({ name: 'text', description: 'text' });
scholarshipSchema.index({ deadline: 1 });

module.exports = mongoose.model('Scholarship', scholarshipSchema);
