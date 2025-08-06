import React from 'react';
import ProductImage from '@assets/images/Product/product.jpg';
import { IoIosArrowDown } from 'react-icons/io';
import { GoPlus } from 'react-icons/go';
import { HiOutlineMinus } from 'react-icons/hi2';
import { IoTrashOutline } from "react-icons/io5";

const Cart = () => {
    return (
        <div className="mt-32 flex shadow p-2">
            <div className="w-4/5">
                <div className="flex my-5">
                    <input type="checkbox" />
                    <p>Ownfit</p>
                </div>
                <div className="flex my-5 gap-4 border">
                    <div className="flex items-center">
                        <input type="checkbox" />
                    </div>
                    <div className="">
                        <div className="flex gap-4">
                            <div>
                                <img src={ProductImage} className="w-[150px] h-[150px]" alt="" />
                            </div>
                            <div>
                                <p>Phân loại hàng này bán hết, vui lòng lựa chọn một phân loại khác</p>
                                <p>Sold by</p>
                                <div className="flex">
                                    Black /41
                                    <IoIosArrowDown />
                                </div>
                            <div className="flex items-center justify-between">
                                <p>100đ</p>
                                <div className="flex items-center gap-10 my-5">
                                    <div className="flex">
                                        <button className="border border-gray-300 px-2 py-2">
                                            <HiOutlineMinus className="text-gray-500" />
                                        </button>
                                        <input
                                            type="text"
                                            value={1}
                                            className="w-10 text-center text-gray-500 border-b border-t border-gray-300 focus:outline-none "
                                        />
                                        <button className="border border-gray-300 px-2 py-2">
                                            <GoPlus className="text-gray-500" />
                                        </button>
                                    </div>
                                </div>
                                <IoTrashOutline />
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" justify-end gap-20 my-5 w-1/5">
                <h1>Order summary</h1>
                <div className="flex gap-2">
                    <img src={ProductImage} className="w-[50px] h-[50px]" alt="" />
                    <img src={ProductImage} className="w-[50px] h-[50px]" alt="" />
                    <img src={ProductImage} className="w-[50px] h-[50px]" alt="" />
                    <img src={ProductImage} className="w-[50px] h-[50px]" alt="" />
                </div>
                <p>Estimated price: 100đ</p>
                <p>Save: 5đ</p>
                <button>Check out</button>
            </div>
        </div>
    );
};

export default Cart;
