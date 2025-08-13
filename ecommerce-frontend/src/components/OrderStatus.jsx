import React from 'react';

const OrderStatus = (status) => {
    const statusMap = {
        PENDING: { text: 'Chờ xác nhận', color: 'bg-yellow-100 text-yellow-800' },
        PROCESS: { text: 'Đang xử lý', color: 'bg-blue-100 text-blue-800' },
        FINISH: { text: 'Đã hoàn thành', color: 'bg-green-100 text-green-800' },
    };
    return statusMap[status] || { text: 'Không xác định', color: 'bg-gray-100 text-gray-800' };
};

export default OrderStatus;
