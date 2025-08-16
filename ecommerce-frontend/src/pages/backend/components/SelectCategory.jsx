import React from 'react';
import { useFormContext } from 'react-hook-form';
import Label from './Label';
const SelectCategory = ({ items, name, label, isAdd = false, defaultValue = null, disabled }) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    return (
        <div className="text-gray-700 text-sm">
            <Label label={label} />
            <select
                {...register(name, { required: 'Loại sản phẩm là bắt buộc' })}
                className="w-full cursor-pointer border border-gray-300 p-2 outline-none rounded-md"
            >
                {isAdd && <option value="">No option</option>}
                {items?.map((item, index) => (
                    <React.Fragment key={item?.id}>
                        <option value={item?.id}>{item?.name}</option>
                        {item?.subCategories?.map((sub, index) => (
                            <option key={index} className="" value={sub?.id}>
                                {'\u00A0\u00A0\u00A0\u00A0'}
                                {sub?.name}
                            </option>
                        ))}
                    </React.Fragment>
                ))}
            </select>
            {errors[name] && <p className="text-red-500 text-sm italic mt-1">{errors[name]?.message}</p>}
        </div>
    );
};

export default SelectCategory;
