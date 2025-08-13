import React from 'react';
import { IoIosSearch } from 'react-icons/io';

const SearchItem = ({ placeholder, value, onChange }) => {

    return (
        <div className="flex flex-col justify-center  ">
            <p className="text-sm text-gray-700 mb-1 ">Tìm kiếm</p>
            <div className="flex relative">
                <input
                    type="text"
                    name=""
                    onChange={(e) => onChange(e)}
                    value={value}
                    className="border border-gray-300 w-full p-1 rounded outline-none px-2 focus:ring-2 focus:ring-[var(--primary)]/40 "
                    placeholder={placeholder}
                    id=""
                />
                <IoIosSearch className="absolute right-2 top-1/2  -translate-y-1/2  text-lg" />
            </div>
        </div>
    );
};

export default SearchItem;
