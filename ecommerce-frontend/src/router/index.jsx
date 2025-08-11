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
import AddBanner from '@pages/backend/Banner/AddBanner';
import CustomerLogin from '@pages/Auth/CustomerLogin';
import CustomerRegister from '@pages/Auth/CustomerRegister';
import UserLogin from '@pages/Auth/UserLogin';

import EmployeeList from '@pages/backend/User/EmployeeList';
import AddEmployee from '@pages/backend/User/AddEmployee';
import BannerList from '@pages/backend/Banner/BannerList';
import AllOrderList from '@pages/backend/Order/AllOrderList';
import PendingOrderList from '@pages/backend/Order/PendingOrderList';
import ListProduct from '@pages/backend/Product/ListProduct';
import UpdateCategory from '@pages/backend/Category/UpdateCategory';
import CategoryList from '@pages/backend/Category/CategoryList';

const routes = [
    // auth
    { path: '/customer/login', Page: CustomerLogin, Layout: DefaultLayout },
    { path: '/customer/register', Page: CustomerRegister, Layout: DefaultLayout },
    { path: '/user/login', Page: UserLogin, Layout: null },

    // fontend
    { path: '/', Page: Home, Layout: DefaultLayout },
    { path: '/products', Page: Product, Layout: ProductLayout },
    { path: '/product/:slug', Page: ProductDetail, Layout: DefaultLayout },
    { path: '/cart', Page: Cart, Layout: DefaultLayout },
    { path: '/checkout', Page: Checkout, Layout: CheckoutLayout, layoutProps: { name: 'Checkout' } },
    { path: '/purchase', Page: OrderList, Layout: DefaultLayout },
    { path: '/purchase/detail/:orderId', Page: OrderDetail, Layout: DefaultLayout },

    // backend
    { path: '/dashboard', Page: Dashboard, Layout: AdminLayout },
    { path: '/user/add-product', Page: AddProduct, Layout: AdminLayout },
    { path: '/user/add-category', Page: AddCategory, Layout: AdminLayout },
    { path: '/user/add-banner', Page: AddBanner, Layout: AdminLayout },
    { path: '/user/add-employee', Page: AddEmployee, Layout: AdminLayout },

    { path: '/user/category-list', Page: CategoryList, Layout: AdminLayout },
    { path: '/user/product-list', Page: ListProduct, Layout: AdminLayout },
    { path: '/user/pending-order-list', Page: PendingOrderList, Layout: AdminLayout },
    { path: '/user/all-order-list', Page: AllOrderList, Layout: AdminLayout },
    { path: '/user/banner-list', Page: BannerList, Layout: AdminLayout },
    { path: '/user/employee-list', Page: EmployeeList, Layout: AdminLayout },

    { path: '/user/update-category', Page: UpdateCategory, Layout: AdminLayout },
];

export default routes;
