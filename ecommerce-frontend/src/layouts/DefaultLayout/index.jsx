import Header from '@layouts/components/HeaderDefault';
import Footer from '@layouts/components/Footer';
function DefaultLayout({ children }) {
    return (
        <div className="bg-[#f7f7ff] overflow-hidden min-h-screen">
            <Header></Header>
            <div className="md:mx-auto  md:px-20 px-2 ">{children}</div>
            <Footer></Footer>
        </div>
    );
}

export default DefaultLayout;
