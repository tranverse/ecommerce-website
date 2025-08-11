import React from 'react';

const PriceBox = ({ placeholder, setValue, value }) => {
    const handleChangeValue = (e) => {
        setValue(e.target.value);
    };
    return (
        <div>
            <input
                onChange={handleChangeValue}
                type="number"
                value={value}
                className="border w-full text outline-none border-gray-400 px-2 py-1"
                placeholder={placeholder}
                name=""
                id=""
            />
        </div>
    );
};

export default PriceBox;
