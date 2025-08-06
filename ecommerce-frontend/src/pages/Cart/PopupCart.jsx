import React from 'react';
import SubmitButton from '@components/Form/SubmitButton';
import Price from '@components/product/Price';
import { Link } from 'react-router-dom';
const PopupCart = ({ items, className }) => {
    return (
        <div
            className={`w-[500px]  p-2 text-sm text-gray-700 flex flex-col gap-4 shadow-md border border-gray-300 bg-white z-10 ${className}`}
        >
            <div className="flex flex-col gap-2 items-center overflow-y-auto">
                {items?.map((product, index) => (
                    <Link
                        to={`/product/${product?.product?.slug}?id=${product?.product?.id}`}
                        className="block"
                        key={index}
                    >
                        <div className="flex items-center cursor-pointer gap-2 hover:bg-gray-100 p-1">
                            <div className="flex items-center w-[70px] h-[70px] flex-shrink-0">
                                <img src={product?.product.thumbnail} className="w-full h-full object-cover " alt="" />
                            </div>
                            <div className=" flex-1 flex flex-col">
                                <p className="line-clamp-1">{product?.product.name}</p>
                                <p>
                                    {product?.variant?.color}/{product?.variant?.size}
                                </p>
                            </div>
                            <Price className={'w-1/3 text-red-500 font-semibold'}>{product?.product.price}</Price>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="flex justify-between items-center ">
                <p className="w-1/3">{items.length} items in cart</p>
                <SubmitButton className={'text-base hover:bg-purple-500 hover:shadow'}>View cart</SubmitButton>
            </div>
        </div>
    );
};

export default PopupCart;
