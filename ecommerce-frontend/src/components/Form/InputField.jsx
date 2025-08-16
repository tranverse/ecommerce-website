import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FaRegEye } from 'react-icons/fa';
import { FaRegEyeSlash } from 'react-icons/fa';

const InputField = ({ name, label, type, placeholder, Element, className, readOnly = false }) => {
    const {
        register,
        getValues,
        formState: { errors },
    } = useFormContext();

    const [showPass, setShowPass] = useState(false);
    const validateField =
        name === 'repassword' ? (value) => value === getValues('password') || 'Password does not match' : undefined;
    return (
        <div className="flex flex-col gap-0 my-1 w-full">
            <div className="flex items-center gap-2">
                <label htmlFor={name} className="text-gray-700 text-sm mb-1  ">
                    {label}
                </label>
                <span className="text-red-500">*</span>
            </div>
            <div className="relative ">
                <Element
                    {...register(name, { required: `${label} is required`, validate: validateField })}
                    type={showPass ? 'text' : type}
                    id={name}
                    readOnly={readOnly}
                    placeholder={placeholder}
                    className={`border  border-gray-300 px-3 py-1 outline-none rounded w-full
                        focus:ring-3 focus:ring-[var(--primary)]/40 ${className}`}
                />
                {type == 'password' &&
                    (showPass ? (
                        <FaRegEye
                            className="absolute top-1/2 -translate-y-1/2  right-2 cursor-pointer  "
                            onClick={() => setShowPass(false)}
                        />
                    ) : (
                        <FaRegEyeSlash
                            className="absolute top-1/2 -translate-y-1/2  right-2 cursor-pointer"
                            onClick={() => setShowPass(true)}
                        />
                    ))}
            </div>
            {errors[name] && <p className="text-red-500 italic text-sm ">{errors[name].message}</p>}
        </div>
    );
};

export default InputField;
