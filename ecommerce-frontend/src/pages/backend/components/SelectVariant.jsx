import React, { useEffect, useRef, useState } from 'react';

const VariantDiv = ({ item, onClick, variant }) => {
    return (
        <div
            className="border border-gray-300 cursor-pointer flex items-center gap-2 px-1 rounded"
            onClick={() => onClick(item)}
        >
            {variant === 'color' ? (
                <>
                    <div
                        style={{ backgroundColor: item }}
                        className="w-4 h-4 rounded-full border border-gray-300 "
                    ></div>
                    <div className="">{item.charAt(0).toUpperCase() + item.slice(1)}</div>
                </>
            ) : (
                <div className="px-2">{item.charAt(0).toUpperCase() + item.slice(1)}</div>
            )}
        </div>
    );
};

const SelectMutil = ({ variant, items, value, onChange, setImages = false }) => {
    // const [selectedVariant, setSelectedVariant] = useState([]);
    const [newItem, setNewItem] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const containerRef = useRef(null);

    const handleChooseItem = (variant) => {
        if (value.includes(variant)) {
            onChange((prev) => prev.filter((co) => co !== variant));
            setImages((prev) => prev.filter((co) => co.color !== variant));
        } else {
            onChange((prev) => [...prev, variant]);
        }
    };

    const handleAddNewitem = () => {
        onChange((prev) => [...prev, newItem]);
        setNewItem('');
    };
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (
        <div className="relative   text-gray-700" ref={containerRef}>
            <div
                className="border border-gray-300 w-full outline-none min-h-9 flex flex-wrap rounded gap-2 cursor-pointer p-1"
                onClick={() => setShowDropdown(true)}
            >
                {value?.map((va, index) => (
                    <VariantDiv item={va} variant={variant} key={index} onClick={handleChooseItem} />
                ))}
            </div>
            {showDropdown && (
                <div className="flex flex-col gap-1 overflow-y-auto h-60 border bg-white border-gray-300 p-2 absolute w-full z-10  mt-2">
                    <div className="flex items-center pr-2  border border-gray-300 rounded ">
                        <input
                            type="text"
                            className=" w-full outline-none p-1 px-3"
                            value={newItem}
                            onChange={(e) => setNewItem(e.target.value)}
                        />
                        <span className="cursor-pointer text-[var(--primary)]" onClick={handleAddNewitem}>
                            Add
                        </span>
                    </div>
                    {items.map((item, index) => (
                        <div
                            className="flex  items-center gap-2 cursor-pointer hover:bg-gray-100 px-1"
                            onClick={() => handleChooseItem(item)}
                            key={index}
                        >
                            {variant === 'color' ? (
                                <>
                                    <div
                                        className="w-5 h-5 rounded-full border border-gray-300  "
                                        style={{ backgroundColor: item }}
                                    ></div>
                                    <div className="">{item.charAt(0).toUpperCase() + item.slice(1)}</div>
                                </>
                            ) : (
                                <div className="">{item.charAt(0).toUpperCase() + item.slice(1)}</div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SelectMutil;
