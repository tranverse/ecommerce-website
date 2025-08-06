import React from 'react';
import { MdNotificationsNone } from "react-icons/md";
import { LuMessageCircle } from "react-icons/lu";
import Logo from '@assets/images/Logo/Logo.png';

const AdminHeader = () => {
    return (
        <div className="shadow px-10 py-3 border border-gray-200 fixed left-60 right-0  z-10 ">
            <div className="flex justify-between gap-5 items-center">
                <div className='flex-1 '>
                    <input type="text" className="border w-90 outline-none px-2 py-1 border-gray-300" placeholder='Type to search...' />
                </div>

                <div className='flex border gap-4 text-2xl items-center'>
                    <div>
                        <MdNotificationsNone />
                    </div>
                    <div>
                        <LuMessageCircle />
                    </div>
                </div>
                <div className=' flex items-center gap-4'>
                    <div>
                        <img src={Logo} className='rounded-full w-10 h-10' alt="" />
                    </div>
                    <div>
                        <p>Json</p>
                        <p>Admin</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHeader;
