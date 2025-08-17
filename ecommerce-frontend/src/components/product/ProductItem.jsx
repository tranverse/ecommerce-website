import React, { useState } from 'react';
import ProductImage from '@assets/images/Product/product.jpg';
import { BsCartPlus } from 'react-icons/bs';
import { CiStar } from 'react-icons/ci';
import Price from './Price';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addProductToCart, fetchCart } from '@redux/slices/cartSlice';
import ProductPopup from './ProductPopup';
import { FaStar } from 'react-icons/fa';

const ProductItem = ({ product, className }) => {
    const [showProductPopup, setShowProductPopup] = useState(false);

    return (
        <div className="border border-gray-200 hover:shadow-lg cursor-pointer h-full flex flex-col bg-white ">
            <Link to={`/product/${product?.slug}?id=${product?.id}`} className="block ">
                <div className="flex items-start ">
                    <img
                        src={product?.thumbnail}
                        className={`w-full max-w-full h-[360px] object-cover ${className}`}
                        alt="Product"
                    />
                </div>
            </Link>
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
                    <div className="flex my-1 text-base items-center">
                        {product.rating === 0 ? (
                            <p className="text-gray-500 text-sm">Chưa có review</p>
                        ) : (
                            <>
                                {[1, 2, 3, 4, 5].map((i) => {
                                    const ratingFloor = Math.floor(product.rating);
                                    const ratingDecimal = product.rating - ratingFloor;

                                    return (
                                        <span key={i}>
                                            {i <= ratingFloor ? (
                                                <FaStar className="text-yellow-500" />
                                            ) : i === ratingFloor + 1 && ratingDecimal >= 0.5 ? (
                                                <FaStar className="text-yellow-300" />
                                            ) : (
                                                <CiStar className="text-gray-300" />
                                            )}
                                        </span>
                                    );
                                })}
                                <p className="text-[13px] text-yellow-500 pl-1">{product.rating.toFixed(1)}</p>
                            </>
                        )}
                    </div>

                    <div className="text-[13px] text-gray-700">{product?.saleVolume || 0} sold</div>
                </div>
                <div className="flex justify-between mt-auto ">
                    <Price className={'text-md text-[var(--primary)]'}>
                        {product?.price - product?.price * (product?.discountPercentage / 100)}
                    </Price>
                    <BsCartPlus
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            setShowProductPopup(true);
                        }}
                        className="text-2xl text-red-400 hover:text-red-600"
                    />
                </div>
            </div>
            {showProductPopup && (
                <ProductPopup
                    variant={product?.variants}
                    images={product?.images}
                    product={product}
                    onClose={() => setShowProductPopup(false)}
                />
            )}
        </div>
    );
};

export default ProductItem;
