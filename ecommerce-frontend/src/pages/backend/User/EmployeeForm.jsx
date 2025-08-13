import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import FormWrapper from '@components/Form';
import InputField from '@components/Form/InputField';
import SelectOption from '@pages/backend/components/SelectOption';
import UploadImage from '../components/UploadThumbnail';
import { toast } from 'react-toastify';
import UploadService from '@services/upload.service';
import Label from '../components/Label';
import SubmitButton from '@components/Form/SubmitButton';
import SelectAddressForm from '@components/Form/SelectAddressForm';
import EmployeeService from '@services/employee.service';
import AddressService from '@services/address.service';
import { Link } from 'react-router-dom';

const EmployeeForm = ({ initialValues = null, onSubmit, isView }) => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState(initialValues?.address.province || '');
    const [selectedDistrict, setSelectedDistrict] = useState(initialValues?.address.district || '');
    const [selectedWard, setSelectedWard] = useState(initialValues?.address.ward || '');
    const [employeeRole, setEmployeeRole] = useState([]);
    const [chosenRole, setChosenRole] = useState(initialValues?.role || '');
    const [url, setUrl] = useState(initialValues?.avatar || '');
    const [avatar, setAvatar] = useState(null);
    console.log(isView);
    const defaultValues = {
        name: initialValues?.name || '',
        email: initialValues?.email || '',
        phone: initialValues?.phone || '',
        password: '',
        repassword: '',
        details: initialValues?.address.details || '',
        province: initialValues?.address.province || '',
        district: initialValues?.address.district || '',
        ward: initialValues?.address.ward || '',
    };

    useEffect(() => {
        const fetchRoles = async () => {
            const response = await EmployeeService.getEmployeeRole();
            if (response.data.success) {
                setEmployeeRole(response.data.data);
            }
        };
        fetchRoles();
    }, []);

    useEffect(() => {
        const fetchProvinces = async () => {
            // if (!selectedProvince) return setProvinces([]);
            const response = await AddressService.getProvince();
            setProvinces(response);
        };
        fetchProvinces();
    }, []);

    useEffect(() => {
        const fetchDistricts = async () => {
            if (!selectedProvince) return setDistricts([]);
            const response = await AddressService.getDistrict(selectedProvince);
            setDistricts(response.districts);
            setWards([]);
            setSelectedWard('');
            setSelectedWard('');
        };
        fetchDistricts();
    }, [selectedProvince]);

    const fetchWards = async () => {
        if (!selectedDistrict) return setWards([]);
        const response = await AddressService.getWard(selectedDistrict);
        setWards(response.wards);
    };
    useEffect(() => {
        fetchWards();
    }, [selectedDistrict]);

    const handleUploadImage = async () => {
        if (!avatar) return url || '';
        const form = new FormData();
        form.append('file', avatar);
        const response = await UploadService.uploadSingleImage(form);
        if (response.data.success) {
            return response.data.data;
        }
        return '';
    };

    const handleSubmit = async (data, reset) => {
        let a = '';
        if (avatar != '') {
            a = await handleUploadImage();
        }
        const payload = {
            name: data.name,
            phone: data.phone,
            email: data.email,
            password: data.password,
            avatar: a,
            role: chosenRole,
            address: {
                details: data.details,
                province: data.province,
                ward: data.ward,
                district: data.district,
            },
        };
        const result = await onSubmit(payload);
        console.log(result);

        if (result) {
            reset(initialValues);
            setUrl(initialValues?.avatar || '');
        }
    };

    return (
        <div className="p-4 bg-white">
            <h1 className="text-center text-xl uppercase my-4 font-semibold text-[var(--primary)]">
                {isView ? 'Thông tin nhân viên' : initialValues ? 'Cập nhật nhân viên' : 'Thêm nhân viên'}
            </h1>
            <FormWrapper onSubmit={handleSubmit} defaultValues={defaultValues}>
                <div className="flex gap-10">
                    <div>
                        <Label label={'Ảnh đại diện'} />
                        <UploadImage className={'w-60 h-61'} setUrl={setUrl} setThumbnail={setAvatar} url={url} isView={isView} />
                    </div>

                    <div className="w-full flex flex-col gap-1">
                        <InputField name="name" label="Họ tên" Element="input" type="text" readOnly={isView} />
                        <InputField name="email" label="Email" Element="input" type="text" readOnly={isView} />
                        <InputField name="phone" label="Số điện thoại" Element="input" type="text" readOnly={isView} />
                        <SelectOption
                            items={employeeRole}
                            chosenItem={chosenRole}
                            setChosenItem={setChosenRole}
                            name="Vai trò"
                            firstName="--Chọn vai trò--"
                            onClick={setChosenRole}
                            isView={isView}
                        />
                    </div>
                </div>

                {isView ? (
                    <div className="text-gray-700 mt-2 ">
                        <div className="text-sm mb-1">Địa chỉ</div>
                        <div className="border p-2 border-gray-300 rounded">
                            {initialValues?.address?.details}
                            {', '}
                            {wards.find((p) => p.code == selectedWard)?.name} {',  '}
                            {districts.find((p) => p.code == selectedDistrict)?.name}
                            {', '}
                            {provinces.find((p) => p.code == selectedProvince)?.name}
                        </div>
                    </div>
                ) : (
                    <div className="mt-2">
                        <Label label="Địa chỉ" />
                        <div className="flex justify-between w-full items-center gap-20 mb-2">
                            <SelectAddressForm
                                label="Chọn Tỉnh/Thành Phố"
                                places={provinces}
                                name="province"
                                setValue={setSelectedProvince}
                                defaultValue={selectedProvince}
                            />
                            <SelectAddressForm
                                label="Chọn Quận/Huyện"
                                places={districts}
                                name="district"
                                setValue={setSelectedDistrict}
                                defaultValue={selectedDistrict}
                            />
                            <SelectAddressForm
                                label="Chọn Phường/Xã"
                                places={wards}
                                name="ward"
                                setValue={setSelectedWard}
                                defaultValue={selectedWard}
                            />
                        </div>
                        <InputField name="details" label="Địa chỉ chi tiết" Element="input" type="text" />
                    </div>
                )}
                {isView ? (
                    <Link to={`/user/update-employee/${initialValues?.id}`}>
                        <SubmitButton className="mt-4 p-2 font-semibold" type={'button'}>
                            Chỉnh sửa thông tin
                        </SubmitButton>
                    </Link>
                ) : (
                    <SubmitButton className="mt-4 p-2 font-semibold">
                        {initialValues ? 'Cập nhật nhân viên' : 'Thêm nhân viên'}
                    </SubmitButton>
                )}
            </FormWrapper>
        </div>
    );
};

export default EmployeeForm;
