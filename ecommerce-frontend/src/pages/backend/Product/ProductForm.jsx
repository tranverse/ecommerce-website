import React, { useEffect, useRef, useState } from 'react';
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
import SelectStatus from '../components/SelectStatus';
import Label from '../components/Label';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const ProductForm = ({ initialValues = null, onSubmit, isView = false }) => {
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [colorImages, setColorImages] = useState([]);
    const [variants, setVariants] = useState([]);
    const [images, setImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [status, setStatus] = useState([]);
    const [thumbnail, setThumbnail] = useState('');
    const [url, setUrl] = useState('');
    const inputRefs = useRef({});
    const [colorError, setColorError] = useState('');
    const [sizeError, setSizeError] = useState('');
    const [imageError, setImageError] = useState('');
    const [quantityError, setQuantityError] = useState('');

    const defaultValues = {
        name: initialValues?.name || '',
        description: initialValues?.description || '',
        price: initialValues?.price || 0,
        discountPercentage: initialValues?.discountPercentage || 0,
        origin: initialValues?.origin || '',
        status: initialValues?.status || '',
        category: initialValues?.category?.id || '',
        thumbnail: initialValues?.thumbnail,
    };

    const validateVariants = () => {
        let valid = true;

        if (selectedColors.length === 0) {
            setColorError('Vui lòng chọn ít nhất 1 màu');
            valid = false;
        } else setColorError('');

        if (selectedSizes.length === 0) {
            setSizeError('Vui lòng chọn ít nhất 1 kích thước');
            valid = false;
        } else setSizeError('');

        for (const color of selectedColors) {
            const imgsForColor = images.filter((img) => img.color === color);
            if (imgsForColor.length === 0) {
                setImageError(`Vui lòng chọn ít nhất một ảnh cho màu ${color}`);
                valid = false;
                break;
            }
        }
        if (valid) setImageError('');

        for (const color of selectedColors) {
            for (const size of selectedSizes) {
                const variant = variants.find((v) => v.color === color && v.size === size);
                if (!variant || !variant.quantity || variant.quantity <= 0) {
                    setQuantityError(`Vui lòng nhập số lượng cho biến thể màu ${color} và kích thước ${size}`);
                    valid = false;
                    break;
                }
            }
            if (!valid) break;
        }
        if (valid) setQuantityError('');

        return valid;
    };

    useEffect(() => {
        const fetchData = async () => {
            const catRes = await CategoryService.getAllCategories();
            setCategories(catRes?.data?.data || []);
            const statusRes = await ProductService.getProductStatus();
            setStatus(statusRes?.data?.data || []);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (initialValues) {
            const colorsInVariants = [...new Set((initialValues.variants || []).map((v) => v.color))];
            const sizesInVariants = [...new Set((initialValues.variants || []).map((v) => v.size))];

            setSelectedColors(colorsInVariants);
            setSelectedSizes(sizesInVariants);
            setColorImages(colorsInVariants);

            const newVariants = [];
            colorsInVariants.forEach((color) => {
                sizesInVariants.forEach((size) => {
                    const found = (initialValues.variants || []).find((v) => v.color === color && v.size === size);
                    newVariants.push({ color, size, quantity: found?.quantity || 0 });
                });
            });
            setVariants(newVariants);

            const newImages = (initialValues.images || []).map((img) => ({
                url: img.url,
                color: img.color,
                file: null,
            }));
            setImages(newImages);

            setThumbnail(initialValues.thumbnail || '');
            setUrl(initialValues.thumbnail || '');
        } else {
            setSelectedColors([]);
            setSelectedSizes([]);
            setColorImages([]);
            setVariants([]);
            setImages([]);
            setThumbnail('');
            setUrl('');
        }
    }, [initialValues]);

    useEffect(() => setColorImages(selectedColors), [selectedColors]);

    const handleUploadImages = (color, e) => {
        if (isView) return;
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);

        setImages((prev) => [...prev.filter((img) => img.color !== color), { color, file, url }]);
    };

    const handleRemoveImages = (color, url) => {
        if (isView) return;
        setImages((prev) => prev.filter((img) => !(img.color === color && img.url === url)));
    };

    const uploadImages = async () => {
        const newFiles = images.filter((img) => img.file);
        if (newFiles.length == 0) return null;

        const formData = new FormData();
        const colorsForUpload = newFiles.map((img) => img.color);
        newFiles.forEach((img) => formData.append('files', img.file));
        formData.append('colors', JSON.stringify(colorsForUpload));

        const res = await UploadService.uploadImages(formData);
        const uploaded = res.data.data.map((img, i) => ({
            url: img.url,
            color: colorsForUpload[i],
        }));

        const oldUploadedImages = images.filter((img) => !img.file);
        return [...oldUploadedImages, ...uploaded];
    };

    const uploadThumbnail = async () => {
        if (thumbnail) return initialValues?.thumbnail || '';
        console.log(thumbnail)
        console.log("1")
        const form = new FormData();
        form.append('file', thumbnail);
        const res = await UploadService.uploadSingleImage(form);
        return res.data.data;
    };

    const handleSubmit = async (data, reset) => {
        if (!validateVariants()) return;
        let uploadedImages = null;
        let uploadedThumbnail = thumbnail;

        if (!isView) {
            uploadedImages = await uploadImages();
            uploadedThumbnail = await uploadThumbnail();
        }

        const payload = {
            ...data,
            thumbnail: uploadedThumbnail,
            category: { id: data.category },
            variants,
            images: uploadedImages,
        };
        console.log(payload);

        if (onSubmit) {
            const result = await onSubmit(payload);
            if (result && !isView) {
                reset(initialValues);
                setThumbnail('');
                setUrl('');
                setVariants([]);
                setSelectedColors([]);
                setSelectedSizes([]);
                setImages([]);
            }
        }
    };

    useEffect(() => {
        if (!selectedColors.length || !selectedSizes.length) return;

        const newVariants = [];
        selectedColors.forEach((color) =>
            selectedSizes.forEach((size) => {
                const existing = variants.find((v) => v.color === color && v.size === size);
                newVariants.push({ color, size, quantity: existing?.quantity || 0 });
            }),
        );
        setVariants(newVariants);

        setImages(images.filter((img) => selectedColors.includes(img.color)));
        setColorImages(selectedColors);
    }, [selectedColors, selectedSizes]);
    return (
        <div className="bg-white p-4 shadow rounded border-indigo-50-50">
            <FormWrapper className={'flex flex-col min-h-[620px]'} onSubmit={handleSubmit} defaultValues={defaultValues}>
                <div className="grid grid-cols-[2fr_1.5fr] gap-10">
                    <div className="flex flex-col gap-4">
                        <InputField
                            name="name"
                            label="Product name"
                            placeholder="Enter product name"
                            Element="input"
                            type="text"
                            readOnly={isView}
                        />
                        <InputField name="description" label="Description" Element="textarea" readOnly={isView} />
                        <div>
                            <Label label="Thumbnail" />
                            <UploadImage url={url} setUrl={setUrl} setFile={setThumbnail} className="w-56 h-56" isView={isView} />
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between gap-4">
                            <InputField
                                name="price"
                                type="number"
                                label="Price"
                                placeholder="00.00"
                                Element="input"
                                readOnly={isView}
                            />
                            <InputField name="discountPercentage" label="Discount (%)" Element="input" readOnly={isView} />
                        </div>
                        <div className="flex justify-between gap-4">
                            <InputField name="origin" label="Origin" Element="input" readOnly={isView} />
                            {status.length > 0 && <SelectStatus item={status} name="status" label="Status" disabled={isView} />}
                        </div>
                        {categories.length > 0 && (
                            <SelectCategory items={categories} name="category" label="Category" isAdd={true} disabled={isView} />
                        )}
                        <div>
                            <div className="flex justify-between text-sm">
                                <Label label="Variant" />
                                {!isView && selectedColors.length > 0 && selectedSizes.length > 0 && (
                                    <p
                                        onClick={() => setIsShowPopup(true)}
                                        className="text-[var(--primary)] italic hover:text-green-800 cursor-pointer font-medium"
                                    >
                                        Add quantity for variants
                                    </p>
                                )}
                            </div>
                            <div className="border border-gray-300 border-dashed p-2">
                                <p className="text-gray-700 text-sm mb-1">Color</p>
                                <SelectMutil
                                    variant="color"
                                    value={selectedColors}
                                    items={colors}
                                    setImages={setImages}
                                    onChange={setSelectedColors}
                                    disabled={isView}
                                />
                                {colorError && <p className="text-red-600 text-sm mt-1">{colorError}</p>}

                                <p className="text-gray-700 text-sm mt-4 mb-1">Size</p>
                                <SelectMutil
                                    variant="size"
                                    value={selectedSizes}
                                    items={size}
                                    onChange={setSelectedSizes}
                                    disabled={isView}
                                />
                                {sizeError && <p className="text-red-600 text-sm mt-1">{sizeError}</p>}
                            </div>
                        </div>
                    </div>
                </div>
                {selectedColors.length > 0 && selectedSizes.length > 0 && (
                    <div className="mt-4 max-h-64 overflow-auto border border-gray-300 mb-4 ">
                        <table className="min-w-full text-sm text-left text-gray-700">
                            <thead className="bg-gray-50 sticky top-0 border-b border-gray-300">
                                <tr>
                                    <th className="px-6 py-3 font-semibold text-gray-900 rounded-tl-lg">Color</th>
                                    <th className="px-6 py-3 font-semibold text-gray-900">Size</th>
                                    <th className="px-6 py-3 font-semibold text-gray-900 rounded-tr-lg">Quantity</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {selectedColors.flatMap((color) =>
                                    selectedSizes.map((size) => {
                                        const variant = variants.find((v) => v.color === color && v.size === size);
                                        const quantity = variant ? variant.quantity : 0;

                                        const onQuantityChange = (e) => {
                                            const newQuantity = parseInt(e.target.value) || 0;
                                            let newVariants = [...variants];
                                            const idx = newVariants.findIndex((v) => v.color === color && v.size === size);
                                            if (idx >= 0) {
                                                newVariants[idx] = { ...newVariants[idx], quantity: newQuantity };
                                            } else {
                                                newVariants.push({ color, size, quantity: newQuantity });
                                            }
                                            setVariants(newVariants);
                                        };

                                        return (
                                            <tr
                                                key={`${color}-${size}`}
                                                className="hover:bg-gray-50 transition-colors duration-300"
                                            >
                                                <td className="px-6 py-3 capitalize font-medium text-gray-800 flex items-center gap-2">
                                                    <span
                                                        className="w-5 h-5 rounded-full border border-gray-300"
                                                        style={{ backgroundColor: color }}
                                                    ></span>
                                                    {color}
                                                </td>
                                                <td className="px-6 py-3 capitalize">{size}</td>
                                                <td className="px-6 py-3">
                                                    <input
                                                        type="number"
                                                        min={0}
                                                        value={quantity}
                                                        onChange={onQuantityChange}
                                                        disabled={isView}
                                                        className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                                    />
                                                </td>
                                                {quantityError && <p className="text-red-600 text-sm mt-1">{quantityError}</p>}
                                            </tr>
                                        );
                                    }),
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                <Label label="Product images" />
                {colorImages.map((color, index) => (
                    <div className="border-[var(--primary)] border-dashed border flex items-center w-full p-2" key={index}>
                        <div className="flex w-1/11 items-center gap-4">
                            <div className="flex flex-wrap justify-center items-center gap-2 overflow-y-auto bg-white p-1 px-2">
                                <div
                                    className="w-5 h-5 rounded-full border border-gray-300"
                                    style={{ backgroundColor: color }}
                                ></div>
                                <div>{color.charAt(0).toUpperCase() + color.slice(1)}</div>
                            </div>
                        </div>

                        <div
                            onClick={() => {
                                if (isView) return;
                                inputRefs.current[color].click();
                            }}
                            className="flex flex-wrap flex-1 gap-2 cursor-pointer hover:text-[var(--primary)] hover:bg-purple-50 hover:shadow-md p-1 max-h-[340px] overflow-y-auto"
                        >
                            <input
                                type="file"
                                multiple
                                ref={(ref) => {
                                    if (ref) inputRefs.current[color] = ref;
                                }}
                                hidden
                                onChange={(e) => handleUploadImages(color, e)}
                                disabled={isView}
                            />
                            {images
                                .filter((img) => img.color === color)
                                .map((image, i) => (
                                    <div
                                        key={i}
                                        className="border border-[var(--primary)] border-dashed w-40 h-40 relative rounded-md"
                                    >
                                        {!isView && (
                                            <IoCloseOutline
                                                className="absolute top-1 bg-purple-400 p-0.5 text-white rounded-full right-1 cursor-pointer text-2xl hover:bg-red-400"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleRemoveImages(image.color, image.url);
                                                }}
                                            />
                                        )}
                                        <img
                                            src={image.url}
                                            alt={`product-img-${i}`}
                                            className="object-cover w-full h-full rounded-md"
                                        />
                                    </div>
                                ))}
                            {!images.some((img) => img.color === color) && (
                                <div className="flex items-center justify-center gap-2 px-2">
                                    <MdCloudUpload className="text-[var(--primary)]" />
                                    Upload images
                                </div>
                            )}
                        </div>
                        {imageError && <p className="text-red-600 text-sm mt-1">{imageError}</p>}
                    </div>
                ))}

                {!colorImages.length && (
                    <div className="border border-[var(--primary)] border-dashed flex flex-col justify-center w-full p-4 pb-5">
                        <div className="flex flex-col justify-center items-center flex-1 text-gray-700 gap-7">
                            <MdCloudUpload className="text-[var(--primary)] text-7xl" />
                            <hr className="text-[var(--primary)] w-80" />
                            Choose color to upload product images
                            <hr className="text-[var(--primary)] w-80" />
                        </div>
                    </div>
                )}

                {!isView && (
                    <SubmitButton className="mt-4 p-2 font-semibold" type="submit">
                        {initialValues ? 'Update product' : 'Add product'}
                    </SubmitButton>
                )}
            </FormWrapper>
        </div>
    );
};

export default ProductForm;
