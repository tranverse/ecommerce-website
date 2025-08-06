import React from 'react';
import ProductItem from '@components/product/ProductItem';
const Product = () => {
    return (
        <div className="">
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5 grid-cols-2">
                <ProductItem></ProductItem>
                <ProductItem></ProductItem>
                <ProductItem></ProductItem>
                <ProductItem></ProductItem>
                                <ProductItem></ProductItem>
                <ProductItem></ProductItem>
                <ProductItem></ProductItem>
                <ProductItem></ProductItem>
            </div>
        </div>
    );
};

export default Product;
