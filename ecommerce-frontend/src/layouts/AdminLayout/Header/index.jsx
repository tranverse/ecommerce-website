import React from 'react';
import { MdNotificationsNone } from 'react-icons/md';
import { LuMessageCircle } from 'react-icons/lu';
import Logo from '@assets/images/Logo/Logo.png';
import { useDispatch, useSelector } from 'react-redux';
import LogoUser from '@assets/images/Logo/user.png';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logoutEmployee } from '@redux/slices/userSlice';
const AdminHeader = () => {
    const isLoggedIn = useSelector((state) => state.employee.isLoggedIn);
    const employee = useSelector((state) => state.employee.employee);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin = () => {
        dispatch(logoutEmployee());
        navigate('/user/login');
        toast.success('Đăng xuất thành công');
    };
    return (
        <div className="shadow px-10 py-3 border border-gray-200 fixed left-64 right-0  z-10 ">
            <div className="flex justify-between gap-5 items-center">
                <div className="flex-1 ">
                    <input
                        type="text"
                        className="border w-90 outline-none px-2 py-1 border-gray-300"
                        placeholder="Type to search..."
                    />
                </div>

                <div className="flex  gap-4 text-2xl items-center">
                    <div>
                        <MdNotificationsNone />
                    </div>
                    <div>
                        <LuMessageCircle />
                    </div>
                </div>
                <div className="  relative group ">
                    <div className="flex items-center gap-4">
                        <div>
                            {employee?.avatar ? (
                                <img src={employee?.avatar} className="rounded-full w-10 h-10 border border-gray-300" alt="" />
                            ) : (
                                <img src={LogoUser} className="rounded-full w-10 h-10 " alt="" />
                            )}
                        </div>
                        <div>
                            <p className="line-clamp-1">{employee?.name}</p>
                            <p className="text-[var(--primary)]">{employee?.role}</p>
                        </div>
                    </div>
                    {isLoggedIn && (
                        <div
                            className="bg-white absolute z-10  w-50 opacity-0 group-hover:opacity-100
                           text-gray-700 right-0 -left-10  shadow  border border-gray-300"
                        >
                            <Link to={'/user/account'} className="">
                                <p className="hover:bg-purple-100  px-4 py-2">Thông tin tài khoản</p>
                            </Link>
                            <p className="hover:bg-purple-100  px-4 py-2" onClick={handleLogin}>
                                Đăng xuất
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminHeader;
