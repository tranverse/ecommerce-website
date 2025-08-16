import React from 'react';
import FormWrapper from '@components/Form';
import InputField from '@components/Form/InputField';
import SubmitButton from '@components/Form/SubmitButton';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import AuthService from '@services/auth.service';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@redux/slices/customerSlice';
const CustomerLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = async (data) => {
        const payload = {
            ...data,
            type: 'CUSTOMER',
        };
        const response = await AuthService.customerLogin(payload);

        if (response.data.success) {
            dispatch(loginSuccess(response.data.data));
            navigate('/');
            toast.success(response.data.message);
        } else {
            toast.error(response.data.message);
        }
    };
    return (
        <div className=" b flex items-center flex-col gap-4 justify-center  min-h-screen pt-14    ">
            <h1 className="text-3xl  font-bold ">Register</h1>
            <div className="bg-white w-full p-10 max-w-2xl ">
                <FormWrapper onSubmit={handleSubmit}>
                    <InputField Element={'input'} name={'email'} label={'Email'} className={'py-2'} />
                    <InputField Element={'input'} name={'password'} label={'Password'} type={'password'} className={'py-2'} />

                    <SubmitButton className={'mt-4 py-2  text-lg '} type={'submit'}>
                        Login
                    </SubmitButton>
                    <div className="flex gap-2 text-sm text-gray-700 justify-center items-center mt-1 ">
                        <p>Has account?</p>
                        <Link className="text-red-500 italic hover:text-red-600 font-semibold " to={'/customer/register'}>
                            Register
                        </Link>
                    </div>
                </FormWrapper>

                <div className="flex border my-4  cursor-pointer hover:bg-gray-100 items-center gap-4 justify-center p-2 border-gray-300 ">
                    <FcGoogle className="text-2xl" />
                    <p className="text-gray-700">Continue with Google</p>
                </div>
            </div>
        </div>
    );
};

export default CustomerLogin;
