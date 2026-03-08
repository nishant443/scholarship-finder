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