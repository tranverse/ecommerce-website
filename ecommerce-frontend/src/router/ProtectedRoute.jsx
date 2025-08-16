import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children, allowRoles, userType }) => {
    let token, role;

    if (userType === 'employee') {
        token = useSelector((state) => state.employee?.employeeAccessToken);
        role = useSelector((state) => state.employee?.employee?.role);
    } else if (userType === 'customer') {
        token = useSelector((state) => state.customer?.accessToken);
        role = useSelector((state) => state.customer?.customer?.role);
    }

    if (!token) {
        toast.warning('Bạn cần đăng nhập trước khi truy cập hệ thống');
        return userType === 'employee' ? <Navigate to="/user/login" replace /> : <Navigate to="/customer/login" replace />;
    }

    if (allowRoles && role && !allowRoles.some((r) => r.role === role)) {
        return <Navigate to="/unauthorize" replace />;
    }

    return children;
};

export default ProtectedRoute;
