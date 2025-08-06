import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '@assets/images/Logo/Logo.png';
import SearchBox from '@layouts/components/SearchBox';
import { CiUser } from 'react-icons/ci';

const HeaderCheckout = ({ name = 'Cart' }) => {
    return (
        <div className="md:mx-auto md:px-10 px-4 py-2  shadow bg-white flex justify-between">
            <div className="flex items-center gap-6 text-[var(--primary)] ">
                <Link to={'/'}>
                    <div className="flex  items-center cursor-pointer">
                        <img src={Logo} alt="Logo" className="h-[50px] w-[70px]" />

                        <p className="text-3xl md:text-4xl- font-bold ml-2">OwnFit</p>
                    </div>
                </Link>
                <p className="border-l px-4 border-[var(--primary)] md:text-3xl">{name}</p>
            </div>
            <div className=" w-2/3 flex items-center  gap-2 ">
                <div className="w-full  flex justify-end">
                    <SearchBox className={'flex justify-end'}></SearchBox>
                </div>
                <div className="p-1">
                    <CiUser className="text-3xl text-[var(--primary)] cursor-pointer" />
                </div>
            </div>  
        </div>
    );
};

export default HeaderCheckout;
