import React from 'react';

const Size = ({ size, chosenSize }) => {
    return (
        <div
            className={` rounded-md py-2 px-6  my-2 cursor-pointer 
                ${chosenSize === size ? 'border-[var(--primary)] border-2 ' : 'border-gray-300 border'}
        text-sm text-gray-700 hover:border-[var(--primary)]`}
        >
            {size}
        </div>
    );
};

export default Size;
