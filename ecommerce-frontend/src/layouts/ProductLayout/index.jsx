import Header from '@layouts/components/HeaderDefault';
import SidebarFilter from './SidebarFilter';
function ProductLayout({ children }) {
    return (
        <>
            <div className="min-h-screen bg-gray-100 overflow-hidden">
                <Header></Header>
                <div className="md:mt-32 md:mx-auto gap-5 md:flex px-4 md:px-10  ">
                    <aside className="md:w-1/5 bg-white">
                        <SidebarFilter></SidebarFilter>
                    </aside>
                    <div className="md:w-4/5">
                        <div className="my-2">
                            <select name="" id="">
                                <option value="">Price low to high</option>
                                <option value="">Price high to low</option>
                            </select>
                        </div>
                        <div className="">{children}</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductLayout;
