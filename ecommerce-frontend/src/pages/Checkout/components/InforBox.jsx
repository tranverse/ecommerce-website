import React from 'react';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { CiUser } from 'react-icons/ci';
const InforBox = () => {
    return (
        <div>
            <div className="bg-white shadow-lg  p-4 flex flex-col gap-4 ">
                <div className="flex gap-4 items-center   ">
                    <img src="" className="rounded-full w-12 h-12 border border-gray-300   " alt="" />
                    <p>Alice</p>
                    <p></p>
                </div>
                <div className=" flex flex-col gap-4  ">
                    <div className="flex gap-2 items-center ">
                        <IoIosNotificationsOutline className="text-2xl" />
                        Notification
                    </div>
                    <div className="flex gap-2 items-center ">
                        <CiUser className="text-2xl" />
                        My account
                    </div>{' '}
                </div>
            </div>
        </div>
    );
};

export default InforBox;
