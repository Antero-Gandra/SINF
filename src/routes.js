// @material-ui/icons
import Storage from "@material-ui/icons/Storage";
import ListIcon from '@material-ui/icons/List';

// core components/views for Admin layout
import MasterDataPage from "views/MasterData/MasterData.js";
import OrderList from "views/creativetim/OrderList/OrderList.js";
import ProductList from "views/creativetim/ProductList/ProductList.js";

const dashboardRoutes = [
  {
    path: "/order_list",
    name: "Order List",
    icon: "content_paste",
    component: OrderList,
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
    path: "/product_catalog",
    name: "Product Catalog",
    icon: ListIcon,
    component: ProductList,
    layout: "/admin"
  }
];

export default dashboardRoutes;
