import React from 'react';
import ProductImage from '@assets/images/Product/product.jpg';
import Size from './components/Size';
import { BsCartPlus } from 'react-icons/bs';
import { GoPlus } from "react-icons/go";
import { HiOutlineMinus } from "react-icons/hi2";

const ProductDetail = () => {
    return (
        <div className="mt-32 flex gap-20 p-2 bg-white">
            <div className="flex gap-2">
                <div className=" flex flex-col gap-2 ">
                    <img src={ProductImage} className="" width={50} height={50} alt="" />
                    <img src={ProductImage} className="" width={50} height={50} alt="" />
                    <img src={ProductImage} className="" width={50} height={50} alt="" />
                </div>
                <div>
                    <img src={ProductImage} className="w-[500px] h-[450px]" alt="" />
                </div>
            </div>
            <div>
                <div>
                    <p className="text-lg text-gray-700">
                        Áo thun cộc tay cổ vuông chất liệu thun tăm ôm body, áo babytee tôn dáng phong cách hàn quốc
                    </p>
                    <p className="text-pink-300 font-semibold">100đ</p>
                </div>
                <div>
                    <p className='text-gray-500'>Color: <span>White</span></p>
                    <div className="flex gap-2 px-10 py-5">
                        <img src={ProductImage} className="" width={60} height={60} alt="" />
                        <img src={ProductImage} className="" width={60} height={60} alt="" />
                        <img src={ProductImage} className="" width={60} height={60} alt="" />
                    </div>
                </div>
                <div className='flex gap-10 items-center my-5'>
                    <p className='text-gray-500'>Size</p>
                    <div className="flex gap-4">
                        <Size size={'M (50-55KG)'}></Size>
                        <Size size={'L (50-55KG)'}></Size>
                        <Size size={'XL (50-55KG)'}></Size>
                    </div>
                </div>
                <div className='flex items-center gap-10 my-5'>
                    <p className='text-gray-500'>Quantity</p>
                    <div className='flex'>
                        <button className='border border-gray-300 px-3 py-2'><HiOutlineMinus className='text-gray-500' /></button>
                        <input type="text" value={1} className='w-10 text-center text-gray-500 border-b border-t border-gray-300 focus:outline-none '/>
                        <button className='border border-gray-300 px-3 py-2'><GoPlus className='text-gray-500'/></button>
                    </div>
                </div>
                <div className="flex gap-10 my-5">
                    <button className="flex w-60 justify-center  items-center gap-2 border border-[var(--primary)] text-[var(--primary)] cursor-pointer p-4 bg-purple-100">
                        <BsCartPlus className='text-[22px]'/> Add to cart
                    </button>
                    <button className=" bg-[var(--primary)] p-4 text-white">Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
