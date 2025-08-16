import React from 'react';

const StatusBox = ({ Icon, name, time, isCompleted, isLast }) => {
    return (
        <div className="flex flex-col items-center relative z-10">
            <div
                className={`w-16 h-16 rounded-full flex items-center justify-center
                border-4 ${isCompleted ? 'border-blue-500 bg-blue-100' : 'border-gray-300 bg-gray-100'}`}
            >
                <Icon className={`text-3xl ${isCompleted ? 'text-blue-500' : 'text-gray-400'}`} />
            </div>

            <div className="text-center mt-2">
                <p className={`font-medium ${isCompleted ? 'text-gray-800' : 'text-gray-500'}`}>{name}</p>
            </div>

            {!isLast && (
                <div
                    className={`absolute top-1/2 left-full w-20 h-1  -translate-y-1/2
                    ${isCompleted ? 'bg-blue-500' : 'bg-gray-300'}`}
                ></div>
            )}
        </div>
    );
};

export default StatusBox;
