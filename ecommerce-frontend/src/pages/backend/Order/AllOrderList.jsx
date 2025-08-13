import OrderService from '@services/order.service';
import React, { useEffect, useState } from 'react';
import { DateTimeFormat } from '@utils/NumberFomart';
import { FaRegEye } from 'react-icons/fa';
import { TbCheckupList } from 'react-icons/tb';
import { MdOutlineDelete } from 'react-icons/md';
import Price from '@components/product/Price';
import { data, Link } from 'react-router-dom';
import CheckBox from '@components/CheckBox';
import SearchItem from '../components/SearchItem';
import SelectOption from '@pages/backend/components/SelectOption';
import { toast } from 'react-toastify';

const AllOrderList = () => {
    const [allOrder, setAllOrder] = useState([]);
    const [orderStatuses, setOrderStatuses] = useState([]);
    const [activeStatus, setActiveStatus] = useState('all');
    const [showOrder, setShowOrder] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [chosenAction, setChosenAction] = useState('');
    const [chosenOrder, setChosenOrder] = useState([]);
    const getAllOrder = async () => {
        const response = await OrderService.getAllOrder();
        if (response.data.success) {
            setAllOrder(response.data.data);
            setShowOrder(response.data.data);
        }
    };
    const getOrderStatus = async () => {
        const response = await OrderService.getOrderStatus();
        if (response.data.success) {
            setOrderStatuses(response.data.data);
        }
    };
    const orderStatus = (status) => {
        if (status == 'Chờ xác nhận') {
            return 'bg-yellow-300 px-1 text-green-800 rounded-2xl';
        } else if (status == 'Đang xử lý') {
            return 'bg-blue-300 px-1 rounded-2xl';
        } else if (status == 'Đang giao hàng') {
            return 'bg-orange-400 px-1 rounded-2xl';
        } else if (status == 'Đã hủy') {
            return 'bg-gray-400 px-1 rounded-2xl';
        } else if (status == 'Hoàn thành') {
            return 'bg-green-500 px-1 rounded-2xl';
        }
    };
    const handleChooseOrderStatus = (status) => {
        setActiveStatus(status);
        if (status == 'all') {
            setShowOrder(allOrder);
        } else {
            setShowOrder(allOrder.filter((order) => order.status == status));
        }
    };
    useEffect(() => {
        getAllOrder();
        getOrderStatus();
    }, []);
    console.log(chosenOrder);
    const handleUpdateOrderStatus = async (action) => {
        console.log(action);
        const payload = chosenOrder?.map((order) => ({
            orderId: order?.id,
            status: action,
        }));

        const response = await OrderService.updateOrderStatus(payload);
        if (response.data.success) {
            const updatedOrders = response.data.data;
            const newAllOrder = allOrder.map((order) => {
                const update = updatedOrders.find((o) => o.id == order.id);
                return update ? { ...order, status: update.status } : order;
            });

            setAllOrder(newAllOrder);
            if (activeStatus == 'all') {
                setShowOrder(newAllOrder);
            } else {
                setShowOrder(newAllOrder.filter((newOrder) => newOrder.status == activeStatus));
            }
            toast.success(response.data.message);
            setChosenOrder([]);
        }
    };

    const handleSearchValueChange = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchValue(value);
        setShowOrder(
            allOrder.filter((order) => {
                const orderCode = order?.orderCode?.toLowerCase() || '';
                const phone = order?.customer?.phone?.toLowerCase() || '';
                const name = order?.customer?.name?.toLowerCase() || '';
                return (
                    (orderCode.includes(value) || phone.includes(value) || name.includes(value)) && activeStatus == order.status
                );
            }),
        );
    };

    return (
        <div className="   ">
            <div className="flex gap-10 p-4 bg-white justify-between items-center">
                <div className="w-2/5  ">
                    <SearchItem
                        placeholder={'Tìm kiếm theo mã đơn hoặc thông tin khách hàng'}
                        value={searchValue}
                        onChange={handleSearchValueChange}
                    />
                </div>
                <div className="w-1/5 ">
                    <p className="text-sm text-gray-700">Hành động</p>
                    <SelectOption
                        chosenItem={chosenAction}
                        setChosenItem={setChosenAction}
                        items={orderStatuses}
                        firstName={'Chọn hành động'}
                        onClick={handleUpdateOrderStatus}
                    />
                </div>
            </div>
            <div className="px-4 bg-white my-2 ">
                <div className="flex items-center border-b   border-gray-300 my-2 ">
                    <div
                        onClick={() => handleChooseOrderStatus('all')}
                        className={`cursor-pointer hover:bg-purple-50 p-4
                            ${activeStatus == 'all' ? 'bg-purple-100 border-b border-purple-500' : ''}`}
                    >
                        Tất cả
                    </div>
                    {orderStatuses?.map((status, index) => (
                        <div
                            onClick={() => handleChooseOrderStatus(status)}
                            className={`cursor-pointer hover:bg-purple-50 p-4
                            ${activeStatus == status ? 'bg-purple-100 border-b border-purple-500' : ''}`}
                            key={index}
                        >
                            {status}
                        </div>
                    ))}
                </div>

                <table className="w-full   border-collapse text-gray-700   ">
                    <thead>
                        <tr className=" text-center  ">
                            <td>
                                <CheckBox
                                    setChosenItem={setChosenOrder}
                                    item={showOrder}
                                    chosenItem={chosenOrder}
                                    showItem={showOrder}
                                />
                            </td>
                            <th className="py-3">Mã đơn hàng</th>
                            <th>Khách hàng</th>
                            <th className="cursor-pointer">Ngày đặt</th>
                            <th>Tổng thanh toán</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {showOrder?.map((order, index) => {
                            const s = orderStatus(order?.status);
                            return (
                                <tr key={index} className={`my-1 hover:bg-purple-50 ${index % 2 ? 'bg-blue-50' : 'bg-white'} `}>
                                    <td>
                                        <CheckBox
                                            item={order}
                                            chosenItem={chosenOrder}
                                            setChosenItem={setChosenOrder}
                                            showItem={showOrder}
                                        />
                                    </td>
                                    <td className=" py-3 text-start     ">{order?.id}</td>
                                    <td className="text-center">{order?.customer?.name}</td>
                                    <td className="text-center">{DateTimeFormat(order?.orderDate)}</td>
                                    <td className="text-center ">
                                        <Price className={'font-normal'}>{order?.totalPrice}</Price>
                                    </td>
                                    <td className="">
                                        <div className={`border border-gray-50  rounded-2xl text-center ${s}`}>
                                            {order?.status}
                                        </div>
                                    </td>
                                    <td className="    ">
                                        <div className="flex gap-1 items-center justify-center">
                                            <Link to={`/user/order/view-detail/${order.id}`}>
                                                <FaRegEye className="cursor-pointer text-[var(--primary)] text-lg  " />
                                            </Link>
                                            <TbCheckupList className="cursor-pointer text-[var(--primary)] text-lg  " />
                                            <MdOutlineDelete className="cursor-pointer text-red-500 text-lg " />
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllOrderList;
