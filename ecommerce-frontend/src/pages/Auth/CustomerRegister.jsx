import React from 'react';
import FormWrapper from '@components/Form';
import InputField from '@components/Form/InputField';
import SubmitButton from '@components/Form/SubmitButton';
import { Link } from 'react-router-dom';
import AuthService from '@services/auth.service';
import { toast } from 'react-toastify';
const CustomerRegister = () => {
    const handleSubmit = async (data, reset) => {
                    const response = await AuthService.customerRegister({ ...data });
        if(response.data.success){
            toast.success('Register successfully');
            reset();

        }else{
            toast.error(response.data.message)
        }

    };

    return (
        <div className=" b flex items-center flex-col gap-4 justify-center  min-h-screen pt-14    ">
            <h1 className="text-3xl  font-bold ">Register</h1>
            <div className="bg-white w-full p-10 max-w-2xl ">
                <FormWrapper onSubmit={handleSubmit}>
                    <InputField Element={'input'} name={'name'} label={'Name'} className={' py-2'} />
                    <InputField Element={'input'} name={'email'} label={'Email'} className={'py-2'} />
                    <InputField Element={'input'} name={'phone'} label={'Phone'} className={'py-2'} />
                    <InputField Element={'input'} name={'password'} label={'Password'} type={'password'} className={'py-2'} />
                    <InputField
                        Element={'input'}
                        name={'repassword'}
                        label={'Retype password'}
                        type={'password'}
                        className={'py-2'}
                    />
                    <SubmitButton className={'mt-4 py-2  text-lg '} type={'submit'}>
                        Register
                    </SubmitButton>
                    <div className="flex gap-2 text-sm text-gray-700 justify-center items-center mt-1 ">
                        <p>Has account?</p>
                        <Link className="text-red-500 italic hover:text-red-600 font-semibold " to={'/customer/login'}>
                            Login
                        </Link>
                    </div>
                </FormWrapper>
            </div>
        </div>
    );
};

export default CustomerRegister;
