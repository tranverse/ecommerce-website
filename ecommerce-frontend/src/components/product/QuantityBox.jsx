import React from 'react';
import { GoPlus } from 'react-icons/go';
import { HiOutlineMinus } from 'react-icons/hi2';
const QuantityBox = ({ setQuantity, quantity, chosenVariant, isCart = false, className, onChangeQuantity = false }) => {
    const maxQuantity = chosenVariant?.quantity || 1;

    const handleIncrease = () => {
        changeQuantity(quantity + 1);
    };
    const handleDecrease = () => {
        changeQuantity(quantity - 1);
    };

    const changeQuantity = (value) => {
        const valid = Math.max(1, Math.min(Number(value), maxQuantity));
        if (onChangeQuantity) {
            onChangeQuantity(valid);
        } else {
            setQuantity(valid);
        }
    };
    const handleInputChange = (e) => {
        let value = e.target.value;

        if (value === '') {
            changeQuantity('');
            return;
        }

        if (!/^\d+$/.test(value)) return;

        if (value.length > 0 && value.startsWith('0')) {
            value = value.replace(/^0+/, '');
        }
        if (value > maxQuantity) {
            changeQuantity(maxQuantity);
        } else {
            changeQuantity(value);
        }
    };
    return (
        <div className={`flex items-center ${isCart ? 'flex-col' : ' gap-2 '}   `}>
            {!isCart && <div className="text-gray-500 w-1/7 ">Quantity:</div>}
            <div
                className={`flex ${chosenVariant?.quantity ? '' : 'opacity-50 cursor-not-allowed pointer-events-none select-none'} `}
            >
                <button
                    className={`border border-gray-300   cursor-pointer ${isCart ? className : 'px-4 py-3 rounded-l-md '}`}
                    onClick={handleDecrease}
                >
                    <HiOutlineMinus className="text-gray-700" />
                </button>
                <input
                    type="text"
                    onChange={(e) => handleInputChange(e)}
                    value={quantity}
                    className={`${isCart ? 'w-10' : 'w-12'} text-center text-gray-700 border-b border-t border-gray-300 focus:outline-none `}
                />
                <button
                    className={`border border-gray-300   cursor-pointer ${isCart ? className : 'px-4 py-3 rounded-l-md '}`}
                    onClick={handleIncrease}
                >
                    <GoPlus className="text-gray-700" />
                </button>
            </div>
            {chosenVariant && Object.keys(chosenVariant).length != 0 && (
                <span className="text-sm text-gray-500">{chosenVariant?.quantity} available</span>
            )}
        </div>
    );
};

export default QuantityBox;
