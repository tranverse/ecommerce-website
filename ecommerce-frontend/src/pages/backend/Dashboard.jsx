import StatisticService from '@services/statistic.service';
import React, { useEffect, useState } from 'react';
import { FaBox, FaShoppingCart, FaUser, FaChartLine } from 'react-icons/fa';

const Dashboard = () => {
    const [statistic, setStatistic] = useState({
        totalProducts: 0,
        totalOrders: 0,
        totalCustomers: 0,
        revenue: 0,
    });

    const getStatistic = async () => {
        try {
            const response = await StatisticService.getStatisticService();
            if (response.data.success) {
                setStatistic(response.data.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getStatistic();
    }, []);

    return (
        <div className="flex-1 p-6 overflow-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Dashboard</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div className="bg-white p-4 rounded shadow flex flex-col items-center">
                    <FaBox className="text-3xl text-[var(--primary)] mb-2" />
                    <p className="text-gray-500">Tổng sản phẩm</p>
                    <p className="text-xl font-bold">{statistic.totalProducts}</p>
                </div>
                <div className="bg-white p-4 rounded shadow flex flex-col items-center">
                    <FaShoppingCart className="text-3xl text-[var(--primary)] mb-2" />
                    <p className="text-gray-500">Đơn hàng</p>
                    <p className="text-xl font-bold">{statistic.totalOrders}</p>
                </div>
                <div className="bg-white p-4 rounded shadow flex flex-col items-center">
                    <FaUser className="text-3xl text-[var(--primary)] mb-2" />
                    <p className="text-gray-500">Người dùng</p>
                    <p className="text-xl font-bold">{statistic.totalCustomers}</p>
                </div>
                <div className="bg-white p-4 rounded shadow flex flex-col items-center">
                    <FaChartLine className="text-3xl text-[var(--primary)] mb-2" />
                    <p className="text-gray-500">Doanh thu</p>
                    <p className="text-xl font-bold">{statistic.revenue.toLocaleString()}₫</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
  