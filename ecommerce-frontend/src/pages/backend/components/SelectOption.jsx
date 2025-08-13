import React, { useEffect, useRef, useState } from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
const SelectOption = ({ items, name, firstName = 'Tất cả', chosenItem, setChosenItem, onClick, isView = false }) => {
    const [showOption, setShowOption] = useState(false);
    const [open, setOpen] = useState(false);
    const selectRef = useRef(null);
    return (
        <div className=" text-gray-700 relative w-full ">
            <p className="text-sm  mb-1 ">{name}</p>
            <div
                tabIndex={0}
                onClick={() => {
                    (setShowOption(!showOption), setOpen(true));
                }}
                className={`text-sm border border-gray-300 rounded p-2 cursor-pointer flex justify-between items-center
                focus:ring-2 focus:ring-[var(--primary)]/40 ${isView ? 'pointer-events-none' : ''}  `}
            >
                {chosenItem ? <p>{chosenItem}</p> : <p>{firstName}</p>}
                <MdOutlineKeyboardArrowDown className="text-xl " />
            </div>
            {showOption && open && !isView && (
                <div className="  absolute z-10 bg-white right-0 left-0 mt-1  " ref={selectRef}>
                    {name == 'Loại sản phẩm' ? (
                        <div className=" rounded mt-1 border border-gray-300 my-1 max-h-50 overflow-y-auto  f">
                            <div className="px-2 hover:bg-purple-50 ">{firstName}</div>
                            {items?.map((item, index) => (
                                <>
                                    <div
                                        className="cursor-pointer hover:bg-purple-50 px-2"
                                        onClick={() => {
                                            ((setChosenItem(item?.name), setOpen(false)), onClick(item?.name));
                                        }}
                                        key={index}
                                    >
                                        {item?.name}
                                    </div>
                                    {item?.subCategories?.map((sub, index) => (
                                        <div
                                            key={index}
                                            className="pl-5 hover:bg-purple-50 cursor-pointer"
                                            onClick={() => {
                                                ((setChosenItem(sub?.name), setOpen(false)), onClick(item?.name));
                                            }}
                                        >
                                            {sub?.name}
                                        </div>
                                    ))}
                                </>
                            ))}
                        </div>
                    ) : (
                        <div className=" rounded mt-1 border border-gray-300 my-1 max-h-50 overflow-y-auto   ">
                            <div className="px-2 hover:bg-purple-50 cursor-pointer">{firstName}</div>
                            {items?.map((item, index) => (
                                <div
                                    className="cursor-pointer hover:bg-purple-50 px-2"
                                    onClick={() => {
                                        ((setChosenItem(item), setOpen(false)), onClick(item));
                                    }}
                                    key={index}
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SelectOption;
