import React, { useEffect, useState } from 'react';
import ProductItem from '@components/product/ProductItem';
import ProductService from '@services/product.service';
import { Link } from 'react-router-dom';
const Product = () => {
    const [products, setProducts] = useState([]);

    const getAllProducts = async () => {
        const response = await ProductService.getAllProduct();
        setProducts(response.data.data);
    };
    useEffect(() => {
        getAllProducts();
    }, []);
    console.log(products);
    return (
        <div className="">
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5 grid-cols-2">
                {products?.map((product, index) => (
                    <Link to={`/product/${product?.slug}?id=${product?.id}`} className="block " key={index}>
                        <ProductItem  product={product}></ProductItem>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Product;
