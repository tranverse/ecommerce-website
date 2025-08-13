import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';
const ProtectedRoute = ({ children, allowRoles }) => {
    const navigate = useNavigate();
    const token = useSelector((state) => state.employee?.employeeAccessToken);
    const role = useSelector((state) => state.employee?.employee?.role);
    if (!token) {
        toast.warning('Bạn cần đăng nhập trước khi truy cập hệ thống');
        return <Navigate to={'/user/login'} replace />;
    }
    if (allowRoles && !allowRoles.some((r) => r.role == role)) {
        return <Navigate to={'/unauthorize'} replace />;
    }

    return children;
};

export default ProtectedRoute;
