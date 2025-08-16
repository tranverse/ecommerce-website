import Home from '@pages/Home';
import DefaultLayout from '@layouts/DefaultLayout';
import Product from '@pages/Product';
import ProductLayout from '@layouts/ProductLayout';
import ProductDetail from '@pages/Product/ProductDetail';
import Cart from '@pages/Cart';
import Dashboard from '@pages/backend/Dashboard';
import AdminLayout from '@layouts/AdminLayout';
import AddCategory from '@pages/backend/Category/AddCategory';
import Checkout from '@pages/Checkout';
import CheckoutLayout from '@layouts/CheckoutLayout';
import OrderList from '@pages/Checkout/OrderList';
import OrderDetail from '@pages/Checkout/OrderDetail';
import CustomerLogin from '@pages/Auth/CustomerLogin';
import CustomerRegister from '@pages/Auth/CustomerRegister';
import UserLogin from '@pages/Auth/UserLogin';
import CustomerAccount from '@pages/CustomerAccount';
import { AddProduct } from '@pages/backend/Product/Product';
import { ViewProduct } from '@pages/backend/Product/Product';

import EmployeeList from '@pages/backend/User/EmployeeList';
import { AddEmployee } from '@pages/backend/User/Employee';
import BannerList from '@pages/backend/Banner/BannerList';
import AllOrderList from '@pages/backend/Order/AllOrderList';
import ListProduct from '@pages/backend/Product/ListProduct';
import CategoryList from '@pages/backend/Category/CategoryList';
import ViewOrder from '@pages/backend/Order/ViewOrder';
import Unauthorize from '@pages/backend/Unauthorize';
import { UpdateEmployee } from '@pages/backend/User/Employee';
import { ViewEmployee } from '@pages/backend/User/Employee';
import ViewCategory from '@pages/backend/Category/ViewCategory';
import UpdateCategory from '@pages/backend/Category/UpdateCategory';
import { UpdateProduct } from '@pages/backend/Product/Product';
import { AddBanner } from '@pages/backend/Banner/Banner';
import { ViewBanner } from '@pages/backend/Banner/Banner';
import { UpdateBanner } from '@pages/backend/Banner/Banner';
const role = {
    ADMIN: { role: 'ADMIN' },
    MANAGER: { role: 'Quản lý' },
    STAFF: { role: 'Nhân viên' },
    CUSTOMER: { role: 'Khách hàng' },
};

const routes = [
    // auth
    { path: '/customer/login', Page: CustomerLogin, Layout: DefaultLayout, type: 'customer' },
    { path: '/customer/register', Page: CustomerRegister, Layout: DefaultLayout, type: 'customer' },
    { path: '/user/login', Page: UserLogin, Layout: null, type: 'customer' },
    { path: '/account', Page: CustomerAccount, Layout: DefaultLayout, type: 'customer' },

    // fontend
    { path: '/', Page: Home, Layout: DefaultLayout, type: 'customer' },
    { path: '/products', Page: Product, Layout: ProductLayout, type: 'customer' },
    { path: '/products/sale-off', Page: Product, Layout: ProductLayout, type: 'customer' },

    { path: '/product/:slug', Page: ProductDetail, Layout: DefaultLayout, type: 'customer' },
    { path: '/cart', Page: Cart, Layout: DefaultLayout, type: 'customer' },
    {
        path: '/checkout',
        Page: Checkout,
        Layout: CheckoutLayout,
        layoutProps: { name: 'Checkout' },
        protected: true,
        allowRoles: [role.CUSTOMER],
        type: 'customer',
    },
    {
        path: '/purchase',
        Page: OrderList,
        Layout: DefaultLayout,
        protected: true,
        allowRoles: [role.CUSTOMER],
        type: 'customer',
    },
    {
        path: '/purchase/detail/:orderId',
        Page: OrderDetail,
        Layout: DefaultLayout,
        protected: true,
        allowRoles: [role.CUSTOMER],
        type: 'customer',
    },

    // backend
    // add
    {
        path: '/dashboard',
        Page: Dashboard,
        Layout: AdminLayout,
        protected: true,
        allowRoles: [role.ADMIN, role.MANAGER, role.STAFF],
        type: 'employee',
    },
    {
        path: '/user/add-product',
        Page: AddProduct,
        Layout: AdminLayout,
        protected: true,
        allowRoles: [role.ADMIN, role.MANAGER],
        type: 'employee',
    },
    {
        path: '/user/add-category',
        Page: AddCategory,
        Layout: AdminLayout,
        protected: true,
        allowRoles: [role.ADMIN, role.MANAGER],
        type: 'employee',
    },
    {
        path: '/user/add-banner',
        Page: AddBanner,
        Layout: AdminLayout,
        protected: true,
        allowRoles: [role.ADMIN, role.MANAGER],
        type: 'employee',
    },
    {
        path: '/user/add-employee',
        Page: AddEmployee,
        Layout: AdminLayout,
        protected: true,
        allowRoles: [role.ADMIN, role.MANAGER],
        type: 'employee',
    },

    // list
    {
        path: '/user/category-list',
        Page: CategoryList,
        Layout: AdminLayout,
        protected: true,
        allowRoles: [role.ADMIN, role.MANAGER, role.STAFF],
        type: 'employee',
    },
    {
        path: '/user/product-list',
        Page: ListProduct,
        Layout: AdminLayout,
        protected: true,
        allowRoles: [role.ADMIN, role.MANAGER, role.STAFF],
        type: 'employee',
    },
    {
        path: '/user/all-order-list',
        Page: AllOrderList,
        Layout: AdminLayout,
        protected: true,
        allowRoles: [role.ADMIN, role.MANAGER, role.STAFF],
        type: 'employee',
    },
    {
        path: '/user/banner-list',
        Page: BannerList,
        Layout: AdminLayout,
        protected: true,
        allowRoles: [role.ADMIN, role.MANAGER, role.STAFF],
        type: 'employee',
    },
    {
        path: '/user/employee-list',
        Page: EmployeeList,
        Layout: AdminLayout,
        protected: true,
        allowRoles: [role.ADMIN, role.MANAGER, role.STAFF],
        type: 'employee',
    },

    // detail
    {
        path: '/user/order/view-detail/:orderId',
        Page: ViewOrder,
        Layout: AdminLayout,
        protected: true,
        allowRoles: [role.ADMIN, role.MANAGER, role.STAFF],
        type: 'employee',
    },
    {
        path: '/user/view-product/:productId',
        Page: ViewProduct,
        Layout: AdminLayout,
        protected: true,
        allowRoles: [role.ADMIN, role.MANAGER, role.STAFF],
        type: 'employee',
    },
    {
        path: '/user/view-employee/:employeeId',
        Page: ViewEmployee,
        Layout: AdminLayout,
        protected: true,
        allowRoles: [role.ADMIN, role.MANAGER, role.STAFF],
        type: 'employee',
    },
    {
        path: '/user/view-category/:categoryId',
        Page: ViewCategory,
        Layout: AdminLayout,
        protected: true,
        allowRoles: [role.ADMIN, role.MANAGER, role.STAFF],
        type: 'employee',
    },
    {
        path: '/user/view-banner/:bannerId',
        Page: ViewBanner,
        Layout: AdminLayout,
        protected: true,
        allowRoles: [role.ADMIN, role.MANAGER, role.STAFF],
        type: 'employee',
    },
    // upate

    {
        path: '/user/update-category',
        Page: UpdateCategory,
        Layout: AdminLayout,
        protected: true,
        allowRoles: [role.ADMIN, role.MANAGER],
        type: 'employee',
    },
    {
        path: '/user/update-employee/:employeeId',
        Page: UpdateEmployee,
        Layout: AdminLayout,
        protected: true,
        allowRoles: [role.ADMIN, role.MANAGER],
        type: 'employee',
    },

    {
        path: '/user/update-category/:categoryId',
        Page: UpdateCategory,
        Layout: AdminLayout,
        protected: true,
        allowRoles: [role.ADMIN, role.MANAGER],
        type: 'employee',
    },
    {
        path: '/user/update-product/:productId',
        Page: UpdateProduct,
        Layout: AdminLayout,
        protected: true,
        allowRoles: [role.ADMIN, role.MANAGER],
        type: 'employee',
    },
    {
        path: '/user/update-banner/:bannerId',
        Page: UpdateBanner,
        Layout: AdminLayout,
        protected: true,
        allowRoles: [role.ADMIN, role.MANAGER],
        type: 'employee',
    },
    { path: '/unauthorize', Page: Unauthorize, Layout: null },
];

export default routes;
