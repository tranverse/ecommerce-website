// InforPopup.jsx
import React from 'react';
import FormWrapper from '@components/Form';
import InputField from '@components/Form/InputField';
import SubmitButton from '@components/Form/SubmitButton';

const InforPopup = ({ customer, onClose, onSubmit }) => {
    const defaultValue = {
        name: customer?.name,
        phone: customer?.phone,
        email: customer?.email,
    };
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800">
                    ✕
                </button>
                <h2 className="text-xl font-semibold mb-4 text-[var(--primary)] text-center">Cập nhật thông tin</h2>
                <FormWrapper
                    defaultValues={defaultValue}
                    onSubmit={(data) => {
                        onSubmit(data);
                        onClose();
                    }}
                    className="flex flex-col gap-4"
                >
                    <InputField
                        Element="input"
                        name="name"
                        label="Họ tên"
                        defaultValue={customer?.fullName || ''}
                        placeholder="Nhập họ tên"
                    />
                    <InputField
                        Element="input"
                        name="email"
                        label="Email"
                        defaultValue={customer?.email || ''}
                        placeholder="Nhập email"
                    />
                    <InputField
                        Element="input"
                        name="phone"
                        label="Số điện thoại"
                        defaultValue={customer?.phone || ''}
                        placeholder="Nhập số điện thoại"
                    />
                    <SubmitButton className="p-2 bg-[var(--primary)] text-white rounded font-semibold hover:opacity-90">
                        Lưu thông tin
                    </SubmitButton>
                </FormWrapper>
            </div>
        </div>
    );
};

export default InforPopup;
