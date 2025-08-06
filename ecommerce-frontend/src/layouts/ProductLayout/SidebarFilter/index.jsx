import { useEffect, useState } from 'react';
import { TiPlus } from 'react-icons/ti';
import { IoMdCheckmark } from 'react-icons/io';
import CategoryService from '@services/category.service';
import { CiStar } from 'react-icons/ci';
import { FaStar } from 'react-icons/fa6';
import PriceBox from '@layouts/components/PriceBox';

const SidebarHeader = ({ name }) => {
    return (
        <div className="flex justify-between pr-4 items-center mb-2 ">
            <h4 className="font-semibold text-gray-800">{name}</h4>
            <TiPlus className="cursor-pointer text-sm" />
        </div>
    );
};

function SidebarFilter() {
    const [categories, setCategories] = useState([]);
    const [showOption, setShowOption] = useState({});
    const colors = ['red', 'yellow', 'pink', 'purple', 'black', 'brown', 'white', 'green', 'blue', 'gray', 'orange'];
    const handleShowOption = () => {};

    const getAllCategories = async () => {
        const response = await CategoryService.getAllCategories();
        console.log(response);
        setCategories(response.data.data);
    };
    useEffect(() => {
        getAllCategories();
    }, []);

    return (
        <>
            <div className="p-2 mr-2 hidden  md:flex md:flex-col">
                <div className="py-2">
                    <SidebarHeader name={'Category'} />
                    <div className="text-gray-700 text-sm">
                        {categories?.map((cate, index) => (
                            <>
                                <div
                                    key={index}
                                    className="mb-1 cursor-pointer   flex justify-between items-center pr-4
                                 hover:bg-gray-100  px-2 group"
                                >
                                    <p className="  ">{cate?.name}</p>
                                    <TiPlus className="cursor-pointer text-sm text-gray-400  " />
                                </div>
                                {cate?.subCategories?.map((sub, index2) => (
                                    <div className="pb-1  pl-4 w-full" key={index - index2}>
                                        <p className="hover:bg-gray-100 cursor-pointer  px-2">{sub?.name}</p>
                                    </div>
                                ))}
                            </>
                        ))}
                    </div>
                </div>
                <hr className="text-gray-200" />

                <div className="py-2">
                    <SidebarHeader name={'Color'} />

                    <div className=" text-sm grid md:grid-cols-2 gap-4 justify-between  text-gray-700">
                        {colors.map((color, index) => (
                            <div className="flex gap-2 cursor-pointer hover:scale-105 " key={index}>
                                <div
                                    className={`w-5 h-5 rounded-full  cursor-pointer border border-gray-300`}
                                    style={{ backgroundColor: color }}
                                ></div>
                                <span className="cursor-pointer ">
                                    {color.charAt(0).toUpperCase() + color.slice(1)}
                                </span>
                            </div>
                        ))}
                        <div className="flex gap-2 hover:scale-105">
                            <div
                                className={`w-5 h-5 rounded-full cursor-pointer   from-blue-500 via-pink-500  to-yellow-500
                                      border border-gray-300 bg-gradient-to-b`}
                            ></div>
                            <span className="cursor-pointer">Mutil</span>
                        </div>
                    </div>
                </div>
                <hr className="text-gray-200" />

                <div className="py-2">
                    <SidebarHeader name={'Rating'} />

                    {[...Array(4)].map((_, index1) => (
                        <div
                            className="text-gray-700 flex items-center gap-1 cursor-pointer hover:bg-gray-100"
                            key={index1}
                        >
                            <div className="flex">
                                {[...Array(5)].map((_, index2) =>
                                    index1 + index2 <= 4 ? (
                                        <FaStar className="text-yellow-500" key={index2} />
                                    ) : (
                                        <CiStar key={index2} className={` text-yellow-500 `} />
                                    ),
                                )}
                            </div>
                            <p className="text-sm text-gray-700">or more</p>
                        </div>
                    ))}
                </div>
                <hr className="text-gray-200" />

                <div className="py-2  ">
                    <SidebarHeader name={'Price range'} />
                    <div className="text-gray-700 text-sm flex justify-between items-center gap-4">
                        <PriceBox placeholder={'From'} />
                        <div className="w-6 border-b border-gray-500" />
                        <PriceBox placeholder={'To'} />
                    </div>
                    <div className="mt-2">
                        <button
                            className="w-full bg-[var(--primary)] p-0.5 text-white outline-none cursor-pointer
                         text-base hover:bg-purple-700 font-semibold"
                        >
                            Apply
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SidebarFilter;
