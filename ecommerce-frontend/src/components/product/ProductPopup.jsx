import React, { useState } from 'react';
import { X, Heart } from 'lucide-react';
import { BsCartPlus } from 'react-icons/bs';
import { GoHeart } from 'react-icons/go';
import SubmitButton from '@components/Form/SubmitButton';
import Size from '@pages/Product/components/Size';
import QuantityBox from './QuantityBox';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart, fetchCart } from '@redux/slices/cartSlice';

const ProductPopup = ({ product, variants, images, onClose }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [imgThumbnail, setImgThumbnail] = useState(product?.images?.[0]?.url || '');
    const [chosenColor, setChosenColor] = useState('');
    const [chosenSize, setChosenSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const isLoggedIn = useSelector((state) => state.customer.isLoggedIn);
    const customerId = useSelector((state) => state.customer?.customer?.id);
    const dispatch = useDispatch();

    const chosenVariant = product?.variants?.find((v) => v.color === chosenColor && v.size === chosenSize) || {};

    const isOutOfStock = !chosenVariant?.id || chosenVariant.quantity === 0;

    const handleAddProductToCart = async () => {
        if (!isLoggedIn) {
            toast.warning('Vui lòng đăng nhập trước khi thêm sản phẩm vào giỏ hàng');
            navigate('/customer/login');
            return;
        }
        const payload = {
            variant: { id: chosenVariant?.id },
            product: { id: product?.id },
            quantity: quantity,
            customer: { id: customerId },
        };
        console.log(payload);
        await dispatch(addProductToCart(payload));
        await dispatch(fetchCart());
    };

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center  ">
                <div onClick={onClose} className="fixed inset-0 bg-black/50" />

                <div className="relative bg-white rounded-2xl p-6 w-[900px] max-h-[90vh] overflow-y-auto shadow-lg z-10">
                    <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-black cursor-pointer">
                        <X size={22} />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-[2fr_2.5fr] gap-6">
                        <div className="flex gap-2 justify-center items-start">
                            <div className="hidden md:flex flex-col gap-2">
                                {product?.images?.map((img, index) => (
                                    <img
                                        onClick={() => setImgThumbnail(img.url)}
                                        key={index}
                                        src={img.url}
                                        className="cursor-pointer border w-[60px] h-[60px] object-contain"
                                        alt=""
                                    />
                                ))}
                            </div>
                            <img src={imgThumbnail} className="w-[400px] h-[400px] object-contain rounded-lg border" alt="" />
                        </div>

                        <div className="flex flex-col gap-4">
                            <h2 className="text-xl font-semibold">{product?.name}</h2>

                            <div className="flex items-center gap-3 text-[var(--primary)] bg-gray-50 p-3 rounded">
                                <p className="text-2xl font-bold">
                                    {product?.price - product?.price * (product?.discountPercentage / 100)}đ
                                </p>
                                {product?.discountPercentage > 0 && (
                                    <>
                                        <p className="line-through text-gray-400 text-base">{product?.price}đ</p>
                                        <p className="bg-[var(--primary)] px-2 text-white text-sm rounded">
                                            -{product?.discountPercentage}%
                                        </p>
                                    </>
                                )}
                            </div>

                            <div className="flex gap-2 items-center">
                                <span className="text-gray-600 w-20">Màu:</span>
                                <div className="flex gap-2 overflow-x-auto">
                                    {product?.images
                                        ?.filter((img, i, arr) => i === arr.findIndex((x) => x.color === img.color))
                                        .map((img, index) => (
                                            <div
                                                key={index}
                                                onClick={() => {
                                                    setChosenColor(img.color);
                                                    setImgThumbnail(img.url);
                                                }}
                                                className={`cursor-pointer border rounded p-1 ${
                                                    chosenColor === img.color
                                                        ? 'border-[var(--primary)] border-2'
                                                        : 'border-gray-300'
                                                }`}
                                            >
                                                <img src={img.url} className="w-[50px] h-[50px] object-contain" alt="" />
                                            </div>
                                        ))}
                                </div>
                            </div>

                            <div className="flex gap-2 items-center">
                                <span className="text-gray-600 w-20">Size:</span>
                                <div className="flex gap-2">
                                    {product?.variants
                                        ?.filter((v, i, arr) => i === arr.findIndex((x) => x.size === v.size))
                                        .map((v, index) => (
                                            <div onClick={() => setChosenSize(v.size)} key={index}>
                                                <Size size={v.size} chosenSize={chosenSize} />
                                            </div>
                                        ))}
                                </div>
                            </div>

                            <QuantityBox quantity={quantity} setQuantity={setQuantity} chosenVariant={chosenVariant} />

                            <div className="flex gap-4 mt-5 justify-between items-center font-semibold">
                                <SubmitButton
                                    disabled={isOutOfStock}
                                    onClick={handleAddProductToCart}
                                    className="flex w-full justify-center items-center gap-2 border border-[var(--primary)] rounded-lg
                                    text-[var(--primary)] p-3 hover:bg-[var(--primary)] hover:text-white disabled:opacity-50"
                                >
                                    <BsCartPlus className="text-[22px]" /> Thêm vào giỏ hàng
                                </SubmitButton>

                                <div className="w-fit flex flex-col items-center justify-center">
                                    <GoHeart className="text-3xl text-[var(--primary)] cursor-pointer" />
                                    <p className="text-sm text-gray-600">Like</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductPopup;
