const express = require('express');
const router = express.Router();
const {
  getScholarships,
  getMatchedScholarships,
  getScholarshipById,
  getStats
} = require('../controllers/scholarshipController');
const { authMiddleware } = require('../middleware/auth');

router.get('/', getScholarships);
router.get('/stats', getStats);
router.get('/:id', getScholarshipById);

router.get('/matched/me', authMiddleware, getMatchedScholarships);

module.exports = router;
