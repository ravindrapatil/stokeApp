import Mainpage from '../componants/Mainpage'
import Orders from '../componants/Orders'
import Holdings from '../componants/Holdings'

const Routes = [
    {
        path: '/',
        name: 'Dashboard',
        title: "Dashboard",
        component: Mainpage
    },
    {
        path: '/orders',
        name: 'Orders',
        title: "Orders",
        component: Orders
    },
    {
        path: '/holdings',
        name: 'Holdings',
        title: "Holdings",
        component: Holdings
    }
];

export default Routes