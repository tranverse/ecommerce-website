import React, { useEffect, useState } from 'react';
import SubmitButton from '@components/Form/SubmitButton';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import Price from '@components/product/Price';
import VariantBox from '@components/product/VariantBox';
import { FaCcPaypal } from 'react-icons/fa';
import VNPay from '@assets/images/Logo/vnpay.png';
import Momo from '@assets/images/Logo/momo.png';
import OrderService from '@services/order.service';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import AddressPopup from './components/AddressPopup';
import AddressService from '@services/address.service';
import { getAddressNames } from '@utils/AddressName';
const Checkout = () => {
    const location = useLocation();
    const { payload } = location.state || {};
    const { chosenProduct, totalPrice } = payload;
    const [checkoutProducts, setCheckoutProducts] = useState([]);
    const customerId = useSelector((state) => state.customer.customer.id);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [showAddess, setShowAddress] = useState(false);
    const [selectAddress, setSelectAddress] = useState({});
    const [defaultAddress, setDefaultAddress] = useState(null);
    const [customerAddresses, setCustomerAddresses] = useState([]);
    const [addressNames, setAddressNames] = useState({ province: '', district: '', ward: '' });
    const [discountCode, setDiscountCode] = useState('');
    // const [totalPrice, setTotalPrice] = useState('');
    const navigate = useNavigate();
    const handleCaculatePrice = (product) => {
        let price = product?.product?.price - (product?.product.price * product?.product?.discountPercentage) / 100;
        let totalProductPrice = product?.product?.price - (product?.product.price * product?.product?.discountPercentage) / 100;
        return { price: Number(price), totalProductPrice: Number(totalProductPrice) };
    };
    const handleInputChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleCheckout = async () => {
        if (!selectAddress?.address) {
            toast.error('Vui lòng chọn địa chỉ trước khi đặt hàng');
            return;
        }
        if (!paymentMethod) {
            toast.warning('Vui lòng chọn phương thức thanh toán');
            return;
        }
        const payload = {
            totalPrice: totalPrice + 30000,
            totalProductPrice: totalPrice,
            shippingAddress: `${selectAddress?.address?.details}, ${addressNames.ward}, ${addressNames.district}, ${addressNames.province}`,
            customer: { id: customerId },
            shippingPhone: selectAddress?.phone,
            shippingCustomerName: selectAddress?.customerName,
            shippingAmount: '30000',
            products: checkoutProducts,
            paymentMethod: paymentMethod,
        };
        console.log(payload);
        const response = await OrderService.addOrder(payload);
        if (response.data.success) {
            toast.success(response.data.message);
            navigate('/');
        } else {
            toast.error(response.data.message);
        }
    };

    useEffect(() => {
        const fetchAddresses = async () => {
            if (customerId) {
                const response = await AddressService.getByCustomerId(customerId);
                const addresses = response.data.data || [];

                setCustomerAddresses(addresses);

                const defaultAddr = addresses.find((addr) => addr.isDefault);
                if (defaultAddr) {
                    setDefaultAddress(defaultAddr);
                    setSelectAddress(defaultAddr);
                }
            }
        };

        fetchAddresses();
    }, [customerId]);

    useEffect(() => {
        if (chosenProduct.length > 0) {
            const newProducts = chosenProduct.map((product) => ({
                product: { id: product?.product?.id },
                variant: { id: product?.variant?.id },
                quantity: product?.quantity,
                originalPrice: product?.product?.price,
                totalProductPrice:
                    product?.product?.price - (product?.product?.price * product?.product?.discountPercentage) / 100 || 0,
                totalPrice:
                    (product?.product?.price - (product?.product?.price * product?.product?.discountPercentage) / 100) *
                    product?.quantity,
            }));
            setCheckoutProducts(newProducts);
        }
    }, []);
    useEffect(() => {
        const fetchDefaultAddressNames = async () => {
            if (customerAddresses.length > 0) {
                if (selectAddress.id) {
                    console.log(selectAddress);

                    const names = await getAddressNames(
                        selectAddress?.address?.province,
                        selectAddress?.address?.district,
                        selectAddress?.address?.ward,
                    );
                    setAddressNames(names);
                }
            }
        };

        fetchDefaultAddressNames();
    }, [selectAddress?.id]);


    return (
        <div className="flex flex-col gap-4 my-5 px-10 text-gray-700 ">
            <div className="shadow bg-white py-4 px-6 ">
                <div className="flex items-center gap-2 text-orange-500">
                    <FaMapMarkerAlt className="" />
                    <p>Shipping address</p>
                </div>
                <div className="flex gap-20 items-center justify-between">
                    {customerAddresses?.length > 0 ? (
                        (() => {
                            if (selectAddress?.id) {
                                return (
                                    <>
                                        <div className="font-bold flex-shrink-0">
                                            {selectAddress?.customerName} (+84) {selectAddress?.phone}
                                        </div>
                                        <div className="flex gap-4 items-center justify-between">
                                            <p className="line-clamp-2">
                                                {selectAddress?.address?.details}, {addressNames.ward}, {addressNames.district},{' '}
                                                {addressNames.province}
                                            </p>
                                            {selectAddress?.isDefault && (
                                                <div className="border border-orange-500 px-1 text-sm text-orange-500">
                                                    Default
                                                </div>
                                            )}
                                            <span
                                                className="cursor-pointer text-blue-600 text-sm"
                                                onClick={() => setShowAddress(true)}
                                            >
                                                Change
                                            </span>
                                        </div>
                                    </>
                                );
                            } else {
                                return (
                                    <div className="flex justify-between items-center  w-full">
                                        <p className="text-gray-500">Bạn chưa có địa chỉ mặc định</p>
                                        <span
                                            className="cursor-pointer text-blue-600 text-sm"
                                            onClick={() => setShowAddress(true)}
                                        >
                                            Chọn địa chỉ
                                        </span>
                                    </div>
                                );
                            }
                        })()
                    ) : (
                        <div className="flex justify-between items-center  w-full ">
                            <p className="text-gray-500">Bạn chưa có địa chỉ nào</p>
                            <span className="cursor-pointer text-blue-600 text-sm" onClick={() => setShowAddress(true)}>
                                Thêm địa chỉ
                            </span>
                        </div>
                    )}
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
                        const { price, totalProductPrice } = handleCaculatePrice(product);
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
                                    <Price className={'line-through text-sm'}>{totalProductPrice}</Price>
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
                    <span>Tổng tiền sản phẩm:</span>
                    <Price>{totalPrice}</Price>
                </div>

                <div className="flex justify-between">
                    <span>Shipping Fee:</span>
                    <Price>30000</Price>
                </div>
                <hr className="border-t border-gray-200 my-2" />
                <div className="flex justify-between font-semibold text-lg">
                    <span>Tổng thanh toán:</span>
                    <Price className="text-orange-500">{totalPrice + 30000}</Price>
                </div>
                <SubmitButton onClick={handleCheckout} className="text-lg mt-4">
                    Place Order
                </SubmitButton>
            </div>
            {showAddess && (
                <AddressPopup
                    selectAddress={selectAddress}
                    customerId={customerId}
                    onClose={() => setShowAddress(false)}
                    onSelectAddress={setSelectAddress}
                />
            )}
        </div>
    );
};

export default Checkout;
