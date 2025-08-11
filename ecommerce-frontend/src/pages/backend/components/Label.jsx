import React from 'react';

const Label = ({ label }) => {
    return (
        <div className="flex items-center gap-2">
            <label className="text-gray-700 text-sm mb-1  ">{label}</label>
            <span className="text-red-500">*</span>
        </div>
    );
};

export default Label;
