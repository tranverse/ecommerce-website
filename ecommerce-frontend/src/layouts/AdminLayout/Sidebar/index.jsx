import Logo from '@assets/images/Logo/Logo.png';
import { LuArrowLeftToLine } from 'react-icons/lu';
import { IoHomeOutline } from 'react-icons/io5';
import AdminMenuItem from '@layouts/components/AdminMenuItem';
import { LuBlocks } from "react-icons/lu";
import { GiStoneBlock } from "react-icons/gi";
import { FaUsers } from "react-icons/fa6";
function AdminSidebar() {
    return (
        <div className=" w-60 shadow border border-gray-200">
            <div className="flex justify-between items-center border-b border-gray-200 p-3 text-[var(--primary)]">
                <div className="flex items-center gap-2  text-xl font-bold cursor-pointer">
                    <img src={Logo} className="w-[80px] h-[50px]" alt="" />
                    <p>OwnFit</p>
                </div>
                <LuArrowLeftToLine className="cursor-pointer text-xl" />
            </div>

            <div>
                <AdminMenuItem name={'Dashboard'} Icon={IoHomeOutline} />
                <AdminMenuItem name={'Product'} Icon={LuBlocks} />
                <AdminMenuItem name={'Order'} Icon={GiStoneBlock} />
                <AdminMenuItem name={'Customer'} Icon={FaUsers} />
            </div>
        </div>
    );
}

export default AdminSidebar;
