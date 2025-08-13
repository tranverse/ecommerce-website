import React from 'react';

const ProductStatus = (status) => {
    if (status == "Có sẵn") {
        return 'bg-green-300 px-1 text-green-800 rounded-2xl';
    } else if (status == "Hết hàng") {
        return 'bg-yellow-300 px-1 rounded-2xl';
    } else if(status == "Ngừng kinh doanh") {
        return 'bg-red-500 px-1 rounded-2xl';
    }
};

export default ProductStatus;
