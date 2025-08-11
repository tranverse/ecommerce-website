import React, { useState } from 'react';
import { SlArrowLeft } from 'react-icons/sl';
import { Link } from 'react-router-dom';
import { SlArrowDown } from 'react-icons/sl';
const AdminMenuItem = ({ name, Icon, childrenMenu, toggleMenu, open }) => {
    const isActive = (path) => {
        return location.pathname == path;
    };

    return (
        <div className=" border-gray-300 text-gray-700 mx-2 my-1  ">
            {name == 'Dashboard' ? (
                <Link to={'/dashboard'}>
                    <div
                        className={`flex items-center justify-between gap-4 text-base pl-4 hover:text-[var(--primary)] font-semibold
                        py-2  pr-4  cursor-pointer hover:bg-purple-50  ${isActive('/dashboard') ? 'bg-purple-50 text-[var(--primary)] ' : ''}
                         `}
                    >
                        <div className={`flex items-center gap-3   `}>
                            <Icon className="text-xl" />
                            <p>{name}</p>
                        </div>
                    </div>
                </Link>
            ) : (
                <div
                    onClick={() => toggleMenu()}
                    className="flex items-center justify-between gap-4 text-base pl-4 hover:text-[var(--primary)] font-semibold
                 py-2  pr-4  cursor-pointer hover:bg-purple-50 "
                >
                    <div className="flex items-center gap-3 ">
                        <Icon className="text-xl" />
                        <p>{name}</p>
                    </div>
                    {open ? <SlArrowDown /> : <SlArrowLeft />}
                </div>
            )}

            <div className="  flex flex-col gap-1  ">
                {open &&
                    childrenMenu?.map((menu, index) => (
                        <div
                            className={`cursor-pointer flex gap-12 py-2   hover:bg-purple-100 hover:text-[var(--primary)] font-semibold 
                            ${isActive(menu.link) ? 'bg-purple-50 text-[var(--primary)] ' : ''}`}
                            key={index}
                        >
                            <div></div>
                            <Link to={`${menu.link}`}>
                                <div>{menu.menu}</div>
                            </Link>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default AdminMenuItem;
