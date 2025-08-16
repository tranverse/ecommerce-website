import React from 'react';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { CiUser } from 'react-icons/ci';
import { useSelector } from 'react-redux';

const InforBox = () => {
    const customer = useSelector((state) => state.customer.customer)
    
    return (
        <div className="sticky top-32">
            <div className="bg-white shadow-lg rounded-lg p-5 flex flex-col gap-6">
                {/* User Info */}
                <div className="flex items-center gap-4">
                    <img
                        src="https://via.placeholder.com/48"
                        alt="avatar"
                        className="w-12 h-12 rounded-full border border-gray-300 object-cover"
                    />
                    <div className="flex flex-col">
                        <p className="font-semibold text-gray-800 text-lg">{customer?.name}</p>
                        <p className="text-gray-500 text-sm">Welcome back!</p>
                    </div>
                </div>

                {/* Menu Options */}
                <div className="flex flex-col gap-3">

                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 cursor-pointer transition">
                        <CiUser className="text-2xl text-blue-500" />
                        <span className="text-gray-700 font-medium">My Account</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InforBox;
