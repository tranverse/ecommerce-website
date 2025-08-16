import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InforBox from '@pages/Checkout/components/InforBox';
import AddressService from '@services/address.service';
import SubmitButton from '@components/Form/SubmitButton';
import InforPopup from './components/InforPopup';
import AuthService from '@services/auth.service';
import { toast } from 'react-toastify';
import { updateCustomer } from '@redux/slices/customerSlice';
import { Link } from 'react-router-dom';
import AddressPopup from '@pages/Checkout/components/AddressPopup';
import { getAddressNames } from '@utils/AddressName';
import ChangePasswordPopup from './components/ChangePasswordPopup';
const CustomerAccount = () => {
    const customer = useSelector((state) => state.customer?.customer);
    const [addresses, setAddresses] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [showAddressPopup, setShowAddressPopup] = useState(false);
    const dispatch = useDispatch();
    const [addressNames, setAddressNames] = useState({ province: '', district: '', ward: '' });
    const [addressNamesMap, setAddressNamesMap] = useState({});
    const [showChangePassword, setShowChangePassword] = useState(false);
    useEffect(() => {
        if (customer?.id) {
            loadAddresses();
        }
    }, [customer]);

    const loadAddresses = async () => {
        try {
            const res = await AddressService.getByCustomerId(customer.id);
            setAddresses(res.data.data || []);
        } catch (error) {
            console.error('Lỗi khi tải địa chỉ:', error);
        }
    };

    const handleUpdate = async (data) => {
        const response = await AuthService.updateCustomer(customer.id, data);
        if (response.data.success) {
            dispatch(updateCustomer(response.data.data));
            toast.success(response.data.message);
        }
    };
    const updatePassword = async (data) => {
        const response = await AuthService.updateCustomerPassword(data, customer.id);
        console.log(response);

        if (response.data.success) {
            toast.success(response.data.message);
            setShowChangePassword(false)
        } else {
            toast.error(response.data.message);
        }
    };
    useEffect(() => {
        const fetchAllAddressNames = async () => {
            const map = {};
            for (const addr of addresses) {
                try {
                    const names = await getAddressNames(addr.address.province, addr.address.district, addr.address.ward);
                    map[addr.id] = names;
                } catch (err) {
                    map[addr.id] = { province: '', district: '', ward: '' };
                }
            }
            setAddressNamesMap(map);
        };

        if (addresses.length > 0) {
            fetchAllAddressNames();
        }
    }, [addresses]);
    return (
        <div className="mt-20 rounded-lg p-6 bg-white">
            <h2 className="text-2xl font-semibold mb-6 text-[var(--primary)] text-center">Thông tin tài khoản</h2>

            <div className="  md:gap-6">
                {/* Div 2: Thông tin cá nhân + danh sách địa chỉ */}
                <div className=" p-6rounded-lg flex flex-col gap-4">
                    <h3 className="text-lg font-medium mb-3">Thông tin cá nhân</h3>
                    <p>
                        <span className="font-medium">Họ tên:</span> {customer?.name || 'Chưa cập nhật'}
                    </p>
                    <p>
                        <span className="font-medium">Email:</span> {customer?.email || 'Chưa cập nhật'}
                    </p>
                    <p>
                        <span className="font-medium">Số điện thoại:</span> {customer?.phone || 'Chưa cập nhật'}
                    </p>

                    {/* Các nút chức năng */}
                    <div className="mt-4 flex flex-col gap-3">
                        <button
                            onClick={() => setIsPopupOpen(true)}
                            className="p-2 bg-[var(--primary)] text-white font-medium rounded hover:opacity-90 text-center"
                        >
                            Cập nhật thông tin
                        </button>

                        <SubmitButton onClick={() => setShowChangePassword(true)} className="p-2 font-medium rounded text-center">
                            Đổi mật khẩu
                        </SubmitButton>
                    </div>

                    {/* Danh sách địa chỉ */}
                    <div className="mt-6">
                        <h3 className="text-lg font-medium mb-3">Danh sách địa chỉ</h3>
                        {addresses.length === 0 ? (
                            <p>Chưa có địa chỉ nào.</p>
                        ) : (
                            <ul className="flex flex-col gap-3">
                                {addresses.map((addr) => (
                                    <li
                                        key={addr.id}
                                        className={`p-3 bg-white rounded shadow-sm border ${
                                            addr.isDefault ? 'border-green-500' : 'border-gray-200'
                                        }`}
                                    >
                                        <p>
                                            <span className="font-medium">Người nhận:</span> {addr.customerName}
                                            {addr.isDefault && (
                                                <span className="ml-2 text-green-600 font-semibold">(Mặc định)</span>
                                            )}
                                        </p>
                                        <p>
                                            <span className="font-medium">SĐT:</span> {addr.phone}
                                        </p>
                                        <p>
                                            <span className="font-medium">Địa chỉ:</span> {addr.address.details},{' '}
                                            {addressNamesMap[addr.id]?.ward}, {addressNamesMap[addr.id]?.district},{' '}
                                            {addressNamesMap[addr.id]?.province}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <SubmitButton
                            onClick={() => setShowAddressPopup(true)}
                            className="mt-3 p-2 bg-[var(--primary)] text-white font-medium rounded hover:opacity-90 text-center"
                        >
                            Thêm địa chỉ mới
                        </SubmitButton>
                    </div>
                </div>
            </div>

            {isPopupOpen && <InforPopup customer={customer} onClose={() => setIsPopupOpen(false)} onSubmit={handleUpdate} />}
            {showAddressPopup && (
                <AddressPopup
                    selectAddress={[]}
                    customerId={customer.id}
                    onClose={() => setShowAddressPopup(false)}
                    onSelectAddress={[]}
                />
            )}
            {showChangePassword && <ChangePasswordPopup onClose={() => setShowChangePassword(false)} onSubmit={updatePassword} />}
        </div>
    );
};

export default CustomerAccount;
