import React from 'react';
import ProductImage from '@assets/images/Product/product.jpg';
import { BsCartPlus } from 'react-icons/bs';
import { CiStar } from 'react-icons/ci';
import Price from './Price';
import { Link } from 'react-router-dom';
const ProductItem = ({ product }) => {
    return (
        <div className="border border-gray-200 hover:shadow-lg cursor-pointer h-full flex flex-col">
            <div className="">
                <img src={product?.thumbnail} className="w-full max-w-full h-[320px] object-contain" alt="Product" />
            </div>
            <div className="p-2 flex flex-col justify-between h-full ">
                <div className=" text-base line-clamp-2 text-gray-700">
                    {product?.discountPercentage > 0 && (
                        <span className=" border text-[12px] p-0 text-red-500 border-red-500 px-1   ">
                            -{product?.discountPercentage}%
                        </span>
                    )}{' '}
                    {product?.name}
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex my-1 text-base items-center ">
                        <CiStar />
                        <CiStar />
                        <CiStar />
                        <CiStar />
                        <CiStar />

                        <p className="text-[13px] text-yellow-500 pl-1">4.8</p>
                    </div>
                    <div className="text-[13px] text-gray-700">1k3 sold</div>
                </div>
                <div className="flex justify-between mt-auto ">
                    <Price className={'text-md text-[var(--primary)]'}>
                        {product?.price - product?.price * (product?.discountPercentage / 100)}
                    </Price>
                    <BsCartPlus className="text-2xl text-red-400 hover:text-red-600" />
                </div>
            </div>
        </div>
    );
};

export default ProductItem;
