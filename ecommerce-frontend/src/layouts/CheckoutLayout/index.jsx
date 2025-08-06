import React from 'react';
import HeaderCheckout from '@layouts/components/HeaderCheckout';
const CheckoutLayout = ({ children, name }) => {
    return (
        <div className=" bg-[#f7f7ff] min-h-screen   ">
            <HeaderCheckout name={name}></HeaderCheckout>
            <div>{children}</div>
        </div>
    );
};

export default CheckoutLayout;
