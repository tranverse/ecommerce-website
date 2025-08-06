import Home from '@pages/Home';
import DefaultLayout from '@layouts/DefaultLayout';
import Product from '@pages/Product';
import ProductLayout from '@layouts/ProductLayout';
import ProductDetail from '@pages/Product/ProductDetail';
import Cart from '@pages/Cart';
import Dashboard from '@pages/backend/Dashboard';
import AdminLayout from '@layouts/AdminLayout';
import AddProduct from '@pages/backend/Product/AddProduct';
import AddCategory from '@pages/backend/Category/AddCategory';
import Checkout from '@pages/Checkout';
import CheckoutLayout from '@layouts/CheckoutLayout';
import OrderList from '@pages/Checkout/OrderList';
import OrderDetail from '@pages/Checkout/OrderDetail';
const routes = [
    { path: '/', Page: Home, Layout: DefaultLayout },
    { path: '/products', Page: Product, Layout: ProductLayout },
    { path: '/product/:slug', Page: ProductDetail, Layout: DefaultLayout },
    { path: '/cart', Page: Cart, Layout: DefaultLayout },
    { path: '/admin', Page: Dashboard, Layout: AdminLayout },
    { path: '/add-product', Page: AddProduct, Layout: AdminLayout },
    { path: '/add-category', Page: AddCategory, Layout: AdminLayout },
    { path: '/checkout', Page: Checkout, Layout: CheckoutLayout, layoutProps: { name: 'Checkout' } },
    { path: '/purchase', Page: OrderList, Layout: DefaultLayout },
    { path: '/purchase/detail/:orderId', Page: OrderDetail, Layout: DefaultLayout },
];

export default routes;
