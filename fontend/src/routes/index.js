//public routes
import Home from '../pages/Home';
import Product from '../pages/Product';
import Product_detail from '../pages/Product_detail';
import Cart from '../pages/Cart';
import Pay from '../pages/Pay';
import Admin from '../components/Layout/Admin';
import AdHome from '../pages/Admin/Home';
import Category from '../pages/Admin/Category';
import Supplier from '../pages/Admin/Supplier';
import Account from '../pages/Admin/Account';
import AdProduct from '../pages/Admin/Product';
import Staff from '../pages/Admin/Staff';
import Order from '../pages/Admin/Order';

const publicRoutes = [
    {
        path:'/', component: Home
    },
    {
        path:'/Product', component: Product
    },
    {
        path:'/Product_detail', component: Product_detail
    },
    {
        path:'/Pay', component: Pay
    },
    {
        path:'/Cart', component: Cart
    },
    {
        path:'/Admin/Home', component: AdHome, layout:Admin
    },
    {
        path:'/Admin/Category', component: Category, layout:Admin
    },
    {
        path:'/Admin/Supplier', component: Supplier, layout:Admin
    },
    {
        path:'/Admin/Account', component: Account, layout:Admin
    },
    {
        path:'/Admin/Product', component: AdProduct, layout:Admin
    },
    {
        path:'/Admin/Staff', component: Staff, layout:Admin
    },
    {
        path:'/Admin/Order', component: Order, layout:Admin
    },
    {
        path:'/Admin/Order', component: Order, layout:Admin
    },
];

const privateRoutes= [];

export {
    publicRoutes,privateRoutes
};