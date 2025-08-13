import React from 'react';
import Label from '@pages/backend/components/Label';
import { useFormContext } from 'react-hook-form';
const SelectAddressForm = ({ places, label, name, setValue }) => {
    const {
        register,
        watch,
        formState: { errors },
    } = useFormContext();
    const selectedValue = watch(name);
    const { ref, onChange, name: fieldName, ...rest } = register(name, { required: `${label} là bắt buộc` });

    const handleChange = (e) => {
        const value = e.target.value;
        setValue(value);
        onChange(e);
    };
    return (
        <div className="w-full">
            <Label label={label} />
            <select
                onChange={(e) => handleChange(e)}
                ref={ref}
                name={fieldName}
                value={selectedValue}
                className="border outline-none w-full  p-2 border-gray-300 rounded text-gray-700
                        focus:ring-2 focus:ring-[var(--primary)]/40
                        "
            >
                <option value="" className="text-center">
                    --Chọn {label}--
                </option>
                {places?.map((place, index) => (
                    <option className="" key={index} value={place?.code}>
                        {place?.name}
                    </option>
                ))}
            </select>
            {errors[name] && <p className="text-red-500 italic text-sm ">{errors[name].message}</p>}
        </div>
    );
};

export default SelectAddressForm;
