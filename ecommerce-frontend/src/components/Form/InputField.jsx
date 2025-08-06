import React from 'react';
import { useFormContext } from 'react-hook-form';

const InputField = ({ name, label, type, placeholder, Element }) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <div className="flex flex-col gap-0 my-1 w-full">
            <div className="flex items-center gap-2">
                <label htmlFor={name} className="text-gray-700 text-sm mb-1  ">
                    {label}
                </label>
                <span className="text-red-500">*</span>
            </div>
            <Element
                {...register(name, { required: `${label} is required` })}
                type={type}
                id={name}
                placeholder={placeholder}
                className="border border-gray-300 px-3 py-1 outline-none rounded focus:ring-3 focus:ring-[var(--primary)]/40"
            />
            {errors[name] && <p className='text-red-500 italic text-sm '>{errors[name].message}</p>}
        </div>
    );
};

export default InputField;
