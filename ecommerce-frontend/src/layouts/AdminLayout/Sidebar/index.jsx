import Logo from '@assets/images/Logo/Logo.png';
import { LuArrowLeftToLine } from 'react-icons/lu';
import { IoHomeOutline } from 'react-icons/io5';
import AdminMenuItem from '@layouts/components/AdminMenuItem';
import { LuBlocks } from 'react-icons/lu';
import { GiStoneBlock } from 'react-icons/gi';
import { FaUsers } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import { Icon } from 'lucide-react';
function AdminSidebar() {
    const [menuState, setMenuState] = useState({});
    const toggleMenu = (index) => {
        setMenuState((prev) => ({ ...prev, [index]: !prev[index] }));
    };
    console.log(menuState);
    const menuItems = [
        { name: 'Dashboard', Icon: IoHomeOutline, children: [] },
        {
            name: 'Sản phẩm',
            Icon: LuBlocks,
            children: [
                { menu: 'Thêm sản phẩm', link: '/user/add-product' },
                { menu: 'Danh sách sản phẩm', link: '/user/product-list' },
            ],
        },
        {
            name: 'Đơn hàng',
            Icon: GiStoneBlock,
            children: [
                { menu: 'Danh sách đơn hàng', link: '/user/all-order-list' },
                { menu: 'Đơn hàng chưa duyệt', link: '/user/pending-order-list' },
            ],
        },
        {
            name: 'Nhân viên',
            Icon: FaUsers,
            children: [
                { menu: 'Thêm nhân viên', link: '/user/add-employee' },
                { menu: 'Danh sách nhân viên', link: '/user/emoloyee-list' },
            ],
        },
        {
            name: 'Banner',
            Icon: GiStoneBlock,
            children: [
                { menu: 'Thêm banner', link: '/user/add-banner' },
                { menu: 'Danh sách banner', link: '/user/banner-list' },
            ],
        },
        {
            name: 'Voucher',
            Icon: GiStoneBlock,
            children: [
                { menu: 'Thêm voucher', link: '/user/add-voucher' },
                { menu: 'Danh sách voucher', link: '/user/voucher-list' },
            ],
        },
        {
            name: 'Category',
            Icon: GiStoneBlock,
            children: [
                { menu: 'Thêm loại sản phẩm', link: '/user/add-category' },
                { menu: 'Danh sách loại sản phẩm', link: '/user/category-list' },
            ],
        },
    ];

    return (
        <div className=" w-64  shadow border border-gray-200 fixed ">
            <div className="flex justify-between items-center border-b border-gray-200 p-3 text-[var(--primary)]">
                <div className="flex items-center gap-2  text-xl font-bold cursor-pointer">
                    <img src={Logo} className="w-[80px] h-[50px]" alt="" />
                    <p>OwnFit</p>
                </div>
                <LuArrowLeftToLine className="cursor-pointer text-xl" />
            </div>

            <div className="mt-2 overflow-y-auto h-[650px]  ">
                {menuItems?.map((menu, index) => (
                    <AdminMenuItem
                        name={menu.name}
                        Icon={menu.Icon}
                        childrenMenu={menu.children}
                        key={index}
                        toggleMenu={() => toggleMenu(index)}
                        open={menuState[index]}
                    />
                ))}
            </div>
        </div>
    );
}

export default AdminSidebar;
