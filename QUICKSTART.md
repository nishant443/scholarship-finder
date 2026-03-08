# QUICKSTART GUIDE - Missing Page Files

After downloading the project, you need to manually create these remaining page files in `/frontend/src/pages/`:

## 1. ScholarshipList.jsx
```jsx
import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import ScholarshipCard from '../components/ScholarshipCard';

function ScholarshipList() {
  const [scholarships, setScholarships] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchScholarships();
  }, [filters]);

  const fetchScholarships = async () => {
    try {
      const { data } = await api.get('/scholarships', { params: filters });
      setScholarships(data.scholarships);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Browse Scholarships</h1>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scholarships.map(scholarship => (
            <ScholarshipCard key={scholarship._id} scholarship={scholarship} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ScholarshipList;
```

## 2. ScholarshipDetail.jsx
```jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

function ScholarshipDetail() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [scholarship, setScholarship] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchScholarship();
  }, [id]);

  const fetchScholarship = async () => {
    try {
      const { data } = await api.get(`/scholarships/${id}`);
      setScholarship(data.scholarship);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    try {
      await api.post('/applications/save', { scholarshipId: id });
      setSaved(true);
      alert('Scholarship saved!');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to save');
    }
  };

  if (!scholarship) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-4">{scholarship.name}</h1>
        <div className="prose max-w-none mb-6">
          <p>{scholarship.description}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="font-semibold mb-2">Amount</h3>
            <p className="text-green-600 font-bold">{scholarship.amount}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Deadline</h3>
            <p>{new Date(scholarship.deadline).toLocaleDateString()}</p>
          </div>
        </div>
        {isAuthenticated && (
          <button onClick={handleSave} disabled={saved} className="btn-primary">
            {saved ? 'Saved ✓' : 'Save Scholarship'}
          </button>
        )}
        {scholarship.link && (
          <a href={scholarship.link} target="_blank" rel="noopener noreferrer" className="btn-primary ml-3">
            Apply Now →
          </a>
        )}
      </div>
    </div>
  );
}

export default ScholarshipDetail;
```

## 3. Profile.jsx
```jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

function Profile() {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    education: '',
    field: '',
    state: '',
    category: '',
    income: '',
    gender: ''
  });

  useEffect(() => {
    if (user?.profile) {
      setFormData(user.profile);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await updateProfile(formData);
    if (result.success) {
      alert('Profile updated!');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow space-y-4">
        <div>
          <label className="label">Education Level</label>
          <select value={formData.education} onChange={(e) => setFormData({...formData, education: e.target.value})} className="input-field">
            <option value="">Select...</option>
            <option value="10th">10th</option>
            <option value="12th">12th</option>
            <option value="UG">Undergraduate</option>
            <option value="PG">Postgraduate</option>
          </select>
        </div>
        <div>
          <label className="label">Field of Study</label>
          <input type="text" value={formData.field} onChange={(e) => setFormData({...formData, field: e.target.value})} className="input-field" placeholder="e.g., Engineering" />
        </div>
        <div>
          <label className="label">State</label>
          <input type="text" value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})} className="input-field" />
        </div>
        <div>
          <label className="label">Category</label>
          <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="input-field">
            <option value="">Select...</option>
            <option value="General">General</option>
            <option value="SC">SC</option>
            <option value="ST">ST</option>
            <option value="OBC">OBC</option>
            <option value="EWS">EWS</option>
          </select>
        </div>
        <div>
          <label className="label">Annual Family Income (₹)</label>
          <input type="number" value={formData.income} onChange={(e) => setFormData({...formData, income: e.target.value})} className="input-field" />
        </div>
        <div>
          <label className="label">Gender</label>
          <select value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})} className="input-field">
            <option value="">Select...</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button type="submit" className="w-full btn-primary">Save Profile</button>
      </form>
    </div>
  );
}

export default Profile;
```

## 4. AdminPanel.jsx
```jsx
import React, { useState } from 'react';
import api from '../utils/api';

function AdminPanel() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    amount: '',
    deadline: '',
    link: '',
    provider: 'Government'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/scholarships', formData);
      alert('Scholarship created!');
      setFormData({ name: '', description: '', amount: '', deadline: '', link: '', provider: 'Government' });
    } catch (error) {
      alert('Failed to create scholarship');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Panel - Add Scholarship</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow space-y-4">
        <div>
          <label className="label">Scholarship Name</label>
          <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="input-field" required />
        </div>
        <div>
          <label className="label">Description</label>
          <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="input-field" rows="4" required />
        </div>
        <div>
          <label className="label">Amount</label>
          <input type="text" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} className="input-field" placeholder="e.g., ₹50,000" required />
        </div>
        <div>
          <label className="label">Deadline</label>
          <input type="date" value={formData.deadline} onChange={(e) => setFormData({...formData, deadline: e.target.value})} className="input-field" required />
        </div>
        <div>
          <label className="label">Application Link</label>
          <input type="url" value={formData.link} onChange={(e) => setFormData({...formData, link: e.target.value})} className="input-field" />
        </div>
        <div>
          <label className="label">Provider</label>
          <select value={formData.provider} onChange={(e) => setFormData({...formData, provider: e.target.value})} className="input-field">
            <option value="Government">Government</option>
            <option value="Private">Private</option>
            <option value="University">University</option>
          </select>
        </div>
        <button type="submit" className="w-full btn-primary">Create Scholarship</button>
      </form>
    </div>
  );
}

export default AdminPanel;
```

## 5. FilterPanel.jsx (Optional Component)
```jsx
import React from 'react';

function FilterPanel({ filters, onChange }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-bold mb-4">Filters</h3>
      <div className="space-y-3">
        <select onChange={(e) => onChange('education', e.target.value)} className="w-full input-field">
          <option value="">All Education Levels</option>
          <option value="10th">10th</option>
          <option value="12th">12th</option>
          <option value="UG">Undergraduate</option>
          <option value="PG">Postgraduate</option>
        </select>
        <select onChange={(e) => onChange('provider', e.target.value)} className="w-full input-field">
          <option value="">All Providers</option>
          <option value="Government">Government</option>
          <option value="Private">Private</option>
        </select>
      </div>
    </div>
  );
}

export default FilterPanel;
```

---

## Installation Steps

1. Copy each file content into the respective filename in `/frontend/src/pages/`
2. All components are ready to use
3. Run `npm install` in both backend and frontend
4. Start MongoDB
5. Run backend: `cd backend && npm run seed && npm run dev`
6. Run frontend: `cd frontend && npm run dev`
7. Open http://localhost:5173

Done! 🎉
