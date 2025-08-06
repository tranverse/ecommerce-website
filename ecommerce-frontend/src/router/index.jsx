import Home from '@pages/Home';
import DefaultLayout from '@layouts/DefaultLayout';
import Product from '@pages/Product';
import ProductLayout from '@layouts/ProductLayout';
import ProductDetail from '@pages/Product/ProductDetail';
import Cart from '@pages/Cart';

const routes = [
    { path: '/', Page: Home, Layout: DefaultLayout },
    { path: '/products', Page: Product, Layout: ProductLayout },
    { path: '/product-detail', Page: ProductDetail, Layout: DefaultLayout },
    { path: '/cart', Page: Cart, Layout: DefaultLayout },
];

export default routes;
