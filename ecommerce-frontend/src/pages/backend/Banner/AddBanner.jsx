import React, { useRef, useState } from 'react';
import FormWrapper from '@components/Form';
import InputField from '@components/Form/InputField';
import SubmitButton from '@components/Form/SubmitButton';
import BannerService from '@services/banner.service';
import DateTimePicker from '../components/DateTimePicker';
import { toast } from 'react-toastify';
import { FaCloudUploadAlt } from 'react-icons/fa';
import UploadService from '@services/upload.service';
import { Form } from 'react-router-dom';
const AddBanner = () => {
    const [url, setUrl] = useState('');
    const imgRef = useRef(null);
    const [file, setFile] = useState(null);

    const uploadImg = async () => {
        try {
            const form = new FormData();
            form.append('file', file);
            const response = await UploadService.uploadSingleImage(form);
            return response.data.data;
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddBanner = async (data, reset) => {
        try {
            const imgUrl = await uploadImg();
            const payload = {
                ...data,
                imgUrl,
                startDate: data.startDate,
                endDate: data.endDate,
            };
            const response = await BannerService.addBanner(payload);
            toast.success('Add banner successfully');
            setUrl('');
            setFile(null);
            reset();
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
        const url = URL.createObjectURL(file);
        setUrl(url);
    };
    return (
        <div className="bg-white p-4 min-h-[600px]   ">
            <FormWrapper onSubmit={handleAddBanner}>
                <div 
                    onClick={() => imgRef.current.click()}
                    className={`   max-w-[1220px] h-[450px] border-[var(--primary)] cursor-pointer  hover:shadow  
                 ${url ? 'border' : 'border-2 border-dashed hover:bg-purple-50'}`}
                >
                    {url ? (
                        <img src={url} className="w-full h-full object-contain" alt="" />
                    ) : (
                        <div className="flex flex-col justify-center items-center  h-full  ">
                            <FaCloudUploadAlt className="text-7xl  text-[var(--primary)]" />
                            <p className="text-xl  text-orange-500 font-semibold">Upload banner</p>
                        </div>
                    )}
                    <input type="file" className="hidden" ref={imgRef} onChange={handleInputChange} />
                </div>
                <div className=" grid grid-cols-2 md:grid-cols-4 items-center justify-between gap-4 my-4  h-full  ">
                    <InputField name={'link'} Element={'input'} label={'Link'} />
                    <InputField name={'priority'} Element={'input'} label={'Priority'} />
                    <DateTimePicker name={'startDate'} label={'Start date'} required={'Start date is required'} />
                    <DateTimePicker name={'endDate'} label={'End date'} required={'End date is required'} />
                </div>
                <SubmitButton type={'submit'}>Add banner</SubmitButton>
            </FormWrapper>
        </div>
    );
};

export default AddBanner;
