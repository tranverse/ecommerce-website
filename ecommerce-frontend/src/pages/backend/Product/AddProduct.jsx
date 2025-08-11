import React, { lazy, useEffect, useRef, useState } from 'react';
import FormWrapper from '@components/Form';
import InputField from '@components/Form/InputField';
import { MdCloudUpload } from 'react-icons/md';
import UploadImage from '@pages/backend/components/UploadThumbnail';
import SelectMutil from '@pages/backend/components/SelectVariant';
import { colors, size } from '@utils/Variant';
import VariantPopup from '../components/VariantPopup';
import { IoCloseOutline } from 'react-icons/io5';
import CategoryService from '@services/category.service';
import SelectCategory from '@pages/backend/components/SelectCategory';
import ProductService from '@services/product.service';
import SubmitButton from '@components/Form/SubmitButton';
import UploadService from '@services/upload.service';
import { set, useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';
import SelectStatus from '../components/SelectStatus';
import Label from '../components/Label';
const AddProduct = () => {
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSized] = useState([]);
    const [colorImages, setColorImages] = useState([]);
    const [isShowPopup, setIsShowPopup] = useState(false);
    const [variants, setVariants] = useState([]);
    const [url, setUrl] = useState('');
    const [images, setImages] = useState([]);
    const inputRefs = useRef({});
    const [categories, setCategories] = useState([]);
    const [status, setStatus] = useState([]);
    const [thumbnail, setThumbnail] = useState('');
    useEffect(() => {
        setColorImages(selectedColors);
    }, [selectedColors]);

    useEffect(() => {
        getAllCategory();
        getProductStatus();
    }, []);
    const getAllCategory = async () => {
        const response = await CategoryService.getAllCategories();
        setCategories(response?.data?.data);
    };
    const getProductStatus = async () => {
        const response = await ProductService.getProductStatus();
        setStatus(response.data.data);
    };
    const handleUploadImages = (color, e) => {
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);
        setImages((prev) => [...prev, { color: color, file: file, url: url }]);
    };

    const handleRemoveImages = (color, url) => {
        const removeImage = images.find((image) => image.color === color && image.url === url);
        setImages((prev) => prev.filter((image) => image != removeImage));
    };
    console.log(images);
    const uploadImages = async () => {
        const formData = new FormData();
        const colors = [];
        for (let image of images) {
            formData.append('files', image.file);
            colors.push(image.color);
        }
        formData.append('colors', JSON.stringify(colors));

        const res = await UploadService.uploadImages(formData);
        return res.data.data;
    };

    const uploadThumbnail = async () => {
        const formThumbnail = new FormData();
        formThumbnail.append('file', thumbnail);
        const res = await UploadService.uploadSingleImage(formThumbnail);
        return res.data.data;
    };

    const handleSubmit = async (data, reset) => {
        const uploadedImages = await uploadImages();
        const uploadedThumbnail = await uploadThumbnail();

        data.category = { id: data.category };
        const payload = {
            ...data,
            variants,
            images: uploadedImages,
            thumbnail: uploadedThumbnail,
        };

        console.log(payload);
        const productResponse = await ProductService.addProduct(payload);
        console.log(productResponse)
        
        if (productResponse.data.success) {
            toast.success('Add product successfully');
            reset();
            setThumbnail('');
            setUrl('');
            setVariants([]);
            setSelectedColors([]);
            setSelectedSized([]);
            setImages([]);
        } else {
            console.error('Failed to submit', error);
            toast.error(productResponse.data.message);
        }
    };

    return (
        <div className="bg-white p-4 shadow rounded border-indigo-50-50">
            <FormWrapper className={'flex flex-col min-h-[620px]'} onSubmit={handleSubmit}>
                <div className="grid grid-cols-[2fr_1.5fr] gap-10">
                    <div className="flex flex-col gap-4 ">
                        <InputField name="name" label={'Product name'} placeholder={'Enter product name'} Element={'input'} />
                        <InputField name="description" label={'Description'} Element={'textarea'} />
                        <div>
                            <Label label={'Thumbnail'} />
                            <UploadImage url={url} setUrl={setUrl} setThumbnail={setThumbnail} className={'w-56 h-56'} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between gap-4 ">
                            <InputField name="price" type={'number'} label={'Price'} placeholder={'00.00'} Element={'input'} />
                            <InputField name="discountPercentage" label={'Discount (%)'} Element={'input'} />
                        </div>
                        <div className="flex  justify-between gap-4">
                            <InputField name="origin" label={'Origin'} Element={'input'} />
                            <SelectStatus item={status} name={'status'} label={'Status'} />
                        </div>

                        <SelectCategory items={categories} label={'Category'} name={'category'} isAdd={false} />
                        <div>
                            <div className="flex justify-between text-sm">
                                <Label label={'Variant '} />
                                {selectedColors.length > 0 && selectedSizes.length > 0 && (
                                    <p
                                        onClick={() => setIsShowPopup(true)}
                                        className="text-[var(--primary)] italic  hover:text-green-800 hover:no-underline transition-all duration-200 cursor-pointer font-medium"
                                    >
                                        Add quantity for variants
                                    </p>
                                )}
                            </div>
                            <div className="border border-gray-300 border-dashed p-2">
                                <p className="text-gray-700 text-sm mb-1">Color</p>
                                <SelectMutil
                                    variant={'color'}
                                    value={selectedColors}
                                    items={colors}
                                    setImages={setImages}
                                    onChange={setSelectedColors}
                                ></SelectMutil>
                                <p className="text-gray-700 text-sm mt-4 mb-1">Size</p>
                                <SelectMutil
                                    variant={'size'}
                                    value={selectedSizes}
                                    items={size}
                                    onChange={setSelectedSized}
                                ></SelectMutil>
                            </div>
                        </div>
                    </div>
                </div>
                <Label label={'Product images'} />
                {colorImages.map((item, index) => (
                    <div className=" border-[var(--primary)] border-dashed border  flex items-center w-full p-2 " key={index}>
                        <div className="flex w-1/11 items-center gap-4">
                            <div className="flex flex-wrap justify-center  items-center gap-2 overflow-y-auto bg-white  p-1 px-2   ">
                                <div
                                    className="w-5 h-5 rounded-full border border-gray-300  "
                                    style={{ backgroundColor: item }}
                                ></div>
                                <div className="">{item.charAt(0).toUpperCase() + item.slice(1)}</div>
                            </div>
                        </div>

                        <div
                            onClick={() => {
                                inputRefs.current[item].click();
                            }}
                            className="flex flex-wrap   flex-1 gap-2 cursor-pointer hover:text-[var(--primary)] hover:bg-purple-50 hover:shadow-md
                                    p-1 max-h-[340px]    overflow-y-auto"
                        >
                            <input
                                type="file"
                                multiple
                                ref={(ref) => {
                                    if (ref) inputRefs.current[item] = ref;
                                }}
                                hidden
                                onChange={(e) => handleUploadImages(item, e)}
                            />
                            {images.find((c) => c.color === item) ? (
                                images
                                    ?.filter((c) => c.color === item)
                                    .map((image, index) => (
                                        <div
                                            key={index}
                                            className="border border-[var(--primary)]  border-dashed w-40 h-40    relative  rounded-md    "
                                        >
                                            <IoCloseOutline
                                                className="absolute top-1 bg-purple-400   p-0.5   text-white   rounded-full  right-1 cursor-pointer text-2xl hover:bg-red-400"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleRemoveImages(image.color, image.url);
                                                }}
                                            />
                                            <img src={image?.url} className="object-cover w-full h-full rounded-md   " />
                                        </div>
                                    ))
                            ) : (
                                <div className="flex items-center justify-center gap-2 px-2 ">
                                    <MdCloudUpload className="text-[var(--primary)]" />
                                    Upload images
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                {!colorImages.length && (
                    <div className="border border-[var(--primary)] border-dashed flex flex-col justify-center w-full p-4 pb-5">
                        <div className="flex flex-col justify-center items-center flex-1 text-gray-700 gap-7 ">
                            <MdCloudUpload className="text-[var(--primary)] text-7xl" />
                            <hr className="text-[var(--primary)]  w-80" />
                            Choose color to upload product images
                            <hr className="text-[var(--primary)]  w-80" />
                        </div>
                    </div>
                )}
                <SubmitButton children={'Add product'} className={'  mt-4    '} type={'submit'} />
            </FormWrapper>
            {isShowPopup && (
                <VariantPopup
                    colors={selectedColors}
                    sizes={selectedSizes}
                    variants={variants}
                    setVariants={setVariants}
                    onClose={() => setIsShowPopup(false)}
                />
            )}
        </div>
    );
};

export default AddProduct;
