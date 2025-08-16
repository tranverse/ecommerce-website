import Header from '@layouts/components/HeaderDefault';
import SidebarFilter from './SidebarFilter';
import Product from '@pages/Product';
import { useEffect, useState } from 'react';
import ProductService from '@services/product.service';
import { color } from '@mui/system';
import { useLocation } from 'react-router-dom';
function ProductLayout({ children }) {
    const [type, setType] = useState();
    const [value, setValue] = useState();
    const [products, setProducts] = useState([]);
    const [showProducts, setShowProducts] = useState([]);
    const [startPrice, setStartPrice] = useState('');
    const [endPrice, setEndPrice] = useState('');
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const filter = query.get('filter');
    const getAllProducts = async () => {
        const response = await ProductService.getAllProduct();
        console.log(response);
        if (response.data.success) {
            setProducts(response.data.data);
            setShowProducts(response.data.data);
        }
    };

    const handleFilterCategory = () => {
        setShowProducts(products.filter((product) => product.category.name === value.trim()));
    };
    const handleFilterColor = () => {
        setShowProducts(
            products.filter((product) => product.variants.some((variant) => variant.color.includes(value.toLowerCase()))),
        );
    };
    const handleFilterRating = () => {};

    const handleFilterPrice = () => {
        setShowProducts(
            products.filter(
                (product) => Number(product?.price) >= Number(startPrice) && Number(product?.price) <= Number(endPrice),
            ),
        );
    };
    useEffect(() => {
        getAllProducts();
    }, []);

    useEffect(() => {
        if (!products || products.length === 0) return;

        if (filter === 'sale') {
            setShowProducts(products.filter((product) => product.discountPercentage > 0));
        } else if (filter) {
            setShowProducts(products.filter((product) => product.category.name === filter));
        } else {
            setShowProducts(products);
        }
    }, [filter, products]);

    useEffect(() => {
        if (type == 'category') {
            handleFilterCategory();
        } else if (type == 'color') {
            handleFilterColor();
        } else if (type == 'price') {
            handleFilterPrice();
        }
    }, [type, value, startPrice, endPrice]);
    console.log(products);

    console.log(type, startPrice, endPrice);
    return (
        <>
            <div className="min-h-screen bg-gray-100 overflow-hidden">
                <Header></Header>
                <div className="md:mt-20 md:mx-auto gap-5 md:flex px-4 md:px-10  ">
                    <aside className="md:w-1/5 bg-white">
                        <SidebarFilter
                            setType={setType}
                            setValue={setValue}
                            setStartPrice={setStartPrice}
                            setEndPrice={setEndPrice}
                            startPrice={startPrice}
                            endPrice={endPrice}
                        ></SidebarFilter>
                    </aside>
                    <div className="md:w-4/5">
                        <div className="my-2">
                            <select name="" id="">
                                <option value="">Price low to high</option>
                                <option value="">Price high to low</option>
                            </select>
                        </div>
                        <Product type={type} value={value} products={showProducts}>
                            {children}
                        </Product>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductLayout;
