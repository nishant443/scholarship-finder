const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6
  },
  role: {
    type: String,
    enum: ['user'],
    default: 'user'
  },
  
  profile: {
    education: {
      type: String,
      enum: ['10th', '12th', 'UG', 'PG', 'PhD', '']
    },
    field: {
      type: String
    },
    state: {
      type: String
    },
    category: {
      type: String,
      enum: ['General', 'SC', 'ST', 'OBC', 'EWS', '']
    },
    income: {
      type: Number
    },
    gender: {
      type: String,
      enum: ['Female'],
      default: 'Female'
    }
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
