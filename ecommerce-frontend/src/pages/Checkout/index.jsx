import React, { useEffect, useState } from 'react';
import SubmitButton from '@components/Form/SubmitButton';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import Price from '@components/product/Price';
import VariantBox from '@components/product/VariantBox';
import { FaCcPaypal } from 'react-icons/fa';
import VNPay from '@assets/images/Logo/vnpay.png';
import Momo from '@assets/images/Logo/momo.png';
import OrderService from '@services/order.service';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
const Checkout = () => {
    const location = useLocation();
    const { payload } = location.state || {};
    const { chosenProduct, discountPrice, totalPrice } = payload;
    const [checkoutProducts, setCheckoutProducts] = useState([]);
    const customerId = useSelector((state) => state.customer.customer.id)
    const [paymentMethod, setPaymentMethod] = useState('');
    const handleCaculatePrice = (product) => {
        let price = product?.product?.price - (product?.product.price * product?.product?.discountPercentage) / 100;
        let discountPrice = (product?.product.price * product?.product?.discountPercentage) / 100;
        return { price: Number(price), discountPrice: Number(discountPrice) };
    };
    const handleInputChange = (e) => {
        setPaymentMethod(e.target.value);
    };
    console.log(checkoutProducts, chosenProduct);

    const handleCheckout = async () => {
        const payload = {
            totalPrice: totalPrice,
            discountPrice: discountPrice,
            shippingAddress: 'Thanh xuan, Chau Thanh A, Hau Giang',
            customer: { id: customerId },
            shippingAmount: '30000',
            products: checkoutProducts,
            paymentMethod: paymentMethod,
        };
        console.log(payload);
        try {
            const response = await OrderService.addOrder(payload);
            toast.success('Order successfully');
        } catch (error) {
            toast.error(error);
        }
    };

    useEffect(() => {
        if (chosenProduct.length > 0) {
            const newProducts = chosenProduct.map((product) => ({
                product: { id: product?.product?.id },
                variant: { id: product?.variant?.id },
                quantity: product?.quantity,
                originalPrice: product?.product?.price,
                discountPrice:
                    product?.product?.price - (product?.product?.price * product?.product?.discountPercentage) / 100 || 0,
                totalPrice:
                    (product?.product?.price - (product?.product?.price * product?.product?.discountPercentage) / 100) *
                    product?.quantity,
            }));
            setCheckoutProducts(newProducts);
        }
    }, []);

    return (
        <div className="flex flex-col gap-4 my-5 px-10 text-gray-700 ">
            <div className="shadow bg-white py-4 px-6 ">
                <div className="flex items-center gap-2 text-orange-500">
                    <FaMapMarkerAlt className="" />
                    <p>Shipping address</p>
                </div>
                <div className="flex gap-20 items-center justify-between ">
                    <div className="font-bold flex-shrink-0">Hồ Nguyễn Bảo Trân (+84) 703172609</div>
                    <div className="flex gap-4  items-center justify-between">
                        <p className="line-clamp-2 ">131, ấp So Đũa Lớn, Xã Thạnh Xuân, Huyện Châu Thành A,</p>
                        <div className="border border-orange-500 px-1 text-sm text-orange-500">Default</div>
                        <span className="cursor-pointer text-blue-600 text-sm">Change</span>
                    </div>
                </div>
            </div>
            <div className="p-4  shadow bg-white">
                <div className="grid grid-cols-1 md:grid-cols-[0.5fr_3fr_0.5fr_0.5fr_0.5fr] justify-end gap-4    pb-2 font-semibold">
                    <p className="text-center">Product</p>
                    <p className="text-center">Name</p>
                    <p className="text-center">Quantity</p>
                    <p className="text-center">Price</p>
                    <p className="text-center">Amount</p>
                </div>
                <div className="flex flex-col gap-4">
                    {chosenProduct.map((product, index) => {
                        const { price, discountPrice } = handleCaculatePrice(product);
                        return (
                            <div
                                className="grid grid-cols-1 md:grid-cols-[0.5fr_3fr_0.5fr_0.5fr_0.5fr] border-b border-gray-300 py-2
                             gap-4 justify-center items-center"
                                key={index}
                            >
                                <div className="flex items-center justify-center ">
                                    <img
                                        src={product?.product?.thumbnail}
                                        className="w-[100px] h-[100px]  object-cover rounded "
                                        alt=""
                                    />
                                </div>
                                <div className="flex items-center   gap-4  ">
                                    <div className="w-3/4">
                                        <p className="line-clamp-3 ">{product?.product.name}</p>
                                    </div>
                                    <div className="text-sm text-center break-words">
                                        <span>Variant: </span>
                                        {product.variant.color.charAt(0).toUpperCase() + product.variant.color.slice(1)} /{' '}
                                        {product.variant.size}
                                    </div>
                                </div>
                                <p className="text-center">{product.quantity}</p>
                                <div className="flex justify-center items-center flex-col">
                                    <Price className={'text-orange-400'}>{price}</Price>
                                    <Price className={'line-through text-sm'}>{discountPrice}</Price>
                                </div>
                                <div className="flex justify-center items-center ">
                                    <Price className={'text-orange-400'}>{price * Number(product.quantity)}</Price>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="bg-white p-4 shadow ">
                <p className="text-orange-500 font-semibold text-lg ">Payment method</p>
                <div className=" flex gap-10 ">
                    <div className="flex items-center gap-4 px-2 m-2">
                        <input type="radio" name="paymentMethod" value="VN_PAY" onChange={(e) => handleInputChange(e)} />
                        <img src={VNPay} className="w-12 h-12 object-contain" alt="" />
                        <p>VNPay</p>
                    </div>
                    <div className="flex items-center gap-4 px-2 m-2">
                        <input type="radio" name="paymentMethod" value="MOMO" onChange={(e) => handleInputChange(e)} />
                        <img src={Momo} className="w-12 h-12 object-contain" alt="" />
                        <p>Momo</p>
                    </div>
                    <div className="flex items-center gap-4 px-2 m-2">
                        <input type="radio" name="paymentMethod" value="COD" onChange={(e) => handleInputChange(e)} />
                        <p>Cash on Delivery (COD)</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-2 bg-white shadow p-4 w-full">
                <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <Price>{totalPrice}</Price>
                </div>
                <div className="flex justify-between">
                    <span>Discount: </span>
                    <Price className="text-gray-700">{discountPrice}</Price>
                </div>
                <div className="flex justify-between">
                    <span>Shipping Fee:</span>
                    <Price>30000</Price>
                </div>
                <hr className="border-t border-gray-200 my-2" />
                <div className="flex justify-between font-semibold text-lg">
                    <span>Total Payment:</span>
                    <Price className="text-orange-500">{totalPrice + 30000}</Price>
                </div>
                <SubmitButton onClick={handleCheckout} className="text-lg mt-4">
                    Place Order
                </SubmitButton>
            </div>
        </div>
    );
};

export default Checkout;
