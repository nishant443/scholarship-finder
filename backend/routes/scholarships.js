const express = require('express');
const router = express.Router();
const {
  getScholarships,
  getMatchedScholarships,
  getScholarshipById,
  createScholarship,
  updateScholarship,
  deleteScholarship,
  getStats
} = require('../controllers/scholarshipController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

router.get('/', getScholarships);
router.get('/stats', getStats);
router.get('/:id', getScholarshipById);

router.get('/matched/me', authMiddleware, getMatchedScholarships);

router.post('/', authMiddleware, adminMiddleware, createScholarship);
router.put('/:id', authMiddleware, adminMiddleware, updateScholarship);
router.delete('/:id', authMiddleware, adminMiddleware, deleteScholarship);

module.exports = router;
