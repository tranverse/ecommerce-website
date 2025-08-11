import FormWrapper from '@components/Form';
import InputField from '@components/Form/InputField';
import SubmitButton from '@components/Form/SubmitButton';
import { employeeLogin } from '@redux/slices/userSlice';
import AuthService from '@services/auth.service';
import React from 'react';
import { useDispatch } from 'react-redux';
import { data, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = async (data) => {
        const response = await AuthService.employeeLogin(data);
        console.log(response);
        if (response.data.success) {
            dispatch(employeeLogin(response.data.data));
            navigate('/dashboard');
            toast.success(response.data.message);
        } else {
            toast.error(response.data.message);
        }
    };
    return (
        <div className=" flex items-center flex-col gap-4 justify-center h-screen  bg-purple-50   ">
            <h1 className="text-3xl  font-bold ">Login</h1>
            <div className="bg-white w-full p-10 max-w-2xl ">
                <FormWrapper onSubmit={handleSubmit}>
                    <InputField Element={'input'} name={'email'} label={'Email'} className={'py-2'} />
                    <InputField Element={'input'} name={'password'} label={'Password'} type={'password'} className={'py-2'} />

                    <SubmitButton className={'mt-4 py-2  text-lg '} type={'submit'}>
                        Login
                    </SubmitButton>
                </FormWrapper>
            </div>
        </div>
    );
};

export default UserLogin;
