import React, { useRef, useState } from 'react';
import { MdCloudUpload } from 'react-icons/md';
import { IoCloseOutline } from 'react-icons/io5';
const UploadImage = ({ url, setUrl, setThumbnail }) => {
    const inputRef = useRef(null);

    const handleChooseImage = (e) => {
        const file = e.target.files[0];
        setThumbnail(file)
        const url = URL.createObjectURL(file);
        setUrl(url);
    };

    return (
        <div className=" flex justify-center items-center ">
            {url ? (
                <div className="border border-[var(--primary)]  border-dashed w-52 h-56   relative  rounded-md    ">
                    <IoCloseOutline
                        className="absolute top-1 bg-purple-400   p-0.5   text-white   rounded-full  right-1 cursor-pointer text-2xl hover:bg-red-400"
                        onClick={(e) => {
                            e.stopPropagation();
                            setUrl('');
                        }}
                    />
                    <img src={url} className="object-cover w-full h-full rounded-md   " alt="" />
                </div>
            ) : (
                <div
                    onClick={() => inputRef.current.click()}
                    className="w-52 hover:shadow-md  rounded-md   h-56 flex justify-center items-center border border-[var(--primary)] border-dashed cursor-pointer "
                >
                    <MdCloudUpload className="text-5xl text-[var(--primary)]" />
                    <input type="file" hidden ref={inputRef} onChange={handleChooseImage} />
                </div>
            )}
        </div>
    );
};

export default UploadImage;
