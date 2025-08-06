import React from 'react';
import { IoIosArrowDown } from 'react-icons/io';

const VariantBox = ({ color, size, isArrow=true }) => {
    return (
        <div
            className="flex items-center justify-between px-2 border border-gray-300 py-1 text-gray-700 min-w-32   
                                            line-clamp-3 break-words cursor-pointer gap-1 rounded-2xl"
        >
            <p className="text-sm text-center break-words">
                {color.charAt(0).toUpperCase() + color.slice(1)} / {size}
            </p>
            {isArrow && <IoIosArrowDown className="text-sm" />}
        </div>
    );
};

export default VariantBox;
