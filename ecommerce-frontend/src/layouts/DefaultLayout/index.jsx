import Header from "@layouts/components/Header";

function DefaultLayout({ children }) {
    return (
        <div>
            <Header></Header>
            <div className='mx-auto  my-5 px-20 '>{children}</div>
        </div>
    );
}

export default DefaultLayout