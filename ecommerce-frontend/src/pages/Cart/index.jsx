import React, { useEffect, useState } from 'react';
import ProductImage from '@assets/images/Product/product.jpg';
import { IoIosArrowDown } from 'react-icons/io';
import { GoPlus } from 'react-icons/go';
import { HiOutlineMinus } from 'react-icons/hi2';
import { IoTrashOutline } from 'react-icons/io5';
import CartService from '@services/cart.service';
import Price from '@components/product/Price';
import SubmitButton from '@components/Form/SubmitButton';
import { FaCheck } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProductFromCart, fetchCart, updateQuantity } from '@redux/slices/cartSlice';
import VariantBox from '@components/product/VariantBox';
import QuantityBox from '@components/product/QuantityBox';
import { LiaCartPlusSolid } from 'react-icons/lia';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Cart = () => {
    const dispatch = useDispatch();
    const [chosenProduct, setChosenProducts] = useState([]);
    const [isCheckAll, setIsCheckAll] = useState(false);
    const customerId = 'e44f65c3-bb15-48d9-8f9a-4ce71484b681';
    const products = useSelector((state) => state.cart.items);
    const [totalPrice, setTotalPrice] = useState(null);
    const [discountPrice, setDiscountPrice] = useState(null);
    const [order, setOrder] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(fetchCart(customerId));
    }, [dispatch, customerId]);

    const getAllProductsIncart = async () => {};

    useEffect(() => {
        getAllProductsIncart();
    }, []);
    useEffect(() => {
        if (chosenProduct.length < products.length) {
            setIsCheckAll(false);
        }
    }, [chosenProduct]);
    const handleCaculatePrice = (product) => {
        let price = product?.product?.price - (product?.product.price * product?.product?.discountPercentage) / 100;
        let discountPrice = (product?.product.price * product?.product?.discountPercentage) / 100;
        return { price: Number(price), discountPrice: Number(discountPrice) };
    };
    const handleDeleteProduct = (productId) => {
        dispatch(
            deleteProductFromCart({
                productId: productId,
                customerId,
            }),
        );
        const product = chosenProduct.find((p) => p.product.id == productId);
        setChosenProducts((prev) => prev.filter((p) => p.product.id !== productId));
        if (product) {
            const { price, discountPrice } = handleCaculatePrice(product);
            setTotalPrice((prev) => prev - price * product.quantity);
            setDiscountPrice((prev) => prev - discountPrice * product.quantity);
        }
    };
    const handleChooseAllProduct = () => {
        setIsCheckAll(!isCheckAll);
        if (!isCheckAll) {
            let totalPrice = 0;
            let discountPriceTotal = 0;
            setChosenProducts(products);
            for (let product of products) {
                const { price, discountPrice } = handleCaculatePrice(product);
                totalPrice = totalPrice + price * product.quantity;
                discountPriceTotal = discountPriceTotal + discountPrice * product.quantity;
            }
            setTotalPrice(totalPrice);
            setDiscountPrice(discountPriceTotal);
        } else {
            setChosenProducts([]);
            setTotalPrice(0);
            setDiscountPrice(0);
        }
    };
    const handleUpdateQuantity = (product, quantity) => {
        dispatch(
            updateQuantity({
                productId: product.product.id,
                customerId,
                quantity: quantity,
            }),
        );
        if (chosenProduct.some((p) => p.product.id === product.product.id)) {
            const updatedProducts = chosenProduct.map((p) => {
                if (p.product.id === product.product.id) {
                    return {
                        ...p,
                        quantity: quantity,
                    };
                }
                return p;
            });

            const oldProduct = chosenProduct.find((p) => p.product.id === product.product.id);
            const oldQuantity = oldProduct.quantity;

            const updatedProduct = updatedProducts.find((p) => p.product.id === product.product.id);
            const { price, discountPrice } = handleCaculatePrice(updatedProduct);

            setTotalPrice((prev) => prev - price * oldQuantity + price * quantity);
            setDiscountPrice((prev) => prev - discountPrice * oldQuantity + discountPrice * quantity);
            setChosenProducts(updatedProducts);
        }
    };

    const handleAddChosenProduct = (product) => {
        const { price, discountPrice } = handleCaculatePrice(product);
        if (chosenProduct?.some((p) => p.product.id === product.product.id)) {
            setChosenProducts((prev) => prev.filter((p) => p.product.id !== product.product.id));
            setTotalPrice((prev) => prev - price * product.quantity);
            setDiscountPrice((prev) => prev - discountPrice * product.quantity);
        } else {
            setChosenProducts((prev) => [...prev, product]);
            setTotalPrice((prev) => prev + price * product.quantity);
            setDiscountPrice((prev) => prev + discountPrice * product.quantity);
        }
    };

    const handleCheckout = () => {
        if(chosenProduct.length == 0){
            toast.warning('Please select at least one product')
            return
        }
        const payload = {
            chosenProduct,
            discountPrice,
            totalPrice,
        };

        navigate('/checkout', { state: { payload } });
    };

    return (
        <div className="mt-32   ">
            {products.length == 0 ? (
                <div
                    className="uppercase flex flex-col justify-center items-center  shadow   gap-5  h-[calc(100vh-170px)]
                     bg-white p-10 text-orange-500 font-semibold"
                >
                    <LiaCartPlusSolid className="text-7xl " />
                    <p>Your cart is empty</p>
                    <div className="w-60   ">
                        <Link to={'/products'}>
                            <SubmitButton className={'bg-orange-500 py-3 uppercase font-bold '}>Shop now</SubmitButton>
                        </Link>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="flex flex-col min-h-[485px]  ">
                        <div className="text-gray-700 bg-white flex justify-between shadow p-4">
                            <div className="flex gap-2 px-3 cursor-pointer  items-center w-3/5">
                                <label className="flex items-center gap-3  cursor-pointer">
                                    <input
                                        type="checkbox"
                                        onChange={handleChooseAllProduct}
                                        className="hidden peer"
                                        checked={isCheckAll || chosenProduct.length == products.length}
                                    />
                                    <div
                                        className="w-4 h-4   border border-gray-400 peer-checked:bg-[var(--primary)] 
                            peer-checked:border-[var(--primary)] flex items-center justify-center"
                                    >
                                        {(isCheckAll || chosenProduct.length == products.length) && (
                                            <FaCheck className="text-white font-semibold text-sm" />
                                        )}
                                    </div>
                                </label>

                                <p className="">Product</p>
                            </div>
                            <p className="">Price</p>
                            <p className="">Quantity</p>
                            <p className="">Total price</p>
                            <p>Action</p>
                        </div>
                        {products?.map((product, index) => (
                            <div
                                className="flex flex-col  gap-4 shadow my-2 py-2 px-4 bg-white text-balance"
                                key={index}
                            >
                                <div className="flex justify-between items-center ">
                                    <div className="flex justify-between items-center w-3/5 ">
                                        <div className="w-full grid grid-cols-1 md:grid-cols-[1.5fr_5fr_1fr] items-center gap-4 overflow-hidden ">
                                            <div className="flex items-center justify-center  gap-2 ">
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={chosenProduct.some(
                                                            (p) => p.product.id === product?.product.id,
                                                        )}
                                                        onChange={() => handleAddChosenProduct(product)}
                                                        className="hidden peer"
                                                    />
                                                    <div
                                                        className="w-4 h-4   border border-gray-400 peer-checked:bg-[var(--primary)]
                                             peer-checked:border-[var(--primary)] flex items-center justify-center"
                                                    >
                                                        {chosenProduct.some(
                                                            (p) => p.product.id === product?.product.id,
                                                        ) && <FaCheck className="text-white font-semibold text-sm" />}
                                                    </div>
                                                </label>
                                                <img
                                                    src={product?.product?.thumbnail}
                                                    className=" w-[100px] h-[100px]  object-cover "
                                                />
                                            </div>
                                            <div className="line-clamp-4 px-2 ">
                                                <p>{product?.product?.name}</p>
                                            </div>
                                            <VariantBox
                                                color={product?.variant?.color}
                                                size={product?.variant?.size}
                                            ></VariantBox>
                                        </div>
                                    </div>
                                    <div>
                                        <Price className={'text-orange-400'}>
                                            {product?.product?.price -
                                                (product?.product?.price * product?.product?.discountPercentage) / 100}
                                        </Price>
                                        <Price className={'line-through text-sm'}>{product?.product?.price}</Price>
                                    </div>
                                    <div className="flex items-center gap-10 my-5">
                                        <QuantityBox
                                            chosenVariant={product?.variant}
                                            className={'px-2 py-2'}
                                            isCart={true}
                                            quantity={product?.quantity}
                                            onChangeQuantity={(newQuantity) =>
                                                handleUpdateQuantity(product, newQuantity)
                                            }
                                        ></QuantityBox>
                                    </div>

                                    <div>
                                        <Price className={'text-orange-400'}>
                                            {product?.product?.price -
                                                (product?.product?.price * product?.product?.discountPercentage) / 100}
                                        </Price>{' '}
                                    </div>
                                    <div className="flex gap-4 p-2">
                                        <div>
                                            <div className="flex items-center justify-between cursor-pointer">
                                                <IoTrashOutline
                                                    className="text-red-500 text-lg"
                                                    onClick={() => handleDeleteProduct(product.product.id)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div
                        className=" mx-20  fixed bottom-0 right-0 left-0 bg-white shadow-lg  flex items-center justify-between
                       px-6 py-2 text-gray-700 z-50 "
                    >
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-500">
                                Total {chosenProduct.length} {chosenProduct.length === 1 ? 'item' : 'items'}
                            </span>
                            <span className="text-2xl font-bold text-orange-500">
                                <Price>{totalPrice}</Price>
                            </span>
                            <span className="text-sm text-gray-400 mt-1">
                                Save: <Price>{discountPrice}</Price>
                            </span>
                        </div>

                        <div className="w-48" onClick={handleCheckout}>
                            <SubmitButton className="w-full rounded-md py-3 text-lg bg-orange-500 hover:bg-orange-600 text-white transition">
                                Check out
                            </SubmitButton>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
