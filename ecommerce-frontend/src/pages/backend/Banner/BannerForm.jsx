import React, { useEffect, useRef, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import InputField from '@components/Form/InputField';
import SubmitButton from '@components/Form/SubmitButton';
import DateTimePicker from '../components/DateTimePicker';
import { FaCloudUploadAlt } from 'react-icons/fa';
import UploadService from '@services/upload.service';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

const BannerForm = ({ initialValues = null, onSubmit, isView = false }) => {
    const methods = useForm({
        defaultValues: {
            link: '',
            priority: '',
            startDate: dayjs(),
            endDate: dayjs(),
        },
    });

    const { reset, handleSubmit, watch } = methods;
    const [url, setUrl] = useState('');
    const [file, setFile] = useState(null);
    const imgRef = useRef(null);

    useEffect(() => {
        if (initialValues) {
            reset({
                link: initialValues.link || '',
                priority: initialValues.priority || '',
                startDate: initialValues.startDate ? dayjs(initialValues.startDate) : dayjs(),
                endDate: initialValues.endDate ? dayjs(initialValues.endDate) : dayjs(),
            });
            setUrl(initialValues.imgUrl || '');
        }
    }, [initialValues, reset]);

    const uploadImg = async () => {
        if (!file) return url;
        const form = new FormData();
        form.append('file', file);
        const response = await UploadService.uploadSingleImage(form);
        return response.data.data;
    };

    const onSubmitForm = async (data) => {
        const imgUrl = await uploadImg();
        const payload = { ...data, imgUrl };
        console.log(data);
        if (onSubmit) await onSubmit(payload);
        setFile(null);
        setUrl(imgUrl);
    };

    const handleInputChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
        setUrl(URL.createObjectURL(file));
    };

    return (
        <FormProvider {...methods}>
            <div className="bg-white p-4 min-h-[600px]">
                <div
                    onClick={() => imgRef.current.click()}
                    className={`max-w-[1220px] h-[450px] cursor-pointer hover:shadow border-[var(--primary)] ${
                        url ? 'border' : 'border-2 border-dashed hover:bg-purple-50'
                    }`}
                >
                    {url ? (
                        <img src={url} className="w-full h-full object-contain" alt="banner" />
                    ) : (
                        <div className="flex flex-col justify-center items-center h-full">
                            <FaCloudUploadAlt className="text-7xl text-[var(--primary)]" />
                            <p className="text-xl text-orange-500 font-semibold">Upload banner</p>
                        </div>
                    )}
                    <input type="file" className="hidden" ref={imgRef} onChange={handleInputChange} />
                </div>

                <form onSubmit={handleSubmit(onSubmitForm)} className="">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-4">
                        <InputField name="link" Element="input" label="Link" type="text" readOnly={isView} />
                        <InputField name="priority" Element="input" label="Priority" type="text" readOnly={isView} />
                        <DateTimePicker name="startDate" label="Start date" required="Start date is required" />
                        <DateTimePicker name="endDate" label="End date" required="End date is required" />
                    </div>
                    {!isView && <SubmitButton type="submit">{initialValues ? 'Sửa banner' : 'Thêm banner'}</SubmitButton>}
                    {isView && (
                        <Link to={`/user/update-banner/${initialValues?.id}`}>
                            <SubmitButton type="submit">Chỉnh sửa thông tin</SubmitButton>
                        </Link>
                    )}
                </form>
            </div>
        </FormProvider>
    );
};

export default BannerForm;
