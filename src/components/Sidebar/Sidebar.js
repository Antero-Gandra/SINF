/*eslint-disable*/
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
// core components
import AdminNavbarLinks from "components/Navbars/AdminNavbarLinks.js";
import {syncronizeCustomer, syncronizeSupplier} from "../../requests/requests.js";

import styles from "assets/jss/material-dashboard-react/components/sidebarStyle.js";

const useStyles = makeStyles(styles);

export default function Sidebar(props) {
  const classes = useStyles();
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }
  const doSyncCustomer = () => {
    let sync = syncronizeCustomer();

    sync.then(response => response.json().then(data => {
      console.log(data);
      let localStored = [];

      for(let i = 0; i < data.length; i++){
        localStored.push({
          orderId:data[i].itemKey, 
          stage:data[i].baseEntityId, 
          purchaseOrderName:data[i].baseUnit,
          supplierOrCustomer:data[i].baseUnitDescription,
          items:data[i].baseUnitId
        });
      }

      console.log(localStored);
      localStorage.setItem('userOrders', JSON.stringify(localStored)); 
      console.log(localStorage.getItem('userOrders'));
    }));
  }

  const doSyncSupplier = () => {
    let sync = syncronizeSupplier();

    sync.then(response => response.json().then(data => {
      console.log(data);
    }));
  }

  const logout = () => {
    localStorage.clear();
    window.location.replace("/auth");
  }

  const { color, logo, image, logoText, routes } = props;
  var links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        var activePro = " ";
        var listItemClasses;
        listItemClasses = classNames({
          [" " + classes[color]]: activeRoute(prop.layout + prop.path)
        });
        const whiteFontClasses = classNames({
          [" " + classes.whiteFont]: activeRoute(prop.layout + prop.path)
        });
        return (
          <NavLink
            to={prop.layout + prop.path}
            className={activePro + classes.item}
            activeClassName="active"
            key={key}
          >
            <ListItem button className={classes.itemLink + listItemClasses}>
              {typeof prop.icon === "string" ? (
                <Icon
                  className={classNames(classes.itemIcon, whiteFontClasses, {
                    [classes.itemIconRTL]: false
                  })}
                >
                  {prop.icon}
                </Icon>
              ) : (
                  <prop.icon
                    className={classNames(classes.itemIcon, whiteFontClasses, {
                      [classes.itemIconRTL]: false
                    })}
                  />
                )}
              <ListItemText
                primary={prop.name}
                className={classNames(classes.itemText, whiteFontClasses, {
                  [classes.itemTextRTL]: false
                })}
                disableTypography={true}
              />
            </ListItem>
          </NavLink>
        );
      })}
      <Container style={{ alignItems: 'center' }}>
        {localStorage.getItem('userType') === "Customer" && 
          <Button onClick={() => { doSyncCustomer() }} style={{ margin: "2em" }} variant="contained" color="primary">
            Sync Customer
          </Button>
        }

        {localStorage.getItem('userType') === "Supplier" && 
          <Button onClick={() => { doSyncSupplier() }} style={{ margin: "2em" }} variant="contained" color="primary">
            Sync Supplier
          </Button>
        }

        <Button onClick={() => { logout() }} style={{ margin: "2em" }} variant="contained" color="primary">
          Logout
        </Button>
      </Container>
    </List>

  );
  var brand = logoText.length > 0 ? (
    <div className={classes.logo}>
      <div className={classes.logoImage}>
        <img src={logo} alt="logo" className={classes.img} />
      </div>
      {logoText}
    </div>
  ) : (
      <div>
        <div className={classes.logo}>
          <div className={classes.logoImage}>
            <img src={logo} alt="logo" className={classes.img} />
          </div>
        </div>
      </div>
    );
  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={"right"}
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: false
            })
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            <AdminNavbarLinks />
            {links}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor={"left"}
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: false
            })
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
}

Sidebar.propTypes = {
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool
};
