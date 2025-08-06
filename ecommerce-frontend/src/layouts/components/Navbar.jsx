import { IoIosArrowDown } from "react-icons/io";
function Navbar() {

    const cates = ['T-shirt', 'Skirt', 'Polo', 'Jeans']

    return ( 
        <>
            <div className="">
                <nav className="flex justify-start mt-1 ">
                    <div className="flex items-center">
                        <span>Categories</span>    
                        <IoIosArrowDown className="text-gray-700 leading-none text-sm"/>
                    </div>
                    {cates.map((cate, index) => (
                        <div key={index} className="mx-3 text-gray-700 cursor-pointer">{cate}</div>
                    ))}
                </nav>
            </div>
        </>
     );
}

export default Navbar;