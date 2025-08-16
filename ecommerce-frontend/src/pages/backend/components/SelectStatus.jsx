import React from 'react';
import { useFormContext } from 'react-hook-form';

const SelectStatus = ({ item, label, name }) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    console.log(item)
    return (
        <div className="text-gray-700 text-sm w-full  ">
            <div className="flex items-center gap-2">
                <label htmlFor={name} className="text-gray-700 text-sm mb-1  ">
                    {label}
                </label>
                <span className="text-red-500">*</span>
            </div>
            <select
                id={name}
                {...register(name, { required: 'Trạng thái sản phẩm là bắt buộc' })}
                className="w-full cursor-pointer border border-gray-300 p-2 outline-none rounded-md "
            >
                <option value="">Chọn loại trạng thái sản phẩm</option>
                {item?.map((status, index) => (
                    <option key={index} value={status}>
                        {status}
                    </option>
                ))}
            </select>
            {errors.status && <p className="text-red-500 text-sm italic  mt-1">{errors.status.message}</p>}
        </div>
    );
};

export default SelectStatus;
