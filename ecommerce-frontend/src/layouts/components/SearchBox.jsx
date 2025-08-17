import { IoSearch } from 'react-icons/io5';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBox = ({ className }) => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (query.trim()) {
                // navigate sang trang kết quả tìm kiếm
                navigate(`/products?filter=${query}`);
            }
        }, 500); // debounce 500ms để không gọi quá nhiều lần

        return () => clearTimeout(delayDebounceFn);
    }, [query, navigate]);

    return (
        <div className={`flex w-full md:max-w-md max-w-sm border-2 border-[var(--primary)] ${className}`}>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="p-1 focus:outline-none max-w-sm md:max-w-lg w-full"
                placeholder="Tìm sản phẩm..."
            />
            <div
                onClick={() => query.trim() && navigate(`/products?filter=${query}`)}
                className="p-1 px-4 bg-[var(--primary)] hover:cursor-pointer"
            >
                <IoSearch className="text-2xl text-white" />
            </div>
        </div>
    );
};

export default SearchBox;
