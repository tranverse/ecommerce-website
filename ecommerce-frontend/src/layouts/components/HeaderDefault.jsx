import Logo from '@assets/images/Logo/Logo.png';
import SearchBox from '@layouts/components/SearchBox';
import { PiShoppingCartThin } from 'react-icons/pi';
import { CiUser } from 'react-icons/ci';
import { CiHeart } from 'react-icons/ci';
import Navbar from '@layouts/components/Navbar';
import { BsList } from 'react-icons/bs';
import { use, useEffect, useState } from 'react';
import DropdownItem from '@layouts/components/DropdownItem';
import { Link } from 'react-router-dom';
import CartService from '@services/cart.service';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, resetHightlight } from '@redux/slices/cartSlice';
import PopupCart from '@pages/Cart/PopupCart';
function Header() {
    const dispatch = useDispatch();
    const [isOpenDropList, setIsOpenDropList] = useState(true);
    const cartItems = useSelector((state) => state.cart.items);
    const customerId = 'e44f65c3-bb15-48d9-8f9a-4ce71484b681';
    const highlight = useSelector((state) => state.cart.highlight);
    useEffect(() => {
        if (highlight) {
            const timer = setTimeout(() => {
                dispatch(resetHightlight());
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [highlight, dispatch]);
    
    useEffect(() => {
        dispatch(fetchCart(customerId));
    }, [dispatch, customerId]);

    return (
        <header className="md:mx-auto md:px-10 px-4 pt-2 top-0 z-50 left-0 right-0 fixed shadow bg-white ">
            <div className="flex justify-between items-center gap-2">
                <Link to={'/'}>
                    <div className="flex  items-center cursor-pointer">
                        <img src={Logo} alt="Logo" className="h-[50px] w-[70px]" />

                        <p className="text-[var(--primary)] text-3xl md:text-4xl- font-bold ml-2">OwnFit</p>
                    </div>
                </Link>

                <div className="bg-white hidden md:flex flex-1 justify-center mx-10">
                    <SearchBox></SearchBox>
                </div>
                <div className="">
                    <div className="hidden md:flex items-center justify-between">
                        <div className="p-1">
                            <CiUser className="text-3xl text-[var(--primary)] cursor-pointer" />
                        </div>
                        <div className="p-1">
                            <CiHeart className="text-3xl text-[var(--primary)] cursor-pointer" />
                        </div>
                        <div className="p-1 relative group">
                            <Link to={'/cart'}>
                                <PiShoppingCartThin
                                    className={`text-3xl cursor-pointer transition-transform text-[var(--primary)]
                                        duration-300 ${highlight ? 'scale-150 bg-purple-200 rounded-2xl p-1 ' : ''}`}
                                />
                            </Link>
                            <div
                                className="absolute w-3 h-3 text-sm bg-red-400 text-white text-center  flex items-center rounded-2xl p-2
                             justify-center top-0 -right-1"
                            >
                                {cartItems?.length}
                            </div>
                            <div onMouseEnter={(e) => {}} onMouseLeave={(e) => {}} className='absolute hidden right-0 mt-2 group-hover:block'>
                                <PopupCart
                                    className={' '}
                                    items={cartItems}
                                ></PopupCart>
                            </div>
                        </div>
                    </div>
                    <button className="md:hidden cursor-pointer" onClick={() => setIsOpenDropList(!isOpenDropList)}>
                        <BsList className="text-3xl text-[var(--primary)] " />
                    </button>
                </div>
            </div>
            <Navbar></Navbar>
            {isOpenDropList && (
                <div className=" my-2">
                    <div className="md:hidden ">
                        <div className="bg-white  flex mx-2 justify-center">
                            <SearchBox></SearchBox>
                        </div>
                        <DropdownItem itemName="User" Icon={CiUser}></DropdownItem>
                        <DropdownItem itemName="Wish List" Icon={CiHeart}></DropdownItem>
                        <DropdownItem itemName="Cart" Icon={PiShoppingCartThin}></DropdownItem>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;
