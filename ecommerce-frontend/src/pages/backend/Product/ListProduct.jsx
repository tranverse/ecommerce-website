import Price from '@components/product/Price';
import ProductService from '@services/product.service';
import React, { useEffect, useState } from 'react';
import { FaRegEye } from 'react-icons/fa';
import { TbCheckupList } from 'react-icons/tb';
import { MdOutlineDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import CheckBox from '@components/CheckBox';
import productStatus from '@components/product/ProductStatus';
import SelectOption from '@pages/backend/components/SelectOption';
import CategoryService from '@services/category.service';
import SearchBox from '@layouts/components/SearchBox';
import { IoIosSearch } from 'react-icons/io';
import SearchItem from '../components/SearchItem';
const ListProduct = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCatgories] = useState([]);
    const [productStatuses, setProductStatuses] = useState([]);
    const [chosenProducts, setChosenProduct] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [showProducts, setShowProducts] = useState([]);
    const getAllProduct = async () => {
        const response = await ProductService.getAllProduct();

        if (response.data.success) {
            setProducts(response.data.data);
            setShowProducts(response.data.data);
        }
    };
    const getProductStatus = async () => {
        const response = await ProductService.getProductStatus();
        if (response.data.success) {
            setProductStatuses(response.data.data);
        }
    };

    const getAllCategory = async () => {
        const response = await CategoryService.getAllCategories();
        if (response.data.success) {
            setCatgories(response.data.data);
        }
    };
    useEffect(() => {
        getAllProduct();
        getAllCategory();
        getProductStatus();
    }, []);
    const handleSearchValueChange = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchValue(value);
        const showProducts = products.filter(
            (pro) => pro.name.toLowerCase().includes(value) || pro.category.name.toLowerCase().includes(value),
        );
        setShowProducts(showProducts);
    };
    return (
        <div className="   ">
            <div className="bg-white p-4 my-2 flex    justify-between  ">
                <div className="flex flex-col justify-center w-2/5 ">
                    <SearchItem placeholder={'Nhập thông tin sản phẩm'} value={searchValue} onChange={handleSearchValueChange} />
                </div>
                <div className="w-1/5">
                    <SelectOption items={categories} name={'Loại sản phẩm'} />
                </div>
                <div className="w-1/5">
                    <SelectOption items={productStatuses} name={'Trạng thái'} />
                </div>
            </div>
            <div className="bg-white p-4">
                <table className="w-full ">
                    <thead className=" p-2 ">
                        <tr className="  text-center  ">
                            <th>
                                <CheckBox
                                    chosenItem={chosenProducts}
                                    item={products}
                                    setChosenItem={setChosenProduct}
                                    showItem={products}
                                />
                            </th>
                            <th>STT</th>
                            <th>Sản phẩm</th>
                            <th>Loại sản phẩm</th>
                            <th>Giá bán</th>
                            <th>Giảm giá (%)</th>
                            <th>Trạng thái</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {showProducts?.map((product, index) => {
                            const color = productStatus(product?.status);
                            return (
                                <tr className={` ${index % 2 ? 'bg-gray-50' : ''} text-center `} key={index}>
                                    <td>
                                        <CheckBox
                                            chosenItem={chosenProducts}
                                            item={product}
                                            setChosenItem={setChosenProduct}
                                            showItem={products}
                                        />
                                    </td>
                                    <td className=" ">{index + 1}</td>
                                    <td className="flex gap-4  items-center">
                                        <img src={product?.thumbnail} className="w-[60px] h-[60px] object-cover my-1  " alt="" />
                                        <p className="line-clamp-3 ">{product?.name}</p>
                                    </td>
                                    <td>{product?.category?.name}</td>
                                    <td>
                                        <Price className={'text-orange-500 '}>{product?.price}</Price>
                                    </td>
                                    <td>{product?.discountPercentage}</td>
                                    <td>
                                        <div className={` ${color}`}>{product?.status}</div>
                                    </td>
                                    <td className="    ">
                                        <div className="flex gap-1 items-center justify-center">
                                            <Link to={`/user/product/view-detail/${product.id}`}>
                                                <FaRegEye className="cursor-pointer text-[var(--primary)] text-lg  " />
                                            </Link>
                                            <TbCheckupList className="cursor-pointer text-[var(--primary)] text-lg  " />
                                            <MdOutlineDelete className="cursor-pointer text-red-500 text-lg " />
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListProduct;
