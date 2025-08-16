import React, { useRef } from 'react';
import { MdCloudUpload } from 'react-icons/md';
import { IoCloseOutline } from 'react-icons/io5';
import { useFormContext } from 'react-hook-form';

const UploadImage = ({ url, setUrl, className, isView = false, setFile }) => {
    const inputRef = useRef(null);
    const {
        register,
        setValue,
        formState: { errors },
    } = useFormContext();

    const handleChooseImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setFile(file);
        setValue('thumbnail', file, { shouldValidate: true });
        setUrl(URL.createObjectURL(file));
    };

    const handleRemoveImage = (e) => {
        e.stopPropagation();
        setValue('thumbnail', null, { shouldValidate: true });
        setUrl('');
    };

    return (
        <div className="flex justify-center items-center flex-col">
            {url ? (
                <div
                    className={`border border-[var(--primary)] border-dashed relative rounded-md ${className} ${errors.thumbnail ? 'border-red-500' : ''}`}
                >
                    {!isView && (
                        <IoCloseOutline
                            className="absolute top-1 bg-purple-400 p-0.5 text-white rounded-full right-1 cursor-pointer text-2xl hover:bg-red-400"
                            onClick={handleRemoveImage}
                        />
                    )}
                    <img src={url} className="object-contain w-full h-full rounded-md" alt="thumbnail" />
                </div>
            ) : (
                <div
                    onClick={() => inputRef.current.click()}
                    className={`hover:shadow-md rounded-md flex justify-center items-center border border-[var(--primary)] border-dashed cursor-pointer ${className} ${errors.thumbnail ? 'border-red-500' : ''}`}
                >
                    <MdCloudUpload className="text-5xl text-[var(--primary)]" />
                    <input
                        {...register('thumbnail', { required: 'Ảnh bìa là bắt buộc' })}
                        type="file"
                        hidden
                        ref={inputRef}
                        onChange={handleChooseImage}
                    />
                </div>
            )}
            {errors.thumbnail && <p className="text-red-500 text-sm italic  mt-1">{errors.thumbnail.message}</p>}
        </div>
    );
};

export default UploadImage;
