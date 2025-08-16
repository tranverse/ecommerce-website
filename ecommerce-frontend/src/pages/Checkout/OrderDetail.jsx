import OrderService from '@services/order.service';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StatusBox from './components/StatusBox';
import { PiNotepadBold } from 'react-icons/pi';
import InforBox from './components/InforBox';
import OrderItem from './components/OrderItem';
import Price from '@components/product/Price';
const OrderDetail = () => {
    const { orderId } = useParams();
    const [orderDetail, setOrderDetail] = useState({});
    const date = Date.now();
    const getOrderDetail = async () => {
        try {
            const response = await OrderService.getOrderDetail(orderId);
            setOrderDetail(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };
    const currentStatus = orderDetail?.status;

    useEffect(() => {
        getOrderDetail();
    }, []);
    const statusSteps = ['Chờ xác nhận', 'Đang xử lý', 'Đang giao hàng', 'Hoàn thành', 'Đã hủy'];

    console.log(orderDetail);
    return (
        <div className="mt-32  gap-10  text-gray-700  ">
            {/* <div className="">
                <InforBox />
            </div> */}
            <div className="bg-white   ">
                <div className="p-4 relative flex justify-between items-center">
                    {statusSteps.map((step, index) => {
                        const isCompleted = statusSteps.indexOf(step) <= statusSteps.indexOf(currentStatus);
                        const isLast = index === statusSteps.length - 1;
                        return (
                            <StatusBox
                                key={index}
                                Icon={PiNotepadBold}
                                name={step}
                                time={date}
                                isCompleted={isCompleted}
                                isLast={isLast}
                            />
                        );
                    })}
                </div>

                <div className="p-4 bg-white border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">📦 Thông tin vận chuyển</h3>
                    <div className="space-y-1 text-gray-700">
                        <p>
                            <span className="font-medium">Tên người nhận:</span> {orderDetail?.shippingCustomerName}
                        </p>
                        <p>
                            <span className="font-medium">Địa chỉ:</span> {orderDetail?.shippingAddress}
                        </p>
                        <p>
                            <span className="font-medium">Phí vận chuyển:</span> {orderDetail?.shippingAmount?.toLocaleString()}₫
                        </p>
                    </div>
                </div>

                <div className="p-4 ">
                    {orderDetail?.orderDetails?.map((detail, index) => (
                        <OrderItem key={index} detail={detail} />
                    ))}
                </div>
                <div className="flex p-4 ">
                    <div className="w-2/3 text-end flex flex-col gap-2">
                        <p>Phương thức thanh toán</p>
                        <p>Tổng tiền sản phẩm</p>
                        <p>Tiền vận chuyển</p>
                        <p>Tổng thanh toán</p>
                    </div>
                    <div className="w-1/3 text-end flex flex-col gap-2  ">
                        <p>{orderDetail?.paymentMethod}</p>
                        <Price>{orderDetail?.totalProductPrice}</Price>
                        <Price>{orderDetail?.shippingAmount}</Price>
                        <Price className={'text-orange-500 text-2xl   '}>{orderDetail?.totalPrice}</Price>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;
