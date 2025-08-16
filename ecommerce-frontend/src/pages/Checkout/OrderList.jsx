import OrderService from '@services/order.service';
import React, { useEffect, useState } from 'react';
import Price from '@components/product/Price';
import SubmitButton from '@components/Form/SubmitButton';
import OrderItem from './components/OrderItem';
import { Link } from 'react-router-dom';
import InforBox from './components/InforBox';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ConfirmCancelPopup from './components/ConfirmCancelPopup';
import ReviewPopup from './components/ReviewPopup';
const OrderList = () => {
    const [orderList, setOrderList] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [activeTab, setActiveTab] = useState('All'); // tab active
    const customerId = useSelector((state) => state.customer.customer?.id);
    const [reviewPopup, setReviewPopUp] = useState(false);
    const [showCancelPopup, setShowCancelPopup] = useState(false);
    const [cancelOrderid, setCancelOrderId] = useState('');
    const [orderReview, setOrderReview] = useState({});
    const getAllOrders = async () => {
        const response = await OrderService.getAllOrderByCustomer(customerId);
        if (response.data.success) {
            setOrderList(response.data.data);
            setFilteredOrders(response.data.data); // default show all
        }
    };

    useEffect(() => {
        getAllOrders();
    }, [customerId]);

    const handleCancelOrder = async () => {
        try {
            const response = await OrderService.cancelOrder(cancelOrderid);
            if (response.data.success) {
                toast.success(response.data.message);
                getAllOrders();
            }
        } catch (error) {
            toast.error('Hủy đơn thất bại');
        } finally {
            setShowCancelPopup(false);
        }
    };

    const filterByStatus = (status) => {
        setActiveTab(status);
        if (status === 'All') {
            setFilteredOrders(orderList);
        } else {
            setFilteredOrders(orderList.filter((order) => order.status === status));
        }
    };

    const tabs = ['All', 'Chờ xác nhận', 'Đang xử lý', 'Đang giao hàng', 'Hoàn thành', 'Đã hủy'];

    return (
        <div className="mt-32 gap-6 text-gray-700 px-4 md:px-10">
            {/* <InforBox /> */}

            <div className="space-y-6">
                {/* Header tabs */}
                <div className="flex gap-2 bg-blue-50 p-2 rounded-md shadow">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            className={`px-4 py-2 rounded-md font-semibold transition ${
                                activeTab === tab ? 'bg-blue-500 text-white' : 'bg-white text-blue-700 hover:bg-blue-100'
                            }`}
                            onClick={() => filterByStatus(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {filteredOrders?.map((order, index) => (
                    <div
                        key={index}
                        className="flex flex-col bg-white rounded-lg my-2 shadow-md hover:shadow-xl transition-shadow duration-200 p-5 space-y-4"
                    >
                        <Link to={`/purchase/detail/${order.id}`}>
                            <div className="flex flex-col">
                                <div
                                    className={`self-end px-3 py-1 rounded-full text-white text-sm font-semibold ${
                                        order.status === 'Chờ xác nhận'
                                            ? 'bg-yellow-500'
                                            : order.status === 'Đang xử lý'
                                              ? 'bg-blue-500'
                                              : order.status === 'Đang giao'
                                                ? 'bg-indigo-500'
                                                : order.status === 'Hoàn thành'
                                                  ? 'bg-green-500'
                                                  : order.status === 'Trả lại'
                                                    ? 'bg-red-500'
                                                    : 'bg-gray-400'
                                    }`}
                                >
                                    {order.status}
                                </div>

                                {order?.orderDetails.map((detail, idx) => (
                                    <OrderItem detail={detail} key={idx} />
                                ))}
                            </div>
                        </Link>

                        <div className="flex flex-col md:flex-row items-end md:items-center justify-between mt-4 gap-4">
                            <div className="flex gap-2">
                                {order.status === 'Chờ xác nhận' && (
                                    <SubmitButton
                                        className="bg-red-500 hover:bg-red-600 text-white rounded-md px-6 py-2 transition"
                                        onClick={() => {
                                            setShowCancelPopup(true);
                                            setCancelOrderId(order.id);
                                        }}
                                    >
                                        Hủy đơn
                                    </SubmitButton>
                                )}
                                <SubmitButton className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-6 py-2 transition">
                                    Mua lại
                                </SubmitButton>
                                <SubmitButton
                                    className={`rounded-md px-6 py-2 transition ${
                                        order.status === 'Hoàn thành'
                                            ? 'bg-green-500 hover:bg-green-600 text-white cursor-pointer'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                                    disabled={order.status !== 'Hoàn tất'}
                                    onClick={() => {
                                        setReviewPopUp(true);
                                        setOrderReview(order);
                                    }}
                                >
                                    Đánh giá
                                </SubmitButton>
                            </div>

                            <div className="flex items-center gap-3 text-lg md:text-xl font-semibold">
                                <span>Total:</span>
                                <Price className="text-orange-500 text-2xl md:text-3xl">{order.totalPrice}</Price>
                            </div>
                        </div>
                    </div>
                ))}

                {filteredOrders.length === 0 && <p className="text-center text-gray-400 mt-10">Bạn không có đơn hàng nào</p>}

                {showCancelPopup && (
                    <ConfirmCancelPopup
                        onClose={() => setShowCancelPopup(false)}
                        onConfirm={handleCancelOrder}
                        isOpen={showCancelPopup}
                    />
                )}
                {reviewPopup && <ReviewPopup onClose={() => setReviewPopUp(false)} order={orderReview} customerId={customerId} />}
            </div>
        </div>
    );
};

export default OrderList;
