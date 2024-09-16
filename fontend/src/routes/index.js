//public routes
import Home from '../pages/Home';
import Product from '../pages/Product';
import Product_detail from '../pages/Product_detail';
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
];

const privateRoutes= [];

export {
    publicRoutes,privateRoutes
};