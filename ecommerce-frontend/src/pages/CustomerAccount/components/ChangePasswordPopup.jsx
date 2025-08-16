import React from 'react';
import { useForm } from 'react-hook-form';
import SubmitButton from '@components/Form/SubmitButton';
import InputField from '@components/Form/InputField';
import FormWrapper from '@components/Form';
const ChangePasswordPopup = ({ onClose, onSubmit }) => {
    const handleFormSubmit = (data) => {
        const payload = {
            oldPassword: data.oldPassword,
            newPassword: data.password,
        };
        if (onSubmit) onSubmit(payload);
    };

    return (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
                <h2 className="text-xl font-semibold mb-4 text-center text-[var(--primary)]">Đổi mật khẩu</h2>

                <button
                    className="absolute top-2 cursor-pointer right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
                    onClick={onClose}
                >
                    &times;
                </button>

                <FormWrapper className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
                    <InputField
                        Element="input"
                        type="password"
                        name="oldPassword"
                        label="Mật khẩu cũ"
                        placeholder="Nhập mật khẩu cũ"
                    />

                    <InputField
                        Element="input"
                        type="password"
                        name="password"
                        label="Mật khẩu mới"
                        placeholder="Nhập mật khẩu mới"
                    />

                    <InputField
                        Element="input"
                        type="password"
                        name="repassword"
                        label="Xác nhận mật khẩu mới"
                        placeholder="Nhập lại mật khẩu mới"
                    />

                    <SubmitButton className="bg-[var(--primary)] text-white p-2 rounded hover:opacity-90">
                        Đổi mật khẩu
                    </SubmitButton>
                </FormWrapper>
            </div>
        </div>
    );
};

export default ChangePasswordPopup;
