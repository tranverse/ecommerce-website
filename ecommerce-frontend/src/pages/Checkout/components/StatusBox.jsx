import React from 'react';

const StatusBox = ({ Icon, name, time }) => {
    return (
        <div className="flex flex-col items-center gap-4 bg-white    text-gray-700 z-50 relative ">
            
            <div className="rounded-full w-16 h-16  flex items-center justify-center  border-4 border-green-500">
                <Icon className="text-3xl text-green-500 font-semibold   " />
            </div>
            <div className="text-center ">
                <p>{name}</p>
                <p className="text-sm text-gray-400 ">{time}</p>
            </div>
        </div>
    );
};

export default StatusBox;
