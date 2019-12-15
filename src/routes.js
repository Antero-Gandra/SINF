// @material-ui/icons
import Storage from "@material-ui/icons/Storage";
import ListIcon from '@material-ui/icons/List';

// core components/views for Admin layout
import MasterDataPage from "views/MasterData/MasterData.js";
import OrderList from "views/creativetim/OrderList/OrderList.js";
import AvailableBrands from "views/creativetim/AvailableBrands/AvailableBrands.js";

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
    path: "/available_brands",
    name: "Brands",
    icon: ListIcon,
    component: AvailableBrands,
    layout: "/admin"
  }
];

export default dashboardRoutes;
