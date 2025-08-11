import React from 'react';
import { useFormContext } from 'react-hook-form';
import Label from './Label';
const SelectCategory = ({ items, name, label, isAdd = false }) => {
    const { register } = useFormContext();
    return (
        <div className="text-gray-700 text-sm  ">
            <Label label={label} />
            <select {...register(name)} className="w-full cursor-pointer border border-gray-300 p-2 outline-none rounded-md">
                {isAdd && <option value="">No option</option>}

                {items?.map((item, index) => (
                    <React.Fragment key={index}>
                        <option value={`${item.id}`}>{item.name}</option>
                        {item?.subCategories?.map((sub, index2) => (
                            <option className="pl-20" key={index2} value={sub.id} disabled={isAdd}>
                                &nbsp;&nbsp;&nbsp;&nbsp;{sub.name}
                            </option>
                        ))}
                    </React.Fragment>
                ))}
            </select>
        </div>
    );
};

export default SelectCategory;
