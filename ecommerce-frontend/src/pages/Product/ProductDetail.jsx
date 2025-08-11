import React, { useEffect, useState } from 'react';
import ProductImage from '@assets/images/Product/product.jpg';
import Size from './components/Size';
import { BsCartPlus } from 'react-icons/bs';
import { GoPlus } from 'react-icons/go';
import { HiOutlineMinus } from 'react-icons/hi2';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { NumberFomart } from '@utils/NumberFomart';
import ProductService from '@services/product.service';
import { BsInfoSquare } from 'react-icons/bs';
import { CiStar } from 'react-icons/ci';
import { GoHeart } from 'react-icons/go';
import Price from '@components/product/Price';
import CartService from '@services/cart.service';
import { toast } from 'react-toastify';
import QuantityBox from '@components/product/QuantityBox';
import { size } from '@utils/Variant';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart, fetchCart } from '@redux/slices/cartSlice';
const ProductDetail = () => {
    const dispatch = useDispatch();
    const [product, setProduct] = useState({});
    const [searchParams] = useSearchParams();
    const [quantity, setQuantity] = useState(1);
    const [chosenVariant, setChosenVariant] = useState({});
    const [chosenColor, setChosenColor] = useState('');
    const [chosenSize, setChosenSize] = useState('');
    const productId = searchParams.get('id');
    const [imgThumbnail, setImgThumbnail] = useState('');
    const customerId = useSelector((state) => state.customer?.customer?.id);
    console.log(customerId);
    const getProductDetail = async () => {
        const response = await ProductService.getProduct(productId);
        setProduct(response.data.data);
        setImgThumbnail(response.data.data.thumbnail);
    };

    useEffect(() => {
        getProductDetail();
    }, []);
    useEffect(() => {
        handleChooseVariant();
    }, [chosenColor, chosenSize]);

    const handleChooseVariant = () => {
        if (chosenColor != '' && chosenSize != '') {
            setChosenVariant(product?.variants?.find((p) => p.size == chosenSize && p.color === chosenColor));
        }
    };
    const handleAddProductToCart = async () => {
        const payload = {
            variant: { id: chosenVariant?.id },
            product: { id: productId },
            quantity: quantity,
            customer: { id: customerId },
        };
        await dispatch(addProductToCart(payload));
        await dispatch(fetchCart());
    };

    console.log(chosenVariant);
    return (
        <div className="md:mt-31 mt-25 ">
            <div className="grid grid-cols-1 md:grid-cols-[2fr_2.5fr] md:gap-5 gap-4 px-2 rounded-lg  py-4 bg-white">
                <div className="flex gap-2 justify-center items-center ">
                    <div className="flex gap-2">
                        <div className="hidden md:flex md:flex-col gap-2 ">
                            {product?.images?.map((img, index) => (
                                <img
                                    onClick={() => setImgThumbnail(img.url)}
                                    key={index}
                                    src={img.url}
                                    className="cursor-pointer"
                                    width={50}
                                    height={50}
                                />
                            ))}
                        </div>
                        <img src={imgThumbnail} className="w-[500px] h-[500px] object-contain" alt="" />
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div>
                        <p className="text-lg text-gray-700">{product?.name}</p>
                    </div>
                    <div className="flex items-center gap-2 ">
                        <div className="flex text-yellow-500">
                            <CiStar />
                            <CiStar />
                            <CiStar />
                            <CiStar />
                            <CiStar />
                        </div>
                        <p className="border-r text-gray-600 pr-4">4.5</p>
                        <p className="cursor-pointer  text-yellow-500">100 Reviews</p>
                    </div>
                    <div className="flex items-center gap-2 text-[var(--primary)] bg-gray-50 p-4 mb-4">
                        <Price className={'text-3xl'}>
                            {product?.price - product?.price * (product?.discountPercentage / 100)}
                        </Price>
                        <BsInfoSquare className="text-sm cursor-pointer" />

                        {product?.discountPercentage > 0 && (
                            <>
                                <p className="line-through text-gray-400 text-base">
                                    {NumberFomart(product?.price)}
                                    <span className="text-sm underline ">đ</span>
                                </p>
                                <p className="bg-[var(--primary)] px-1 text-white text-sm">-{product?.discountPercentage}%</p>
                            </>
                        )}
                    </div>
                    <div className="flex gap-2 items-center">
                        <div className="text-gray-500 w-1/7">Color:</div>
                        <div className="">
                            <p className="text-sm text-gray-700 mb-1 ">
                                {chosenColor ? chosenColor.charAt(0).toUpperCase() + chosenColor.slice(1) : '\u00A0'}
                            </p>
                            <div className="flex  overflow-x-auto gap-2">
                                {product?.images
                                    ?.filter((color, index, self) => index === self.findIndex((c) => c.color === color.color))
                                    .map((img, index) => (
                                        <div
                                            key={index}
                                            className={`cursor-pointer hover:border-[var(--primary)]  border
                                            ${chosenColor === img.color ? 'border-[var(--primary)] border-2 ' : 'border-gray-300 '} `}
                                        >
                                            <img
                                                onClick={() => setChosenColor(img.color)}
                                                src={img?.url}
                                                className="object-contain w-[60px] h-[60px] rounded-sm"
                                                key={index}
                                            />
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2 items-center">
                        <div className="text-gray-500 w-1/7 ">Size:</div>
                        <div className="flex gap-4">
                            {product?.variants
                                ?.filter((variant, index, self) => index === self.findIndex((v) => v.size === variant.size))
                                .map((variant, index) => (
                                    <div onClick={() => setChosenSize(variant?.size)} key={index}>
                                        <Size size={variant?.size} chosenSize={chosenSize}></Size>
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className="">
                        <QuantityBox setQuantity={setQuantity} quantity={quantity} chosenVariant={chosenVariant} />
                    </div>
                    <div className="flex gap-5 mt-5 justify-between items-center font-semibold">
                        <div className="w-full ">
                            <button
                                disabled={Object.keys(chosenVariant).length == 0}
                                onClick={handleAddProductToCart}
                                className="flex w-full justify-center  items-center gap-2 border border-[var(--primary)] rounded-lg
                        text-[var(--primary)] cursor-pointer p-3 bg-purple-50 hover:bg-[var(--primary)] hover:text-white"
                            >
                                <BsCartPlus className="text-[22px]" /> Add to cart
                            </button>
                        </div>
                        <div className="w-full">
                            <button className=" w-full bg-[var(--primary)] p-3 text-white rounded-lg">Buy Now</button>
                        </div>
                        <div className="w-fit flex flex-col items-center justify-center">
                            <GoHeart className="text-3xl text-[var(--primary)] cursor-pointer" />
                            <p className="text-sm text-gray-600">Like</p>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h1>Reviews</h1>
                <div>
                    <div>
                        <div>4.9/5</div>
                        <div>ALl</div>
                    </div>
                    <div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
