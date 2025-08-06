import React from 'react';
import Price from '@components/product/Price';
const OrderItem = ({ detail }) => {
    return (
        <div>
            <div className="flex gap-4   items-center border-gray-200 my-2  border-b ">
                <div className="w-30  ">
                    <img src={detail?.product?.thumbnail} className="w-[80px] h-[80px] object-cover " alt="" />
                </div>
                <div className="w-full   ">
                    <p>{detail?.product?.name}</p>
                    <p className="text-sm text-gray-500">
                        <span>Variant: </span>
                        {detail?.variant?.color.charAt(0).toUpperCase() + detail?.variant?.color.slice(1)}/
                        {detail?.variant?.size}
                    </p>
                    <p className="text-sm ">
                        <span>x</span>
                        {detail?.quantity}
                    </p>
                </div>
                <div className="w-36  flex justify-center gap-2 items-center ">
                    <Price className={'text-sm line-through font-normal '}>{detail?.originalPrice}</Price>
                    <Price className={'text-orange-500 font-normal   '}>{detail?.discountPrice}</Price>
                </div>
            </div>
        </div>
    );
};

export default OrderItem;
