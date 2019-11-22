// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Storage from "@material-ui/icons/Storage";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import Notifications from "@material-ui/icons/Notifications";

// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import MasterDataPage from "views/MasterData/MasterData.js";
import TemplateDashboardPage from "views/creativetim/Dashboard/Dashboard.js";
import UserProfile from "views/creativetim/UserProfile/UserProfile.js";
import TableList from "views/creativetim/TableList/TableList.js";
import Typography from "views/creativetim/Typography/Typography.js";
import Icons from "views/creativetim/Icons/Icons.js";
import NotificationsPage from "views/creativetim/Notifications/Notifications.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/data",
    name: "Master Data",
    icon: Storage, // TODO FIND BETTER
    component: MasterDataPage,
    layout: "/admin"
  },
  {
    path: "/template",
    name: "Template Dashboard",
    icon: Dashboard,
    component: TemplateDashboardPage,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User Profile",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Table List",
    icon: "content_paste",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Typography",
    icon: LibraryBooks,
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: BubbleChart,
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin"
  }];

export default dashboardRoutes;
