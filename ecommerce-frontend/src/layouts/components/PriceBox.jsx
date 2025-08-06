import React from 'react';

const PriceBox = ({placeholder}) => {
    return (
        <div>
            <input
                type="text"
                className="border w-full text outline-none border-gray-400 px-2 py-1"
                placeholder={placeholder}
                name=""
                id=""
            />
        </div>
    );
};

export default PriceBox;
