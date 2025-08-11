import OrderService from '@services/order.service';
import React, { useState } from 'react';
import Price from '@components/product/Price';
import SubmitButton from '@components/Form/SubmitButton';
import OrderItem from './components/OrderItem';
import { Link } from 'react-router-dom';
import InforBox from './components/InforBox';
import { useSelector } from 'react-redux';
const OrderList = () => {
    const [orderList, setOrderList] = useState([]);
    const customerId = JSON.parse(useSelector((state) => state.customer.customer)).id;

    const getAllOrders = async () => {
        try {
            const response = await OrderService.getAllOrderByCustomer(customerId);
            setOrderList(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useState(() => {
        getAllOrders();
    }, []);
    console.log(orderList);
    return (
        <div className="mt-32 grid grid-cols-[1fr_5fr] gap-4   text-gray-700">
            <InforBox></InforBox>
            <div>
                <div className="flex justify-between  bg-white shadow-lg p-4 ">
                    <p>All</p>
                    <p>Process</p>
                    <p>Delivery</p>
                    <p>Fisnised</p>
                    <p>Give back</p>
                </div>
                <div className="">
                    {orderList?.map((order, index) => (
                        <Link to={`/purchase/detail/${order.id}`} key={index}>
                            <div className="flex flex-col  bg-white  cursor-pointer  p-4  shadow-lg  my-5   ">
                                {order?.orderDetails.map((detail, index1) => (
                                    <OrderItem detail={detail} key={index1} />
                                ))}
                                <div className="flex flex-col items-end justify-center gap-4 mt-5     ">
                                    <div className="flex gap-4 items-center  text-lg ">
                                        <span className="font-semibold  ">Total:</span>
                                        <Price className={'text-orange-500 text-2xl '}>{order.totalPrice}</Price>
                                    </div>
                                    <div className="w-48 ">
                                        <SubmitButton className={'py-2 '}>Buy again</SubmitButton>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrderList;
