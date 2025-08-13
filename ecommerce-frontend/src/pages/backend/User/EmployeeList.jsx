import CheckBox from '@components/CheckBox';
import EmployeeService from '@services/employee.service';
import React, { useEffect, useState } from 'react';
import { FaRegEye } from 'react-icons/fa';
import { TbCheckupList } from 'react-icons/tb';
import { MdOutlineDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import SearchItem from '../components/SearchItem';
const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [showEmployee, setShowEmployee] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const getAllEmployee = async () => {
        const response = await EmployeeService.getAllEmployee();
        if (response.data.success) {
            setEmployees(response.data.data);
            setShowEmployee(response.data.data);
        }
    };
    console.log(employees);

    useEffect(() => {
        getAllEmployee();
    }, []);
    const handleSearchValueChange = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchValue(value);
        setShowEmployee(
            employees.filter((employee) => {
                const email = employee?.email?.toLowerCase() || '';
                const phone = employee?.phone?.toLowerCase() || '';
                const name = employee?.name?.toLowerCase() || '';
                const role = employee?.role?.toLowerCase() || '';

                return email.includes(value) || phone.includes(value) || name.includes(value) || role.includes(value);
            }),
        );
    };
    return (
        <div>
            <div className="flex gap-10 p-4 bg-white justify-between items-center">
                <div className="w-2/5  ">
                    <SearchItem
                        placeholder={'Tìm kiếm theo thông tin nhân viên'}
                        value={searchValue}
                        onChange={handleSearchValueChange}
                    />
                </div>
            </div>
            <div className="bg-white p-4 ">
                <table className="w-full   border-collapse text-gray-700   ">
                    <thead>
                        <tr className=" text-center  ">
                            <th>Họ tên</th>
                            <th className="cursor-pointer">Email</th>
                            <th>Số điện thoại</th>
                            <th>Vai trò</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {showEmployee?.map((employee, index) => {
                            return (
                                <tr key={index} className={`my-1 hover:bg-purple-50 ${index % 2 ? 'bg-blue-50' : 'bg-white'} `}>
                                    <td className="text-center py-2 ">{employee?.name}</td>
                                    <td className="text-center">{employee?.email}</td>
                                    <td className="text-center">{employee?.phone}</td>

                                    <td className="">
                                        <div className={`border border-gray-50  rounded-2xl text-center `}>{employee?.role}</div>
                                    </td>
                                    <td className="    ">
                                        <div className="flex gap-1 items-center justify-center">
                                            <Link to={`/user/view-employee/${employee?.id}`}>
                                                <FaRegEye className="cursor-pointer text-[var(--primary)] text-lg  " />
                                            </Link>
                                            <Link to={`/user/update-employee/${employee?.id}`}>
                                                <TbCheckupList className="cursor-pointer text-[var(--primary)] text-lg  " />
                                            </Link>
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

export default EmployeeList;
