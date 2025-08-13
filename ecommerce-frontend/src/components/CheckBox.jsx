import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa6';

const CheckBox = ({ item, setChosenItem, chosenItem, showItem }) => {
    const isSelectAll = Array.isArray(item);
    const isChecked = isSelectAll ? chosenItem?.length === showItem?.length : chosenItem?.some((order) => order?.id === item?.id);

    const handleInputChange = () => {
        if (isSelectAll) {
            if (isChecked) {
                setChosenItem([]);
            } else {
                setChosenItem(item);
            }
        } else if (item.length > 1 && chosenItem.length > 0) {
            setChosenItem([]);
        } else {
            if (isChecked) {
                setChosenItem((order) => order.filter((o) => o.id != item.id));
            } else {
                setChosenItem((prev) => [...prev, item]);
            }
        }
    };
    return (
        <div
            onClick={() => {
                handleInputChange();
            }}
            className={`w-4 h-4 border border-gray-300 mr-1 cursor-pointer 
                 ${isChecked || chosenItem.length == showItem.length ? 'bg-[var(--primary)]' : ''}`}
        >
            <input type="checkbox" className="hidden" checked={isChecked} onChange={handleInputChange} />
            {(isChecked || chosenItem.length == showItem.length) && <FaCheck className="text-white text-sm " />}
        </div>
    );
};

export default CheckBox;
