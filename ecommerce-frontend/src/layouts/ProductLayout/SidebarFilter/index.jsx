import React, { Fragment, useEffect, useState } from 'react';
import { TiPlus } from 'react-icons/ti';
import { IoMdCheckmark } from 'react-icons/io';
import CategoryService from '@services/category.service';
import { CiStar } from 'react-icons/ci';
import { FaStar } from 'react-icons/fa6';
import PriceBox from '@layouts/components/PriceBox';
import { colors } from '@utils/Variant';
const SidebarHeader = ({ name, onClick }) => {
    return (
        <div className="flex justify-between pr-4 items-center mb-2 ">
            <h4 className="font-semibold text-gray-800">{name}</h4>
            <TiPlus className="cursor-pointer text-sm" onClick={() => onClick(name?.toLowerCase())} />
        </div>
    );
};

function SidebarFilter({ setValue, setType, startPrice, endPrice, setStartPrice, setEndPrice }) {
    const [categories, setCategories] = useState([]);
    const [showOption, setShowOption] = useState({});
    const [closeSidebar, setCloseSidebar] = useState([]);
    const [closeCategory, setCloseCategory] = useState([]);

    const handleCloseSidebar = (name) => {
        setCloseSidebar((prev) => prev.map((item) => (item.name === name ? { ...item, open: !item.open } : item)));
    };
    const handleCloseCategory = (name) => {
        setCloseCategory((prev) => prev.map((item) => (item.name === name ? { ...item, open: !item.open } : item)));
    };

    const getAllCategories = async () => {
        const response = await CategoryService.getAllCategories();
        console.log(response);
        setCategories(response.data.data);
    };
    useEffect(() => {
        getAllCategories();
        setCloseSidebar([
            { name: 'category', open: true },
            { name: 'color', open: true },
            { name: 'rating', open: true },
            { name: 'price', open: true },
        ]);
    }, []);
    useEffect(() => {
        if (categories.length > 0) {
            const cate = categories?.map((cate) => ({
                name: cate?.name?.toLowerCase(),
                open: true,
            }));
            setCloseCategory(cate);
        }
    }, [categories]);
    return (
        <>
            <div className="p-2 mr-2 hidden  md:flex md:flex-col overflow-y-auto h-[650px]">
                <div className="py-2">
                    <SidebarHeader
                        name={'Category'}
                        onClick={() => {
                            handleCloseSidebar('category');
                        }}
                    />
                    {closeSidebar?.find((prev) => prev.name == 'category')?.open == true && (
                        <div className="text-gray-700 text-sm transition duration-300">
                            {categories?.map((cate, index) => (
                                <React.Fragment key={index}>
                                    <div
                                        key={index}
                                        className="mb-1 cursor-pointer   flex justify-between items-center pr-4 hover:bg-gray-100  px-2 group"
                                    >
                                        <p
                                            className=""
                                            onClick={() => {
                                                setType('category');
                                                setValue(cate?.name);
                                            }}
                                        >
                                            {cate?.name}
                                        </p>
                                        <TiPlus
                                            className="cursor-pointer text-sm text-gray-400  "
                                            onClick={() => handleCloseCategory(cate?.name.toLowerCase())}
                                        />
                                    </div>
                                    {closeCategory?.find((prev) => prev.name == cate?.name.toLowerCase())?.open == true &&
                                        cate?.subCategories?.map((sub, index2) => (
                                            <div
                                                className="pb-1  pl-4 w-full"
                                                key={index - index2}
                                                onClick={() => {
                                                    setType('category');
                                                    setValue(sub?.name);
                                                }}
                                            >
                                                <p className="hover:bg-gray-100 cursor-pointer  px-2">{sub?.name}</p>
                                            </div>
                                        ))}
                                </React.Fragment>
                            ))}
                        </div>
                    )}
                </div>
                <hr className="text-gray-200" />

                <div className="py-2">
                    <SidebarHeader name={'Color'} onClick={() => handleCloseSidebar('color')} />
                    {closeSidebar?.find((prev) => prev.name == 'color')?.open == true && (
                        <div className=" text-sm grid md:grid-cols-2 gap-4 justify-between  text-gray-700">
                            {colors.map((color, index) => (
                                <div
                                    className="flex gap-2 cursor-pointer hover:scale-105 "
                                    key={index}
                                    onClick={() => {
                                        setValue(color);
                                        setType('color');
                                    }}
                                >
                                    <div
                                        className={`w-5 h-5 rounded-full  cursor-pointer border border-gray-300`}
                                        style={{ backgroundColor: color }}
                                    ></div>
                                    <span className="cursor-pointer ">{color.charAt(0).toUpperCase() + color.slice(1)}</span>
                                </div>
                            ))}
                            <div
                                className="flex gap-2 hover:scale-105"
                                onClick={() => {
                                    setValue('multi');
                                    setType('color');
                                }}
                            >
                                <div
                                    className={`w-5 h-5 rounded-full cursor-pointer   from-blue-500 via-pink-500  to-yellow-500
                                      border border-gray-300 bg-gradient-to-b`}
                                ></div>
                                <span className="cursor-pointer">Mutil</span>
                            </div>
                        </div>
                    )}
                </div>
                <hr className="text-gray-200" />

                <div className="py-2">
                    <SidebarHeader name={'Rating'} onClick={() => handleCloseSidebar('rating')} />
                    {closeSidebar?.find((prev) => prev.name == 'rating')?.open &&
                        [...Array(4)].map((_, index1) => {
                            const stars = 5 - index1; 
                            return (
                                <div
                                    className="text-gray-700 flex items-center gap-1 cursor-pointer hover:bg-gray-100 p-1"
                                    key={index1}
                                    onClick={() => {
                                        setValue(stars);
                                        setType('rating'); 
                                    }}
                                >
                                    <div className="flex">
                                        {[...Array(5)].map((_, index2) => (
                                            <span key={index2}>
                                                {index2 < stars ? (
                                                    <FaStar className="text-yellow-500" />
                                                ) : (
                                                    <CiStar className="text-gray-300" />
                                                )}
                                            </span>
                                        ))}
                                    </div>
                                    <p className="text-sm text-gray-700">or more</p>
                                </div>
                            );
                        })}
                </div>

                <hr className="text-gray-200" />

                <div className="py-2  ">
                    <SidebarHeader name={'Price range'} onClick={() => handleCloseSidebar('price')} />
                    {closeSidebar?.find((prev) => prev.name == 'price')?.open == true && (
                        <>
                            <div className="text-gray-700 text-sm flex justify-between items-center gap-4">
                                <PriceBox placeholder={'From'} setValue={setStartPrice} value={startPrice} />
                                <div className="w-6 border-b border-gray-500" />
                                <PriceBox placeholder={'To'} setValue={setEndPrice} value={endPrice} />
                            </div>
                            <div className="mt-2">
                                <button
                                    onClick={() => {
                                        setType('price');
                                    }}
                                    className="w-full bg-[var(--primary)] p-0.5 text-white outline-none cursor-pointer
                                    text-base hover:bg-purple-700 font-semibold"
                                >
                                    Apply
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default SidebarFilter;
