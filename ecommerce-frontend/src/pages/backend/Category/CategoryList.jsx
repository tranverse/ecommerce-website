import CategoryService from '@services/category.service';
import React, { useEffect, useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { FaRegEye } from 'react-icons/fa';
import { TbCheckupList } from 'react-icons/tb';
import { MdOutlineDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
const CategoryList = () => {
    const [categories, setCategories] = useState([]);

    const getAllCategory = async () => {
        try {
            const response = await CategoryService.getAllCategories();
            if (response.data.success) {
                setCategories(response.data.data);
            }
        } catch (error) {
            console.error('Lỗi khi lấy danh sách category:', error);
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);


    const handleDelete = (catId) => {
        if (window.confirm('Bạn có chắc muốn xóa danh mục này?')) {
            console.log('Xóa danh mục:', catId);
            setCategories((prev) => prev.filter((c) => c.id !== catId));
        }
    };
    console.log(categories);
    return (
        <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
            <h2 className="text-2xl font-semibold mb-6 text-[var(--primary)] text-center">Danh sách danh mục</h2>

            <table className="min-w-full">
                <thead className="bg-purple-50">
                    <tr>
                        <th className="px-4 py-3  text-center text-gray-700">STT</th>
                        <th className="px-4 py-3  text-left text-gray-700">Tên danh mục</th>
                        <th className="px-4 py-3  text-left text-gray-700">Thumbnail</th>
                        <th className="px-4 py-3  text-center text-gray-700">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((cat, index) => (
                        <tr key={cat.id} className="hover:bg-gray-50 transition">
                            <td className='text-center'>{index + 1}</td>
                            <td className="px-4 py-3 ">{cat.name}</td>
                            <td className="px-4 py-3 ">
                                {cat.thumbnail && (
                                    <img
                                        src={cat.thumbnail}
                                        alt={cat.name}
                                        className="w-16 h-16 object-cover rounded-lg shadow-sm"
                                    />
                                )}
                            </td>
                            <td className="    ">
                                <div className="flex gap-1 items-center justify-center">
                                    <Link to={`/user/view-category/${cat.id}`}>
                                        <FaRegEye className="cursor-pointer text-[var(--primary)] text-lg  " />
                                    </Link>
                                    <Link to={`/user/update-category/${cat.id}`}>
                                        <TbCheckupList className="cursor-pointer text-[var(--primary)] text-lg  " />
                                    </Link>
                                    <MdOutlineDelete className="cursor-pointer text-red-500 text-lg " />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {categories.length === 0 && <p className="mt-4 text-center text-gray-500">Không có danh mục nào.</p>}
        </div>
    );
};

export default CategoryList;
