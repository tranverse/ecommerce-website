import { useEffect, useState } from 'react';
import EmployeeForm from './EmployeeForm';
import EmployeeService from '@services/employee.service';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
// Trang thêm nhân viên
export const AddEmployee = () => {
    const handleAdd = async (payload, reset) => {
        const response = await EmployeeService.addEmployee(payload);
        if (response.data.success) {
            toast.success(response.data.message);
            reset();
        } else {
            toast.error(response.data.message);
        }
    };

    return <EmployeeForm onSubmit={handleAdd} />;
};

// Trang sửa nhân viên
export const UpdateEmployee = () => {
    const { employeeId } = useParams();
    const [employee, setEmployee] = useState(null);
    useEffect(() => {
        const fetchEmployee = async () => {
            const res = await EmployeeService.getEmployeeById(employeeId);
            if (res.data.success) {
                setEmployee(res.data.data);
            }
        };
        fetchEmployee();
    }, [employeeId]);

    const handleUpdate = async (payload) => {
        const response = await EmployeeService.updateEmployee(employeeId, payload);
        if (response.data.success) {
            toast.success(response.data.message);
            setEmployee(response.data.data);
            return response.data.success;
        } else {
            toast.error(response.data.message);
        }
    };

    if (!employee) return <div>Loading...</div>;

    return <EmployeeForm initialValues={employee} onSubmit={handleUpdate} />;
};

export const ViewEmployee = () => {
    const { employeeId } = useParams();
    const [employee, setEmployee] = useState(null);
    useEffect(() => {
        const fetchEmployee = async () => {
            const res = await EmployeeService.getEmployeeById(employeeId);
            if (res.data.success) {
                setEmployee(res.data.data);
            }
        };
        fetchEmployee();
    }, [employeeId]);

    if (!employee) return <div>Loading...</div>;

    return <EmployeeForm initialValues={employee} onSubmit={() => {}} isView={true}/>;
};
