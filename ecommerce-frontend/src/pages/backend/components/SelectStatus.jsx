import React from 'react';
import { useFormContext } from 'react-hook-form';

const SelectStatus = ({ item, label, name }) => {
    const { register } = useFormContext();

    return (
        <div className="text-gray-700 text-sm w-full  ">
            <div className="flex items-center gap-2">
                <label htmlFor={name} className="text-gray-700 text-sm mb-1  ">
                    {label}
                </label>
                <span className="text-red-500">*</span>
            </div>
            <select
                defaultValue={item[0]}
                id={name}
                {...register(name)}
                className="w-full cursor-pointer border border-gray-300 p-2 outline-none rounded-md "
            >
                {item?.map((status, index) => (
                    <option key={index} value={status}>
                        {status}
                    </option>
                ))}
                {item.length == 0 && <option value="">No option</option>}
            </select>
        </div>
    );
};

export default SelectStatus;
