import React, { useEffect, useState } from 'react';
import FormWrapper from '@components/Form';
import InputField from '@components/Form/InputField';
import SelectCategory from '../components/SelectCategory';
import CategoryService from '@services/category.service';
import { toast } from 'react-toastify';
import UploadImage from '../components/UploadThumbnail';
import SubmitButton from '@components/Form/SubmitButton';
import UploadService from '@services/upload.service';
const AddCategory = () => {
    const [parentCategories, setParentCategories] = useState([]);
    const [url, setUrl] = useState('');
    const [file, setFile] = useState({});
    const getAllCategories = async () => {
        try {
            const response = await CategoryService.getAllCategories();
            setParentCategories(response.data.data);
        } catch (error) {
            toast.error(error);
        }
    };
    console.log(parentCategories);
    useEffect(() => {
        getAllCategories();
    }, []);

    const handleUploadImage = async () => {
        const form = new FormData();
        form.append('file', file);
        const response = await UploadService.uploadSingleImage(form);
        return response.data.data;
    };
    const handleAddCategory = async (data, reset) => {
        const thumbnail = await handleUploadImage();
        if (data.parentCategory == '') {
            data.parentCategory = null;
        } else {
            data.parentCategory = { id: data.parentCategory };
        }
        const payload = {
            ...data,
            thumbnail,
        };
        try {
            const response = await CategoryService.addCategory(payload);
            toast.success(response.data.message);
            reset();
            setUrl('');
            setFile(null);
        } catch (error) {
            toast.error(error);
        }
    };

    return (
        <div className="bg-white p-4 text-gray-700 text-sm rounded-md min-h-[615px] shadow">
            <FormWrapper onSubmit={handleAddCategory}>
                <div className="flex flex-col gap-4    ">
                    <InputField Element={'input'} name={'name'} label={'Name'} />
                    <SelectCategory
                        items={parentCategories}
                        name={'parentCategory'}
                        label={'Parent category'}
                        isAdd={true}
                    />
                    <div className="m-1">
                        <div className="flex  items-center gap-2">
                            <p>Thumbnail</p>
                            <span className="text-red-500">*</span>
                        </div>
                        <UploadImage setThumbnail={setFile} setUrl={setUrl} url={url} className={'w-72  h-80  '} />
                    </div>
                    <div className=" mt-auto  ">
                        <SubmitButton type={'submit'} className={'my-4    p-2 text-md hover:bg-purple-500'}>
                            Add category
                        </SubmitButton>
                    </div>
                </div>
            </FormWrapper>
        </div>
    );
};

export default AddCategory;
