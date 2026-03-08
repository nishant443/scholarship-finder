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
                        <option value="6th">6th</option>
                        <option value="7th">7th</option>
                        <option value="8th">8th</option>
                        <option value="9th">9th</option>
                        <option value="10th">10th</option>
                        <option value="11th">11th</option>
                        <option value="12th">12th</option>
                        <option value="UG">Undergraduate</option>
                        <option value="PG">Postgraduate</option>
                    </select>
                </div>
                <div>
                    <label className="label">Field of Study</label>
                    <select
                        value={formData.field}
                        onChange={(e) => setFormData({ ...formData, field: e.target.value })}
                        className="input-field"
                    >
                        <option value="">Select...</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Medicine">Medicine</option>
                        <option value="Science">Science</option>
                        <option value="Arts">Arts</option>
                        <option value="Commerce">Commerce</option>
                        <option value="Law">Law</option>
                        <option value="Management">Management</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div>
                    <label className="label">State</label>
                    <select
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="input-field"
                    >
                        <option value="">Select...</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Mizoram">Mizoram</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Odisha">Odisha</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Sikkim">Sikkim</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Uttarakhand">Uttarakhand</option>
                        <option value="West Bengal">West Bengal</option>
                        <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                        <option value="Ladakh">Ladakh</option>
                        <option value="Lakshadweep">Lakshadweep</option>
                        <option value="Puducherry">Puducherry</option>
                    </select>
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