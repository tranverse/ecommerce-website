import BannerService from '@services/banner.service';
import CategoryService from '@services/category.service';
import ProductService from '@services/product.service';
import React, { useEffect, useRef, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import ProductItem from '@components/product/ProductItem';
import { Link } from 'react-router-dom';
const Home = () => {
    const [banners, setBanners] = useState([]);
    const [currentIdex, setCurrentIndex] = useState(0);
    const [categories, setCategories] = useState([]);
    const scrollRef = useRef(null);
    const [productsOnSale, setProductsOnSale] = useState([]);
    const [topSellingProduct, setTopSellingProduct] = useState([]);
    const ITEM_WIDTH = 250 + 16;
    const getBanner = async () => {
        try {
            const response = await BannerService.getBannersInTime();
            setBanners(response.data.data);
        } catch (error) {}
    };
    const getAllCategory = async () => {
        try {
            const response = await CategoryService.getAllCategories();
            setCategories(response.data.data);
        } catch (error) {}
    };
    const getProductOnSale = async () => {
        try {
            const response = await ProductService.getAllProductOnSale();
            setProductsOnSale(response.data.data);
        } catch (error) {}
    };
    const getTopSellingProduct = async () => {
        const response = await ProductService.getTopSellingProduct();
        console.log(response);
        if (response.data.success) {
            setTopSellingProduct(response.data.data);
        }
    };
    useEffect(() => {
        getBanner();
        getAllCategory();
        getProductOnSale();
        getTopSellingProduct();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev === banners?.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(interval);
    });

    const handleClickBanner = (index) => {
        setCurrentIndex(index);
    };

    const scrollLeft = () => {
        scrollRef.current.scrollBy({
            left: -ITEM_WIDTH,
            behavior: 'smooth',
        });
    };
    const scrollRight = () => {
        scrollRef.current.scrollBy({
            left: ITEM_WIDTH,
            behavior: 'smooth',
        });
    };
    console.log(topSellingProduct);
    return (
        <div className="mt-20  ">
            <section className="">
                {banners?.length > 0 && (
                    <div className="relative w-full h-[550px] overflow-hidden ">
                        {banners?.map((banner, index) => (
                            <img
                                src={banner?.imgUrl}
                                className={`w-full h-full transition-opacity  absolute
                               ${currentIdex === index ? 'opacity-100' : 'opacity-0'}`}
                                key={index}
                            />
                        ))}
                        <div className="flex gap-4 absolute bottom-2 z-10 transform -translate-x-1/2  left-1/2   ">
                            {banners?.map((_, index) => (
                                <div
                                    onClick={() => handleClickBanner(index)}
                                    className={`w-4 h-4 border border-gray-300  rounded-full cursor-pointer 
                                  ${currentIdex == index ? 'bg-[var(--primary)] ' : 'bg-white'}`}
                                    key={index}
                                ></div>
                            ))}
                        </div>
                    </div>
                )}
            </section>

            <section className="my-20  ">
                <h1 className="uppercase text-center my-10 text-[var(--primary)] text-3xl ">Loại sản phẩm</h1>

                <div className="relative   w-full ">
                    <IoIosArrowBack
                        onClick={scrollLeft}
                        className="text-5xl absolute top-1/2 left-0   z-10 cursor-pointer text-gray-500 -translate-y-1/2  "
                    />

                    <div ref={scrollRef} className="  flex gap-4    overflow-x-auto   scroll-smooth  scrollbar-hide   ">
                        {categories?.map((cate, index) => (
                            <div
                                key={index}
                                className="flex justify-center w-[260px] h-[390px] m-0   items-center relative   flex-shrink-0 
                        group cursor-pointer  "
                            >
                                <img
                                    src={cate?.thumbnail}
                                    className="hover:opacity-50 w-full h-full object-contain  "
                                    key={index}
                                />
                                <p
                                    className="absolute text-3xl transition-opacity opacity-0 group-hover:block text-black
                             group-hover:opacity-100 duration-200  font-semibold drop-shadow-2xl "
                                >
                                    {cate?.name}
                                </p>
                            </div>
                        ))}
                    </div>
                    <IoIosArrowForward
                        onClick={scrollRight}
                        className="text-5xl absolute top-1/2 right-0  text-gray-500  cursor-pointer -translate-y-1/2  "
                    />
                </div>
            </section>

            <section className="my-32">
                <h1 className="uppercase text-center my-10 text-[var(--primary)] text-3xl ">Sản phẩm giảm giá</h1>
                <div className="grid grid-cols-5 gap-4 ">
                    {productsOnSale?.map((product, index) => (
                        <Link to={`/product/${product?.slug}?id=${product?.id}`} key={index}>
                            <ProductItem product={product} key={index}></ProductItem>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="my-32  ">
                <h1 className="uppercase text-center my-10  text-[var(--primary)] text-3xl ">Sản phẩm bán chạy</h1>
                <div className="grid grid-cols-5 gap-4 ">
                    {topSellingProduct?.map((product, index) => (
                        <Link to={`/product/${product?.slug}?id=${product?.id}`} key={index}>
                            <ProductItem product={product} key={index}></ProductItem>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
