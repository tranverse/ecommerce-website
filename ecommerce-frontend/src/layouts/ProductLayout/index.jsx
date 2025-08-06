import Header from '@layouts/components/Header';
import SidebarFilter from './SidebarFilter';
function ProductLayout({ children }) {
    return (
        <>
            <div>
                <Header></Header>
                <div className="mt-32 mx-auto gap-5 md:flex px-4 md:px-10 ">
                    <aside className="md:w-1/5 ">
                        <SidebarFilter></SidebarFilter>
                    </aside>
                    <div className="md:w-4/5">{children}</div>
                </div>
            </div>
        </>
    );
}

export default ProductLayout;
