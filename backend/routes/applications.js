const express = require('express');
const router = express.Router();
const {
  saveScholarship,
  getUserApplications,
  updateApplicationStatus,
  deleteApplication,
  getApplicationStats
} = require('../controllers/applicationController');
const { authMiddleware } = require('../middleware/auth');

router.post('/save', authMiddleware, saveScholarship);
router.get('/', authMiddleware, getUserApplications);
router.get('/stats', authMiddleware, getApplicationStats);
router.put('/:id', authMiddleware, updateApplicationStatus);
router.delete('/:id', authMiddleware, deleteApplication);

module.exports = router;
