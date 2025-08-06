import { useState } from "react";
import { TiPlus } from "react-icons/ti";

function SidebarFilter() {
    const cates = ['T-shirt', 'Skirt', 'Polo', 'Jeans'];
    const [showOption, setShowOption] = useState({})
    const handleShowOption = () => {

    }
    return (
        <>
            <div className="p-2 overflow-auto mr-2 hidden md:block">
                <div>
                    <div className="flex justify-between pr-4 items-center mb-2 ">
                        <h4 className="font-semibold text-gray-700">
                            Category
                        </h4>
                        <TiPlus className="cursor-pointer" />
                    </div>
                    <div className="text-gray-700">
                        {cates.map((cate, index) => (
                            <div className="py-1 ">
                                <p className="hover:bg-[var(--primary)] cursor-pointer text-[15px] rounded-lg hover:text-white px-2">
                                    {cate}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <hr className="text-gray-200" />
            </div>
        </>
    );
}

export default SidebarFilter;
