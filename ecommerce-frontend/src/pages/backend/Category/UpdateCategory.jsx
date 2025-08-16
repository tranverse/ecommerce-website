import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import FormWrapper from '@components/Form';
import InputField from '@components/Form/InputField';
import SubmitButton from '@components/Form/SubmitButton';
import SelectOption from '@pages/backend/components/SelectOption';
import UploadImage from '../components/UploadThumbnail';
import CategoryService from '@services/category.service';
import UploadService from '@services/upload.service';
import { toast } from 'react-toastify';
import SelectCategory from '../components/SelectCategory';
import { FaRegEye } from 'react-icons/fa';
import { TbCheckupList } from 'react-icons/tb';
const UpdateCategory = () => {
    const { categoryId } = useParams();
    const [category, setCategory] = useState({});
    const [parentCategories, setParentCategories] = useState([]);
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState('');
    const [defaultValues, setDefaultValues] = useState({});
    const isParent = category.subCategories?.length > 0;
    useEffect(() => {
        setDefaultValues({
            name: category?.name || '',
            parentCategory: isParent ? '' : category.parentCategory?.id || '',
        });
    }, [category]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [catRes, parentRes] = await Promise.all([
                    CategoryService.getCategoryById(categoryId),
                    CategoryService.getAllCategories(),
                ]);

                if (catRes.data.success) {
                    setCategory(catRes.data.data);
                    setUrl(catRes.data.data.thumbnail || '');
                }
                setParentCategories(parentRes.data.data.filter((cat) => cat.id !== categoryId));
            } catch (error) {
                toast.error(error.message || 'Lỗi khi tải dữ liệu');
            }
        };
        fetchData();
    }, [categoryId]);

    const handleUploadImage = async () => {
        if (!file) return category.thumbnail || '';
        const form = new FormData();
        form.append('file', file);
        const res = await UploadService.uploadSingleImage(form);
        return res.data.data;
    };

    const handleUpdateCategory = async (data, reset) => {
        const thumbnail = await handleUploadImage();
        const payload = {
            name: data.name,
            thumbnail,
            parentCategory: isParent ? null : data.parentCategory ? { id: data.parentCategory } : null,
        };
        console.log(payload);
        const res = await CategoryService.updateCategory(categoryId, payload);
        console.log(res);
        if (res.data.success) {
            toast.success(res.data.message);
            const updatedCategory = res.data.data; // backend trả về category mới

            reset({
                name: updatedCategory.name,
                parentCategory: updatedCategory.parentCategory?.id || '',
            });
            setUrl(payload.thumbnail);
            setFile(null);
        } else {
            toast.error(res.data.message);
        }
    };
    console.log(category);
    return (
        <div className="bg-white p-4 text-gray-700 rounded-md shadow min-h-[650px]">
            <h2 className="text-2xl font-semibold mb-4 text-center text-[var(--primary)]">Cập nhật Category</h2>
            {category?.id && (
                <FormWrapper
                    onSubmit={handleUpdateCategory}
                    defaultValues={{
                        name: category.name || '',
                        parentCategory: isParent ? '' : category.parentCategory?.id || '',
                    }}
                    key={category?.id}
                >
                    <div className="flex flex-col gap-4">
                        <InputField Element="input" name="name" label="Name" type={'text'} />

                        {!isParent && (
                            <SelectCategory
                                items={parentCategories}
                                name="parentCategory"
                                label="Parent category"
                                isAdd={true}
                            />
                        )}

                        <div className="m-1">
                            <div className="flex items-center gap-2">
                                <p>Thumbnail</p>
                                <span className="text-red-500">*</span>
                            </div>
                            <UploadImage setFile={setFile} setUrl={setUrl} url={url} className="w-72 h-80" />
                        </div>

                        <div className="mt-auto">
                            <SubmitButton type="submit" className="my-4 p-2 text-md hover:bg-purple-500">
                                Cập nhật category
                            </SubmitButton>
                        </div>
                    </div>
                </FormWrapper>
            )}

            {isParent && category.subCategories?.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-2">Sub Categories</h3>
                    <table className="min-w-full border border-gray-200 rounded overflow-hidden">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2 text-left">Tên loại sản phẩm</th>
                                <th className="px-4 py-2 text-left">Thumbnail</th>
                                <th className="px-4 py-2 text-center">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {category.subCategories.map((sub) => (
                                <tr key={sub.id} className="hover:bg-gray-50 transition cursor-pointer">
                                    <td className="px-4 py-2">{sub.name}</td>
                                    <td className="px-4 py-2">
                                        {sub.thumbnail && (
                                            <img
                                                src={sub.thumbnail}
                                                alt={sub.name}
                                                className="w-16 h-16 object-cover rounded shadow-sm"
                                            />
                                        )}
                                    </td>
                                    <td className="">
                                        <div className="flex items-center gap-4  justify-center">
                                            <Link
                                                to={`/user/view-category/${sub.id}`}
                                                className="text-blue-500 hover:text-blue-700"
                                            >
                                                <FaRegEye className="cursor-pointer text-[var(--primary)] text-lg  " />
                                            </Link>
                                            <Link
                                                to={`/user/update-category/${sub.id}`}
                                                className="text-green-500 hover:text-green-700"
                                            >
                                                <TbCheckupList className="cursor-pointer text-[var(--primary)] text-lg  " />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UpdateCategory;
