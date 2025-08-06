import React from 'react';
import { TiPlus } from 'react-icons/ti';

const CategoryList = ({categories}) => {
    return (
        <div className="text-gray-700 text-sm">
            {categories?.map((cate, index) => (
                <>
                    <div
                        className="mb-1 cursor-pointer   flex justify-between items-center pr-4
                                 hover:bg-gray-100  px-2 group"
                        key={index}
                    >
                        <p className="  ">{cate?.name}</p>
                        <TiPlus className="cursor-pointer text-sm text-gray-400  " />
                    </div>
                    {cate?.subCategories?.map((sub, index) => (
                        <div className="pb-1  pl-4 w-full" key={index}>
                            <p className="hover:bg-gray-100 cursor-pointer  px-2">{sub?.name}</p>
                        </div>
                    ))}
                </>
            ))}
        </div>
    );
};

export default CategoryList;
