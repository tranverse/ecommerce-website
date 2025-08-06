import { IoSearch } from 'react-icons/io5';
const SearchBox = () => {
    return (
        <>
            <div className="flex w-full md:max-w-md max-w-sm  border border-[var(--primary)]">
                <input
                    type="text"
                    className="p-2 focus:outline-none max-w-sm md:max-w-lg w-full "
                    placeholder="Type here..."
                />
                <div className="p-2 bg-[var(--primary)] hover:cursor-pointer ">
                    <IoSearch className="text-2xl text-white " />
                </div>
            </div>
        </>
    );
};

export default SearchBox;
