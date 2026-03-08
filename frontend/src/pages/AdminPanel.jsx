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
                    <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="input-field" required />
                </div>
                <div>
                    <label className="label">Description</label>
                    <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="input-field" rows="4" required />
                </div>
                <div>
                    <label className="label">Amount</label>
                    <input type="text" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} className="input-field" placeholder="e.g., ₹50,000" required />
                </div>
                <div>
                    <label className="label">Deadline</label>
                    <input type="date" value={formData.deadline} onChange={(e) => setFormData({ ...formData, deadline: e.target.value })} className="input-field" required />
                </div>
                <div>
                    <label className="label">Application Link</label>
                    <input type="url" value={formData.link} onChange={(e) => setFormData({ ...formData, link: e.target.value })} className="input-field" />
                </div>
                <div>
                    <label className="label">Provider</label>
                    <select value={formData.provider} onChange={(e) => setFormData({ ...formData, provider: e.target.value })} className="input-field">
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