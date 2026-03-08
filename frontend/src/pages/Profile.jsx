import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

function Profile() {
    const { user, updateProfile } = useAuth();
    const [showToast, setShowToast] = useState(false);
    const [formData, setFormData] = useState({
        education: '',
        field: '',
        state: '',
        category: '',
        income: '',
        gender: 'Female'
    });

    useEffect(() => {
        if (user?.profile) {
            setFormData(prev => ({
                ...prev,
                ...user.profile,
                gender: 'Female'
            }));
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await updateProfile(formData);
        if (result.success) {
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-8 relative">
            {showToast && (
                <div className="fixed top-4 inset-x-0 flex justify-center z-50">
                    <div className="toast-slide-down bg-green-600 text-white px-4 py-2 rounded-full shadow-lg">
                        Profile updated successfully
                    </div>
                </div>
            )}
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
                    <input
                        type="text"
                        value="Female"
                        disabled
                        className="input-field bg-gray-100 cursor-not-allowed"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        This platform is exclusively for girls/women, so gender is fixed as Female.
                    </p>
                </div>
                <button type="submit" className="w-full btn-primary">Save Profile</button>
            </form>
        </div>
    );
}

export default Profile;