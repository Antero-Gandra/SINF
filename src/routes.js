// @material-ui/icons
import Storage from "@material-ui/icons/Storage";
import Person from "@material-ui/icons/Person";
import ListIcon from '@material-ui/icons/List';
import HomeIcon from '@material-ui/icons/Home';

// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import MasterDataPage from "views/MasterData/MasterData.js";
import UserProfile from "views/creativetim/UserProfile/UserProfile.js";
import OrderList from "views/creativetim/OrderList/OrderList.js";
import ProductList from "views/creativetim/ProductList/ProductList.js";

const dashboardRoutes = [
  {
    path: "/home",
    name: "Home",
    icon: HomeIcon,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/master_data",
    name: "Master Data",
    icon: Storage, // TODO FIND BETTER
    component: MasterDataPage,
    layout: "/admin"
  },
  {
    path: "/order_list",
    name: "Order List",
    icon: "content_paste",
    component: OrderList,
    layout: "/admin"
  },
  {
    path: "/product_catalog",
    name: "Product Catalog",
    icon: ListIcon,
    component: ProductList,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User Profile",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  }
];

export default dashboardRoutes;
