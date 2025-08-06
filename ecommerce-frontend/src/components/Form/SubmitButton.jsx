import React from 'react';

const SubmitButton = ({ children, className, onClick, type }) => {
    return (
        <button
            onClick={onClick}
            type={type}
            className={`w-full bg-[var(--primary)] text-white p-1  cursor-pointer ${className}  `}
        >
            {children}
        </button>
    );
};

export default SubmitButton;
