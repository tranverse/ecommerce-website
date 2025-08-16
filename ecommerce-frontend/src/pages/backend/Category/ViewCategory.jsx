import CategoryService from '@services/category.service';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import UploadImage from '../components/UploadThumbnail';
import FormWrapper from '@components/Form';
import { FaRegEye } from 'react-icons/fa';

const ViewCategory = () => {
    const [category, setCategory] = useState(null);
    const { categoryId } = useParams();

    const getCategory = async () => {
        try {
            const response = await CategoryService.getCategoryById(categoryId);
            if (response.data.success) {
                setCategory(response.data.data); // chú ý: lấy data
            }
        } catch (error) {
            console.error('Lỗi khi lấy chi tiết danh mục:', error);
        }
    };
    const handleDeleteCategory = async () => {
        
    }
    useEffect(() => {
        getCategory();
    }, [categoryId]);

    if (!category) return <p className="text-center mt-4">Đang tải...</p>;

    return (
        <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
            <h2 className="text-2xl font-semibold mb-6 text-[var(--primary)] text-center">Chi tiết danh mục</h2>
            <FormWrapper>
                <div className="flex items-center gap-4 mb-6">
                    <div>
                        <UploadImage url={category?.thumbnail} setFile={''} setUrl={''} isView={true} className={'w-80 h-80'} />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">{category?.name}</h3>
                    </div>
                </div>

                {category?.subCategories && category?.subCategories.length > 0 && (
                    <div>
                        <h4 className="text-lg font-semibold mb-2">Danh mục con</h4>
                        <table className="min-w-full border-collapse border border-gray-200">
                            <thead className="bg-purple-50">
                                <tr>
                                    <th className="px-4 py-2 text-left text-gray-700">Tên danh mục con</th>
                                    <th className="px-4 py-2 text-left text-gray-700">Thumbnail</th>
                                    <th className="px-4 py-2 text-center text-gray-700">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {category?.subCategories.map((sub) => (
                                    <tr key={sub.id} className="hover:bg-gray-50 transition cursor-pointer">
                                        <td className="px-4 py-2 ">{sub.name}</td>
                                        <td className="px-4 py-2 ">
                                            {sub?.thumbnail && (
                                                <img
                                                    src={sub?.thumbnail}
                                                    alt={sub?.name}
                                                    className="w-16 h-16 object-cover rounded-lg shadow-sm"
                                                />
                                            )}
                                        </td>
                                        <td className=" text-[var(--primary)]">
                                            <Link to={`/user/view-category/${sub?.id}`}>
                                                <div className="flex justify-center items-center">
                                                    <FaRegEye />
                                                </div>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </FormWrapper>
        </div>
    );
};

export default ViewCategory;
