const Application = require('../models/Application');
const Scholarship = require('../models/Scholarship');

exports.saveScholarship = async (req, res) => {
  try {
    const { scholarshipId } = req.body;
    
    const scholarship = await Scholarship.findById(scholarshipId);
    if (!scholarship) {
      return res.status(404).json({ message: 'Scholarship not found' });
    }
    
    const existing = await Application.findOne({
      user: req.user.id,
      scholarship: scholarshipId
    });
    
    if (existing) {
      return res.status(400).json({ message: 'Scholarship already saved' });
    }
    
    const application = await Application.create({
      user: req.user.id,
      scholarship: scholarshipId,
      status: 'saved'
    });
    
    const populatedApp = await Application.findById(application._id).populate('scholarship');
    
    res.status(201).json({ 
      success: true, 
      message: 'Scholarship saved successfully',
      application: populatedApp 
    });
  } catch (error) {
    console.error('Save Scholarship Error:', error);
    res.status(500).json({ message: 'Server error saving scholarship' });
  }
};

exports.getUserApplications = async (req, res) => {
  try {
    const { status } = req.query;
    
    let filter = { user: req.user.id };
    if (status) filter.status = status;
    
    const applications = await Application.find(filter)
      .populate('scholarship')
      .sort('-createdAt');
    
    res.json({ 
      success: true, 
      count: applications.length,
      applications 
    });
  } catch (error) {
    console.error('Get Applications Error:', error);
    res.status(500).json({ message: 'Server error fetching applications' });
  }
};

exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;
    
    const updateData = { status, notes };
    
    if (status === 'applied') {
      updateData.appliedAt = new Date();
    }
    
    const application = await Application.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      updateData,
      { new: true, runValidators: true }
    ).populate('scholarship');
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    res.json({ 
      success: true, 
      message: 'Application updated successfully',
      application 
    });
  } catch (error) {
    console.error('Update Application Error:', error);
    res.status(500).json({ message: 'Server error updating application' });
  }
};

exports.deleteApplication = async (req, res) => {
  try {
    const application = await Application.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    res.json({ 
      success: true, 
      message: 'Scholarship removed from saved list' 
    });
  } catch (error) {
    console.error('Delete Application Error:', error);
    res.status(500).json({ message: 'Server error deleting application' });
  }
};

exports.getApplicationStats = async (req, res) => {
  try {
    const stats = await Application.aggregate([
      { $match: { user: req.user.id } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    
    const upcomingDeadlines = await Application.find({ 
      user: req.user.id,
      status: { $in: ['saved', 'in-progress'] }
    })
      .populate('scholarship')
      .sort('scholarship.deadline')
      .limit(5);
    
    res.json({
      success: true,
      stats: {
        byStatus: stats,
        upcomingDeadlines: upcomingDeadlines.map(app => ({
          scholarship: app.scholarship.name,
          deadline: app.scholarship.deadline,
          daysLeft: Math.ceil((new Date(app.scholarship.deadline) - new Date()) / (1000 * 60 * 60 * 24))
        }))
      }
    });
  } catch (error) {
    console.error('Get Stats Error:', error);
    res.status(500).json({ message: 'Server error fetching stats' });
  }
};
