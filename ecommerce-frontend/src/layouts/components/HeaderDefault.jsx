import Logo from '@assets/images/Logo/Logo.png';
import SearchBox from '@layouts/components/SearchBox';
import { PiShoppingCartThin } from 'react-icons/pi';
import { CiUser } from 'react-icons/ci';
import { CiHeart } from 'react-icons/ci';
import Navbar from '@layouts/components/Navbar';
import { BsList } from 'react-icons/bs';
import { use, useEffect, useRef, useState } from 'react';
import DropdownItem from '@layouts/components/DropdownItem';
import { Link } from 'react-router-dom';
import CartService from '@services/cart.service';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, resetHightlight } from '@redux/slices/cartSlice';
import PopupCart from '@pages/Cart/PopupCart';
import { logout } from '@redux/slices/customerSlice';
import { toast } from 'react-toastify';
import CategoryService from '@services/category.service';
import ProductItem from '@components/product/ProductItem';
import ProductService from '@services/product.service';
function Header() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.customer.isLoggedIn);
    const [isOpenDropList, setIsOpenDropList] = useState(true);
    const cartItems = useSelector((state) => state.cart.items);
    const highlight = useSelector((state) => state.cart.highlight);
    const [showFashionPopup, setShowFashionPopup] = useState(false);
    const [categories, setCategories] = useState([]);
    const [hoverMenu, setHoverMenu] = useState(null);
    const [productsOnSale, setProductsOnSale] = useState([]);
    const hoverTimeout = useRef();
    const [hoverMenuPopup, setHoverMenuPopUp] = useState('');
    const getProductOnSale = async () => {
        try {
            const response = await ProductService.getAllProductOnSale();
            setProductsOnSale(response.data.data);
        } catch (error) {}
    };
    const getAllCategories = async () => {
        const response = await CategoryService.getAllCategories();
        if (response.data.success) {
            setCategories(response.data.data);
        }
    };
    useEffect(() => {
        getAllCategories();
        getProductOnSale();
    }, []);
    useEffect(() => {
        if (highlight) {
            const timer = setTimeout(() => {
                dispatch(resetHightlight());
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [highlight, dispatch]);

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    const handleLogOut = () => {
        dispatch(logout());
        toast.success('Log out successfully');
    };

    const handleMouseEnter = (menu) => {
        clearTimeout(hoverTimeout.current);
        setHoverMenu(menu);
    };

    const handleMouseLeave = () => {
        hoverTimeout.current = setTimeout(() => {
            setHoverMenu(null);
        }, 100);
    };

    console.log(hoverMenu);
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow px-4 md:px-10  py-2">
            <div
                className="flex items-center justify-between gap-10 relative  mx-auto"
                onMouseEnter={() => setHoverMenu(hoverMenu)}
            >
                <Link to="/" className="flex  items-center cursor-pointer">
                    <img src={Logo} alt="Logo" className="h-12 w-24" />
                    <p className="text-[var(--primary)] text-3xl md:text-4xl font-bold ml-2">OwnFit</p>
                </Link>

                <div className="flex-1 hidden md:flex justify-between ">
                    <Navbar
                        categories={categories}
                        setHoverMenu={setHoverMenu}
                        onMenuEnter={handleMouseEnter}
                        onMenuLeave={handleMouseLeave}
                    />
                    <div className="w-md  flex justify-end items-center ">
                        <SearchBox />
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-6 text-[var(--primary)] ">
                    <div className="relative group">
                        <CiUser className="text-3xl cursor-pointer" />
                        <div
                            className="absolute right-1/2 w-40 bg-white border border-gray-300 rounded shadow-lg top-7  translate-x-1/2
                        opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity "
                        >
                            {isLoggedIn ? (
                                <>
                                    <Link to="/account" className="block px-4 py-2 hover:bg-gray-100">
                                        My account
                                    </Link>
                                    <Link to="/purchase" className="block px-4 py-2 hover:bg-gray-100">
                                        Orders
                                    </Link>
                                    <div onClick={handleLogOut} className="block px-4 py-2 cursor-pointer hover:bg-gray-100">
                                        Logout
                                    </div>
                                </>
                            ) : (
                                <Link
                                    to="/customer/login"
                                    className="block px-4 py-2 font-bold text-[var(--primary)] hover:bg-gray-100"
                                >
                                    Login/Register
                                </Link>
                            )}
                        </div>
                    </div>

                    <CiHeart className="text-3xl cursor-pointer" />

                    <div className="relative group">
                        <Link to="/cart">
                            <PiShoppingCartThin
                                className={`text-3xl cursor-pointer transition-transform duration-300 ${
                                    highlight ? 'scale-125 bg-purple-200 rounded-xl p-1' : ''
                                }`}
                            />
                        </Link>
                        {cartItems?.length > 0 && (
                            <div className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-red-500 text-white rounded-full text-xs font-semibold">
                                {cartItems.length}
                            </div>
                        )}
                        <PopupCart
                            className="absolute -right-5 top-7 opacity-0 group-hover:opacity-100 pointer-events-none 
                            group-hover:pointer-events-auto transition-opacity"
                            items={cartItems}
                        />
                    </div>
                </div>

                <button
                    className="md:hidden text-[var(--primary)] text-3xl focus:outline-none"
                    onClick={() => setIsOpenDropList(!isOpenDropList)}
                    aria-label="Toggle menu"
                >
                    <BsList />
                </button>
            </div>

            {isOpenDropList && (
                <div className="md:hidden bg-white border-t border-gray-200 mt-2">
                    <div className="mx-4 py-3">
                        <SearchBox />
                    </div>
                    <DropdownItem itemName="User" Icon={CiUser} />
                    <DropdownItem itemName="Wish List" Icon={CiHeart} />
                    <DropdownItem itemName="Cart" Icon={PiShoppingCartThin} />
                </div>
            )}
            {(hoverMenu == 'fashion' || hoverMenuPopup == 'fashion') && (
                <div
                    onMouseEnter={() => setHoverMenuPopUp('fashion')}
                    onMouseLeave={() => setHoverMenuPopUp(null)}
                    className="flex left-0 right-0 mx-10 gap-10 top-full border border-gray-200 shadow overflow-auto h-[500px] absolute z-10 bg-white p-4  "
                >
                    <div>
                        <img src={categories[0]?.thumbnail} className="w-[350px] h-full" alt="" />
                    </div>
                    <div>
                        <div className="flex flex-col gap-5   w-full    ">
                            {categories?.map((cate, index) => (
                                <div className=" flex gap-10  " key={index}>
                                    <div className="border-r cursor-pointer border-gray-300  pr-10 ">
                                        <div className="flex flex-col gap-2   items-center  ">
                                            <img
                                                src={cate?.thumbnail}
                                                className="   rounded-full w-16 object-cover h-16 "
                                                alt=""
                                            />
                                            <p className="font-bold  border-gray-300 mb-1 text-gray-700  ">{cate?.name}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-5  ">
                                        {cate?.subCategories?.map((sub, index2) => (
                                            <div className="flex flex-col gap-2   cursor-pointer  items-center  " key={index2}>
                                                <img
                                                    src={sub?.thumbnail}
                                                    className="rounded-full w-16 object-cover h-16 "
                                                    alt=""
                                                />
                                                <p className="text-sm line-clamp-1  border-gray-300 mb-1 text-gray-700  ">
                                                    {sub?.name}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {(hoverMenu == 'sale-off' || hoverMenuPopup == 'sale-off') && (
                <div
                    onMouseEnter={() => setHoverMenuPopUp('sale-off')}
                    onMouseLeave={() => setHoverMenuPopUp(null)}
                    className="flex left-0 right-0 mx-10 gap-10 top-full border overflow-x-auto h-[500px] 
                     border-gray-200 shadow  absolute z-10 bg-white p-4  "
                >
                    <div>
                        <div className="grid grid-cols-6 gap-10   w-full    ">
                            {productsOnSale?.map((product, index) => (
                                <div className="">
                                    <ProductItem product={product} key={index} className={''}></ProductItem>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;
