import CategoryService from '@services/category.service';
import { useEffect, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { Link } from 'react-router-dom';
function Navbar({ onMenuLeave, onMenuEnter }) {
    const isActive = (path) => {
        return location.pathname === path;
    };
    return (
        <>
            <div className="relative">
                <div className="flex justify-center mt-1 gap-10    text-[var(--primary)] uppercase font-semibold ">
                    <Link to={'/'}>
                        <p
                            className={`cursor-pointer hover:bg-[var(--primary)] p-1 hover:text-white ${isActive('/') ? 'underline' : ''}`}
                        >
                            Home
                        </p>
                    </Link>
                    <Link to={'/products'}>
                        <p
                            onMouseEnter={() => onMenuEnter('fashion')}
                            onMouseLeave={onMenuLeave}
                            className={`cursor-pointer hover:bg-[var(--primary)] p-1 hover:text-white ${isActive('/products') ? 'underline' : ''}`}
                        >
                            Fashion
                        </p>
                    </Link>
                    <Link to={'/products?filter=sale'}>
                        <p
                            onMouseEnter={() => onMenuEnter('sale-off')}
                            onMouseLeave={onMenuLeave}
                            className={`cursor-pointer hover:bg-[var(--primary)] p-1 hover:text-white ${isActive('/products/sale-off') ? 'underline' : ''}`}
                        >
                            Sale off
                        </p>
                    </Link>
                    <p
                        className={`cursor-pointer hover:bg-[var(--primary)] p-1 hover:text-white ${isActive('/collection') ? 'underline' : ''}`}
                    >
                        Collection
                    </p>
                </div>
            </div>
        </>
    );
}

export default Navbar;
