const Scholarship = require('../models/Scholarship');
const User = require('../models/User');
const { calculateMatchScore } = require('../utils/matchScore');

exports.getScholarships = async (req, res) => {
  try {
    const { education, field, state, category, provider, search } = req.query;
    
    let filter = {};
    
    if (education) filter['eligibility.education'] = education;
    if (field) filter['eligibility.field'] = { $in: [field, 'Any'] };
    if (state) filter['eligibility.state'] = { $in: [state, 'All India'] };
    if (category) filter['eligibility.category'] = { $in: [category, 'All'] };
    if (provider) filter.provider = provider;
    
    if (search) {
      filter.$text = { $search: search };
    }
    
    const scholarships = await Scholarship.find(filter)
      .sort({ deadline: 1 }); // Sort by deadline (earliest first)
    
    res.json({ 
      success: true, 
      count: scholarships.length,
      scholarships 
    });
  } catch (error) {
    console.error('Get Scholarships Error:', error);
    res.status(500).json({ message: 'Server error fetching scholarships' });
  }
};

exports.getMatchedScholarships = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user.profile || !user.profile.education) {
      return res.status(400).json({ 
        message: 'Please complete your profile to get matched scholarships',
        profileComplete: false
      });
    }
    
    const allScholarships = await Scholarship.find();
    
    const matchedScholarships = allScholarships
      .map(scholarship => {
        const score = calculateMatchScore(user.profile, scholarship.eligibility);
        return {
          ...scholarship.toObject(),
          matchScore: score
        };
      })
      .filter(s => s.matchScore > 0) // Only show eligible scholarships
      .sort((a, b) => b.matchScore - a.matchScore); // Sort by highest match first
    
    res.json({ 
      success: true, 
      count: matchedScholarships.length,
      scholarships: matchedScholarships 
    });
  } catch (error) {
    console.error('Get Matched Scholarships Error:', error);
    res.status(500).json({ message: 'Server error fetching matched scholarships' });
  }
};

exports.getScholarshipById = async (req, res) => {
  try {
    const scholarship = await Scholarship.findById(req.params.id);
    
    if (!scholarship) {
      return res.status(404).json({ message: 'Scholarship not found' });
    }
    
    res.json({ success: true, scholarship });
  } catch (error) {
    console.error('Get Scholarship Error:', error);
    res.status(500).json({ message: 'Server error fetching scholarship' });
  }
};

exports.createScholarship = async (req, res) => {
  try {
    const scholarship = await Scholarship.create(req.body);
    
    res.status(201).json({ 
      success: true, 
      message: 'Scholarship created successfully',
      scholarship 
    });
  } catch (error) {
    console.error('Create Scholarship Error:', error);
    res.status(500).json({ message: 'Server error creating scholarship' });
  }
};

exports.updateScholarship = async (req, res) => {
  try {
    const scholarship = await Scholarship.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!scholarship) {
      return res.status(404).json({ message: 'Scholarship not found' });
    }
    
    res.json({ 
      success: true, 
      message: 'Scholarship updated successfully',
      scholarship 
    });
  } catch (error) {
    console.error('Update Scholarship Error:', error);
    res.status(500).json({ message: 'Server error updating scholarship' });
  }
};

exports.deleteScholarship = async (req, res) => {
  try {
    const scholarship = await Scholarship.findByIdAndDelete(req.params.id);
    
    if (!scholarship) {
      return res.status(404).json({ message: 'Scholarship not found' });
    }
    
    res.json({ 
      success: true, 
      message: 'Scholarship deleted successfully' 
    });
  } catch (error) {
    console.error('Delete Scholarship Error:', error);
    res.status(500).json({ message: 'Server error deleting scholarship' });
  }
};

exports.getStats = async (req, res) => {
  try {
    const totalScholarships = await Scholarship.countDocuments();
    
    const byProvider = await Scholarship.aggregate([
      { $group: { _id: '$provider', count: { $sum: 1 } } }
    ]);
    
    const byField = await Scholarship.aggregate([
      { $unwind: '$eligibility.field' },
      { $group: { _id: '$eligibility.field', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);
    
    res.json({
      success: true,
      stats: {
        total: totalScholarships,
        byProvider,
        topFields: byField
      }
    });
  } catch (error) {
    console.error('Get Stats Error:', error);
    res.status(500).json({ message: 'Server error fetching statistics' });
  }
};
