import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineWarning } from 'react-icons/ai';

const Unauthorize = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-red-50 px-6">
            <AiOutlineWarning className="w-20 h-20 text-red-500 mb-6" />
            <h1 className="text-7xl font-extrabold text-red-600 mb-4">403</h1>
            <h2 className="text-3xl font-semibold text-red-700 mb-2">Không có quyền truy cập</h2>
            <p className="text-lg text-red-600 mb-8 max-w-md text-center">
                Bạn không có quyền truy cập vào trang này. Vui lòng liên hệ quản trị viên hoặc quay lại trang chủ.
            </p>
            <button
                onClick={() => navigate('/dashboard')}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md transition"
            >
                Quay về Trang chủ
            </button>
        </div>
    );
};

export default Unauthorize;
