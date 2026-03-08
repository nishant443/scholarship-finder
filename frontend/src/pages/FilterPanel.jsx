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