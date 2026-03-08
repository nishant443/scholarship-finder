import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

function ScholarshipDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [scholarship, setScholarship] = useState(null);
    const [saved, setSaved] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

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
            setToastMessage('Scholarship saved successfully');
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
                navigate('/dashboard');
            }, 1500);
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to save scholarship';
            setToastMessage(message);
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
        }
    };

    if (!scholarship) return <div className="text-center py-20">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 relative">
            {showToast && (
                <div className="fixed top-4 inset-x-0 flex justify-center z-50">
                    <div className="toast-slide-down bg-green-600 text-white px-4 py-2 rounded-full shadow-lg">
                        {toastMessage}
                    </div>
                </div>
            )}
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