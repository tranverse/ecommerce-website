import React from 'react';
import { SlArrowLeft } from 'react-icons/sl';

const AdminMenuItem = ({ name, Icon }) => {
    return (
        <div className="flex items-center justify-between gap-4 text-base pl-6 py-3 pr-4 text-gray-700 cursor-pointer">
            <div className="flex items-center gap-3 ">
                <Icon className="text-xl" />
                <p>{name}</p>
            </div>
            <SlArrowLeft />
        </div>
    );
};

export default AdminMenuItem;
