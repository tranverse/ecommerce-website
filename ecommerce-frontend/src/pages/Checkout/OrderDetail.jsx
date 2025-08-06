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

    useEffect(() => {
        getOrderDetail();
    }, []);

    console.log(orderDetail);
    return (
        <div className="mt-32  gap-10  text-gray-700  grid grid-cols-[1fr_5fr]  ">
            <div className="">
                <InforBox />
            </div>
            <div className="bg-white   ">
                <div className="p-4 flex  items-center justify-between relative  ">
                    <div className="h-2 bg-green-500 absolute top-11  right-10 left-10   "></div>

                    <StatusBox Icon={PiNotepadBold} name={'Placed'} time={date} />
                    <StatusBox Icon={PiNotepadBold} name={'Placed'} time={date} />
                    <StatusBox Icon={PiNotepadBold} name={'Placed'} time={date} />
                    <StatusBox Icon={PiNotepadBold} name={'Placed'} time={date} />
                    <StatusBox Icon={PiNotepadBold} name={'Placed'} time={date} />
                </div>
                <div className="p-4  ">
                    <div>
                        <p>Shipping Address</p>
                        <p>Aliec 0178390</p>
                        <p>{orderDetail?.shippingAddress}</p>
                    </div>
                    <div></div>
                </div>
                <div className="p-4 ">
                    {orderDetail?.orderDetails?.map((detail, index) => (
                        <OrderItem key={index} detail={detail} />
                    ))}
                </div>
                <div className="flex p-4 ">
                    <div className="w-2/3 text-end flex flex-col gap-2">
                        <p>Payment method</p>

                        <p>Total product price</p>
                        <p>Shipping price</p>
                        <p>Total amount</p>
                    </div>
                    <div className="w-1/3 text-end flex flex-col gap-2  ">
                        <p>{orderDetail.paymentMethod}</p>
                        <Price>{orderDetail.totalPrice - orderDetail.shippingAmount}</Price>
                        <Price>{orderDetail.shippingAmount}</Price>
                        <Price className={'text-orange-500 text-2xl   '}>{orderDetail.totalPrice}</Price>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;
