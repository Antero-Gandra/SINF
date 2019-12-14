import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import styles from "assets/jss/material-dashboard-react/components/tasksStyle.js";
import TableHead from '@material-ui/core/TableHead';
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import Check from "@material-ui/icons/Check";
import {getToken} from "../../requests/requests.js";
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(styles);

function createData(orderId, stage, purchaseOrderName, supplierOrCustomer, items){
  return {orderId, stage, purchaseOrderName, supplierOrCustomer, items};
}

export default function OrderTable() {
  
  const classes = useStyles();

  // will have to fetch values from the database instead of having these hardcoded here ..
  // GET API call of subscribers
  const [rows, setRows] = useState([
    createData('ORD-234', 'PURCHASE_ORDER', 'FORTNITE','RiceLDA','FORT1, FORT2, ..'),
    createData('ORD-122', 'PURCHASE_ORDER', 'SOMETHING','RiceLA','Stuff1, stuff2, ..'),
    createData('ORD-245', 'PURCHASE_ORDER', 'ELSE','RicDA','Else1, Else2, ..'),
  ]);

  const unsubscribeFrontEnd = (order) => {
    setRows(rows.filter(item => item.order !== order));
    let removeIndex = rows.map(function(item) { return item.order; }).indexOf(order);
    rows.splice(removeIndex, 1);

    let tokenPromise = getToken();

    tokenPromise.then(response => response.json().then(data => {
      console.log(data);
    }));
  }

  const unsubscribeBackEnd = (supplier) => {
    // DELETE API call to unsubscribe
  }

  const unsubscribe = (order) => {
    unsubscribeFrontEnd(order);
    unsubscribeBackEnd(order);
  }

  const generateSalesOrder = (orderId) => {
    console.log("generate sometjing for: " + orderId);
  }

  const acceptOrder = (orderId) => {
    console.log("accept for order: " + orderId);
  }

  const rejectOrder = (orderId) => {
    console.log("reject for order: " + orderId);
  }

  const cancelOrder = (orderId) => {
    console.log("cancelled order: " + orderId);
  }

  return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Order-ID</TableCell>
            <TableCell align="center">Stage</TableCell>
            <TableCell align="center">Purchase Order Name</TableCell>

            {localStorage.getItem('userType') === "Customer" &&
              <TableCell align="center">Supplier</TableCell>
            }

            {localStorage.getItem('userType') === "Supplier" &&
              <TableCell align="center">Customer</TableCell>
            }

            <TableCell align="center">Items</TableCell>

            {localStorage.getItem('userType') === "Customer" &&
              <TableCell align="center">Cancel Order</TableCell>
            }

            {localStorage.getItem('userType') === "Supplier" &&
              <TableCell align="center">Accept/Reject</TableCell>
            }

            {localStorage.getItem('userType') === "Supplier" &&
              <TableCell align="center">Sales Order</TableCell>
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.orderId}>
              <TableCell align="center" component="th" scope="row">
                {row.orderId}
              </TableCell>
              <TableCell align="center">{row.stage}</TableCell>
              <TableCell align="center">{row.purchaseOrderName}</TableCell>
              <TableCell align="center">{row.supplierOrCustomer}</TableCell>
              <TableCell align="center">{row.items}</TableCell>

              {localStorage.getItem('userType') === "Customer" &&
                <TableCell align="center">
                  <IconButton onClick={() => cancelOrder(row.orderId)} aria-label="Close" className={classes.tableActionButton}>
                    <Close className={classes.tableActionButtonIcon + " " + classes.close}/>
                  </IconButton>
                </TableCell>
              }

              {localStorage.getItem('userType') === "Supplier" &&
                <TableCell align="center">
                  <IconButton onClick={() => acceptOrder(row.orderId)} aria-label="Check" className={classes.tableActionButton}>
                    <Check className={classes.tableActionButtonIcon + " " + classes.check} />
                  </IconButton>

                  <IconButton onClick={() => rejectOrder(row.orderId)} aria-label="Close" className={classes.tableActionButton}>
                    <Close className={classes.tableActionButtonIcon + " " + classes.close}/>
                  </IconButton>
                </TableCell>
              }

              {localStorage.getItem('userType') === "Supplier" && 
                <TableCell align="center">
                  <Button onClick={() => { generateSalesOrder(row.orderId) }} style={{ margin: "2em" }} variant="contained" color="primary">
                    Generate Sales Order
                  </Button>
                </TableCell>
              }

            </TableRow>
          ))} 
        </TableBody>
      </Table>
  );
}