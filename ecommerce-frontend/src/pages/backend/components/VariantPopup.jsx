import React, { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import SubmitButton from '@components/Form/SubmitButton';
import { toast } from 'react-toastify';
const VariantPopup = ({ colors, sizes, variants, setVariants, onClose }) => {
    const handleAddQuantity = (color, size, quantity) => {
        setVariants((prev) => {
            const existIndex = prev.findIndex((v) => v.color == color && v.size == size);
            if (existIndex !== -1) {
                const update = [...prev];
                update[existIndex].quantity = quantity;
                return update;
            } else {
                return [...prev, { color, size, quantity }];
            }
        });
    };

const handleSubmit = () => {
    toast.success('Save variants successfully');
    onClose();
};
    return (
        <>
            <div className="fixed inset-0 bg-black opacity-10  z-10"></div>

            <div className="fixed inset-0 flex justify-center items-center z-20 px-96  ">
                <div className="bg-white rounded-lg shadow-lg p-4 w-full relative  ">
                    <button className="absolute top-4 right-4  " onClick={onClose}>
                        <IoCloseOutline className="text-2xl cursor-pointer hover:text-red-500" />
                    </button>

                    <h2 className="text-xl font-semibold m-4 text-center text-gray-800">Add Quantity for Variants</h2>
                    <div className="overflow-auto max-h-[70vh]">
                        <table className="table-fixed border border-collapse w-full">
                            <thead>
                                <tr>
                                    <th className="border border-gray-300 w-1/3">Color</th>
                                    <th className="border border-gray-300 w-1/3">Size</th>
                                    <th className="border border-gray-300 w-1/3">Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {colors.map((color, ic) =>
                                    sizes.map((size, is) => (
                                        <tr key={`${ic}-${is}`}>
                                            <td className="p-2 border  border-gray-300 text-center">
                                                <div className="flex items-center justify-center gap-2 ">
                                                    <div
                                                        className="w-5 h-5 rounded-full border border-gray-300"
                                                        style={{ backgroundColor: color }}
                                                    ></div>
                                                    <div className="w-1/3 ">
                                                        {color.charAt(0).toUpperCase() + color.slice(1)}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="border border-gray-300 text-center">{size}</td>
                                            <td className="border border-gray-300">
                                                <input
                                                    type="number"
                                                    className="outline-none w-full p-2  " 
                                                    value={variants.find(v => v.color === color && v.size === size )?.quantity || ''}
                                                    onChange={(e) => handleAddQuantity(color, size, e.target.value)}
                                                />
                                            </td>
                                        </tr>
                                    )),
                                )}
                            </tbody>
                        </table>
                        <SubmitButton  onClick={handleSubmit}>Add variants</SubmitButton>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VariantPopup;
