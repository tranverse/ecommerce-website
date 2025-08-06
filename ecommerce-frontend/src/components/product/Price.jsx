import React from 'react';
import { NumberFomart } from '@utils/NumberFomart';
const Price = ({ children, className }) => {
    return (
        <div>
            <p className={`font-bold ${className}`}>
                {NumberFomart(children)}
                <span className="text-sm underline ">đ</span>
            </p>
        </div>
    );
};

export default Price;
