import React, { useState, useEffect } from 'react';
import SelectAddressForm from '@components/Form/SelectAddressForm';
import Label from '@pages/backend/components/Label';
import InputField from '@components/Form/InputField';
import AddressService from '@services/address.service';
import FormWrapper from '@components/Form';
import SubmitButton from '@components/Form/SubmitButton';
import { toast } from 'react-toastify';
import { getAddressNames } from '@utils/AddressName';
const AddressPopup = ({ customerId, onClose, onSelectAddress, selectAddress }) => {
    const [addresses, setAddresses] = useState([]);
    const [editingAddress, setEditingAddress] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');
    const [isDefaultChecked, setIsDefaultChecked] = useState(null);
    const [defaultValue, setDefaultValue] = useState({});
    const [addressNamesMap, setAddressNamesMap] = useState({});

    useEffect(() => {
        loadAddresses();
        AddressService.getProvince().then(setProvinces);
    }, []);
    console.log(addresses);
    const loadAddresses = async () => {
        const res = await AddressService.getByCustomerId(customerId);
        setAddresses(res.data.data);
    };
    useEffect(() => {
        const fetchDistricts = async () => {
            if (selectedProvince) {
                const res = await AddressService.getDistrict(selectedProvince);
                setDistricts(res?.districts || []);
            }
        };
        fetchDistricts();
    }, [selectedProvince]);

    useEffect(() => {
        const fetchWards = async () => {
            if (selectedDistrict) {
                const res = await AddressService.getWard(selectedDistrict);
                setWards(res?.wards || []);
            }
        };
        fetchWards();
    }, [selectedDistrict]);

    const openEditForm = (addr) => {
        setDefaultValue({
            province: addr.address?.province || '',
            district: addr.address?.district || '',
            ward: addr.address?.ward || '',
            details: addr.address?.details || '',
            customerName: addr.customerName,
            phone: addr.phone,
            isDefault: addr.isDefault,
        });
        setIsDefaultChecked(addr.isDefault);
        setSelectedProvince(addr.address?.province || '');
        setSelectedDistrict(addr.address?.district || '');
        setSelectedWard(addr.address?.ward || '');
        setIsFormOpen(true);
    };

    const handleSaveAddress = async (formData, reset) => {
        const payload = {
            customerName: formData.customerName,
            phone: formData.phone,
            customer: { id: customerId },
            address: {
                province: selectedProvince,
                district: selectedDistrict,
                ward: selectedWard,
                details: formData.details,
            },
            isDefault: isDefaultChecked,
        };
        if (editingAddress != null) {
            const response = await AddressService.updateAddress(editingAddress.id, payload);
        } else {
            const response = await AddressService.addAddress(payload);
            console.log(response);
        }
        reset();
        setIsFormOpen(false);
        setEditingAddress(null);
        loadAddresses();
    };

    const handleSetDefault = async (id) => {
        await AddressService.setDefault(id);
        loadAddresses();
    };

    const handleDelete = async (id) => {
        await AddressService.remove(id);
        loadAddresses();
    };

    const handleSelectForCheckout = (id) => {
        const selected = addresses.find((addr) => addr.id === id);
        if (onSelectAddress) onSelectAddress(selected);
        onClose();
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
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-[800px] max-h-[80vh] overflow-y-auto p-5 relative">
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 cursor-pointer">
                    ✕
                </button>

                <h2 className="text-xl font-semibold mb-4">Chọn địa chỉ nhận hàng</h2>

                <div className="flex flex-col gap-3 mb-4">
                    {addresses?.map((addr) => (
                        <div
                            key={addr.id}
                            className={`p-3 border rounded cursor-pointer ${
                                selectAddress?.id == addr?.id ? 'border-blue-500' : 'border-gray-200'
                            }`}
                            onClick={() => handleSelectForCheckout(addr?.id)}
                        >
                            <div className={`flex justify-between items-center  `}>
                                <div>
                                    <p className="font-semibold">
                                        {addr.customerName} - {addr.phone}
                                    </p>
                                    <p className="text-gray-600">
                                        {addr.address.details}, {addressNamesMap[addr.id]?.ward},{' '}
                                        {addressNamesMap[addr.id]?.district}, {addressNamesMap[addr.id]?.province}
                                    </p>
                                    {addr.isDefault && <span className="text-xs text-blue-500 font-medium">Mặc định</span>}
                                </div>
                                <div className="flex gap-2">
                                    {!addr.isDefault && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleSetDefault(addr?.id);
                                            }}
                                            className="text-sm text-blue-500 hover:underline cursor-pointer"
                                        >
                                            Đặt mặc định
                                        </button>
                                    )}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openEditForm(addr);
                                            setEditingAddress(addr);
                                        }}
                                        className="text-sm text-yellow-500 hover:underline cursor-pointer"
                                    >
                                        Sửa
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(addr.id);
                                        }}
                                        className="text-sm text-red-500 hover:underline cursor-pointer"
                                    >
                                        Xóa
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => {
                        setEditingAddress(null);
                        setSelectedProvince('');
                        setSelectedDistrict('');
                        setSelectedWard('');
                        setIsFormOpen(true);
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    + Thêm địa chỉ mới
                </button>

                {isFormOpen && (
                    <div className="mt-5 border-t pt-4">
                        <FormWrapper onSubmit={handleSaveAddress} defaultValues={defaultValue}>
                            <Label label="Họ tên" />
                            <InputField
                                name="customerName"
                                Element="input"
                                type="text"
                                placeholder="Nhập họ tên"
                                defaultValue={editingAddress?.customerName}
                            />

                            <Label label="Số điện thoại" />
                            <InputField
                                name="phone"
                                Element="input"
                                type="text"
                                placeholder="Nhập số điện thoại"
                                defaultValue={editingAddress?.phone}
                            />

                            <Label label="Địa chỉ" />
                            <div className="flex gap-4 mb-2">
                                <SelectAddressForm
                                    label="Tỉnh/Thành"
                                    places={provinces}
                                    setValue={setSelectedProvince}
                                    name="province"
                                    value={selectedProvince}
                                />
                                <SelectAddressForm
                                    label="Quận/Huyện"
                                    places={districts}
                                    setValue={setSelectedDistrict}
                                    name="district"
                                    value={selectedDistrict}
                                />
                                <SelectAddressForm
                                    label="Phường/Xã"
                                    places={wards}
                                    setValue={setSelectedWard}
                                    name="ward"
                                    value={selectedWard}
                                />
                            </div>
                            <div className="flex items-center gap-2 mt-4">
                                <input
                                    type="checkbox"
                                    name="isDefault"
                                    checked={isDefaultChecked}
                                    onChange={() => setIsDefaultChecked(!isDefaultChecked)}
                                    className="w-4 h-4"
                                />
                                <label htmlFor="isDefault" className="text-sm cursor-pointer">
                                    Đặt làm mặc định
                                </label>
                            </div>

                            <InputField
                                name="details"
                                Element="input"
                                type="text"
                                placeholder="Nhập địa chỉ chi tiết"
                                defaultValue={editingAddress?.address?.details}
                            />

                            <div className="flex justify-end gap-3 mt-4">
                                <button
                                    onClick={() => {
                                        setIsFormOpen(false);
                                        setEditingAddress(null);
                                    }}
                                    className="px-4 py-2 border rounded hover:bg-gray-100"
                                >
                                    Hủy
                                </button>
                                <div>
                                    <SubmitButton className="px-4 py-2 bg-blue-500 text-white rounded" type={'submit'}>
                                        Lưu
                                    </SubmitButton>
                                </div>
                            </div>
                        </FormWrapper>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddressPopup;
