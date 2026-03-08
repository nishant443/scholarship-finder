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
                    <select value={formData.education} onChange={(e) => setFormData({ ...formData, education: e.target.value })} className="input-field">
                        <option value="">Select...</option>
                        <option value="10th">10th</option>
                        <option value="12th">12th</option>
                        <option value="UG">Undergraduate</option>
                        <option value="PG">Postgraduate</option>
                    </select>
                </div>
                <div>
                    <label className="label">Field of Study</label>
                    <input type="text" value={formData.field} onChange={(e) => setFormData({ ...formData, field: e.target.value })} className="input-field" placeholder="e.g., Engineering" />
                </div>
                <div>
                    <label className="label">State</label>
                    <input type="text" value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} className="input-field" />
                </div>
                <div>
                    <label className="label">Category</label>
                    <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="input-field">
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
                    <input type="number" value={formData.income} onChange={(e) => setFormData({ ...formData, income: e.target.value })} className="input-field" />
                </div>
                <div>
                    <label className="label">Gender</label>
                    <select value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} className="input-field">
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