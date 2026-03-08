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