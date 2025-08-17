import React, { useEffect, useState } from 'react';
import ProductItem from '@components/product/ProductItem';
import ProductService from '@services/product.service';
import { Link } from 'react-router-dom';
const Product = ({ products }) => {
    return (
        <div className="">
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5 grid-cols-2">
                {products?.map((product, index) => (
                    <ProductItem product={product} key={index}></ProductItem>
                ))}
            </div>
        </div>
    );
};

export default Product;
