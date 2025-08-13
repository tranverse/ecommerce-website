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
import { AddEmployee } from '@pages/backend/User/Employee';
import BannerList from '@pages/backend/Banner/BannerList';
import AllOrderList from '@pages/backend/Order/AllOrderList';
import ListProduct from '@pages/backend/Product/ListProduct';
import UpdateCategory from '@pages/backend/Category/UpdateCategory';
import CategoryList from '@pages/backend/Category/CategoryList';
import ViewOrder from '@pages/backend/Order/ViewOrder';
import ViewProduct from '@pages/backend/Product/ViewProduct';
import Unauthorize from '@pages/backend/Unauthorize';
import { UpdateEmployee } from '@pages/backend/User/Employee';
import { ViewEmployee } from '@pages/backend/User/Employee';
const role = {
    ADMIN: { role: 'ADMIN' },
    MANAGER: { role: 'Quản lý' },
    STAFF: { role: 'Nhân viên' },
};

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
    {
        path: '/dashboard',
        Page: Dashboard,
        Layout: AdminLayout,
        protected: true,
        allowRoles: [role.ADMIN, role.MANAGER, role.STAFF],
    },
    { path: '/user/add-product', Page: AddProduct, Layout: AdminLayout, protected: true, allowRoles: [role.ADMIN, role.MANAGER] },
    {
        path: '/user/add-category',
        Page: AddCategory,
        Layout: AdminLayout,
        protected: true,
        allowRoles: [role.ADMIN, role.MANAGER],
    },
    { path: '/user/add-banner', Page: AddBanner, Layout: AdminLayout, protected: true, allowRoles: [role.ADMIN, role.MANAGER] },
    {
        path: '/user/add-employee',
        Page: AddEmployee,
        Layout: AdminLayout,
        protected: true,
        allowRoles: [role.ADMIN, role.MANAGER],
    },

    {
        path: '/user/category-list',
        Page: CategoryList,
        Layout: AdminLayout,
        protected: true,
        allowRoles: [role.ADMIN, role.MANAGER, role.STAFF],
    },
    {
        path: '/user/product-list',
        Page: ListProduct,
        Layout: AdminLayout,
        protected: true,
        allowRoles: [role.ADMIN, role.MANAGER, role.STAFF],
    },
    {
        path: '/user/all-order-list',
        Page: AllOrderList,
        Layout: AdminLayout,
        protected: true,
        allowRoles: [role.ADMIN, role.MANAGER, role.STAFF],
    },
    {
        path: '/user/banner-list',
        Page: BannerList,
        Layout: AdminLayout,
        protected: true,
        allowRoles: [role.ADMIN, role.MANAGER, role.STAFF],
    },
    {
        path: '/user/employee-list',
        Page: EmployeeList,
        Layout: AdminLayout,
        protected: true,
        allowRoles: [role.ADMIN, role.MANAGER, role.STAFF],
    },

    {
        path: '/user/order/view-detail/:orderId',
        Page: ViewOrder,
        Layout: AdminLayout,
        protected: true,
        allowRoles: [role.ADMIN, role.MANAGER, role.STAFF],
    },
    {
        path: '/user/product/view-detail/:productId',
        Page: ViewProduct,
        Layout: AdminLayout,
        protected: true,
        allowRoles: [role.ADMIN, role.MANAGER, role.STAFF],
    },
    {
        path: '/user/view-employee/:employeeId',
        Page: ViewEmployee,
        Layout: AdminLayout,
        protected: true,
        allowRoles: [role.ADMIN, role.MANAGER, role.STAFF],
    },
    // upate

    {
        path: '/user/update-category',
        Page: UpdateCategory,
        Layout: AdminLayout,
        protected: true,
        allowRoles: [role.ADMIN, role.MANAGER],
    },
    {
        path: '/user/update-employee/:employeeId',
        Page: UpdateEmployee,
        Layout: AdminLayout,
        protected: true,
        allowRoles: [role.ADMIN, role.MANAGER],
    },

    { path: '/unauthorize', Page: Unauthorize, Layout: null },
];

export default routes;
