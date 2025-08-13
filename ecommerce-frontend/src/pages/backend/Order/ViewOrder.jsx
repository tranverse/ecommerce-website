import OrderService from '@services/order.service';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DateTimeFormat } from '@utils/NumberFomart';
import Price from '@components/product/Price';
import OrderStatus from '@components/OrderStatus';
const ViewOrder = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState();
    const orderStatus = OrderStatus(order?.status);
    const getOrderDetail = async () => {
        const response = await OrderService.getAllOrderById(orderId);
        if (response.data.success) {
            setOrder(response.data.data);
        }
    };
    useEffect(() => {
        getOrderDetail();
    }, []);
    console.log(order);
    return (
        <div className="bg-white p-4 w-full text-gray-700  ">
            <div className="text-center text-2xl font-semibold uppercase ">Thông tin đơn hàng</div>
            <div className=" grid grid-cols-[2fr_1fr]   gap-10 my-4  ">
                <div className="bg-blue-50 rounded p-4  shadow">
                    <h1 className="text-center font-semibold  text-lg mb-2  ">Thông tin khách hàng</h1>
                    <div className="flex gap-4 ">
                        <div className='flex flex-col gap-1 '>
                            <p>
                                <strong>Họ tên: </strong>
                            </p>
                            <p>
                                <strong>Số điện thoại:</strong>
                            </p>
                            <p>
                                <strong>Địa chỉ nhận hàng:</strong>
                            </p>
                        </div>
                        <div className='flex-col gap-1 flex '>
                            <p>{order?.shippingAddress?.customerName || 'Nguyễn Văn A'}</p>
                            <p>{order?.shippingAddress?.phone || '012'}</p>
                            <div className="flex line-clamp-3 ">{order?.shippingAddress}</div>
                        </div>
                    </div>
                </div>
                <div className="bg-purple-50 p-4 rounded shadow">
                    <h1 className="text-center text-lg  font-semibold mb-2 ">Thông tin đơn hàng</h1>
                    <div className='flex gap-4  '>
                        <div className='flex-col gap-1 flex  '>
                            <p>
                                <strong>Mã đơn:</strong>
                            </p>
                            <p>
                                <strong>Ngày đặt: </strong>
                            </p>

                            <p>
                                <strong>Trạng thái:</strong>
                            </p>
                        </div>
                        <div className='flex-col gap-1 flex '>
                            <p> {order?.orderCode}</p>
                            <p>{DateTimeFormat(order?.orderDate)}</p>
                            <div className="flex gap-3">
                                <div className={` px-2 rounded-xl    ${orderStatus.color}`}>{orderStatus.text}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full  rounded  shadow     ">
                <div>
                    <div className="flex gap-4 justify-between p-3 px-4    bg-purple-50 ">
                        <div className="flex gap-4 w-2/5 text-center ">Sản phẩm</div>
                        <div>Số lượng</div>
                        <div className="flex gap-2">Giá sản phẩm</div>
                        <div>Tổng tiền</div>
                    </div>
                </div>
                {order?.orderDetails?.map((detail, index) => (
                    <div className="flex gap-4 justify-between  px-4 py-2    " key={index}>
                        <div className="flex gap-4 w-2/5  ">
                            <img src={detail?.product?.thumbnail} className="w-[80px] h-[80px] object-cover" />
                            <div className="flex flex-col justify-center ">
                                <p className="line-clamp-3 ">{detail?.product?.name}</p>
                                <p className='text-gray-500 '>{detail?.variant?.color}/
                                    {detail?.variant?.size}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center    ">x{detail?.quantity}</div>
                        <div className="flex gap-2 items-center ">
                            <Price className={'font-normal line-through text-sm '}>{detail?.originalPrice}</Price>
                            <Price className={' font-normal '}>{detail?.discountPrice}</Price>
                        </div>
                        <div className="flex items-center ">
                            <Price className={'text-orange-500 font-normal'}>{detail?.totalPrice}</Price>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-between my-4 bg-white border-t border-purple-300    ">
                <div className="mt-4 font-semibold flex flex-col gap-1  ">
                    <p>Tổng tiền sản phẩm</p>
                    <p>Giảm giá</p>
                    <p>Phí vận chuyển</p>
                    <p>Tổng thanh toán</p>
                </div>
                <div className="text-end flex flex-col gap-1  ">
                    <Price>{order?.totalProductPrice}</Price>
                    <p className="flex justify-end ">
                        -<Price>{order?.discountPrice}</Price>
                    </p>
                    <Price>{order?.shippingAmount}</Price>
                    <Price className={'text-xl  text-orange-500'}>{order?.totalPrice}</Price>
                </div>
            </div>
        </div>
    );
};

export default ViewOrder;
