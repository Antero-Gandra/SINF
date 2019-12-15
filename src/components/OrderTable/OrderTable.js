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
import Button from '@material-ui/core/Button';
import { generateSalesOrderRequest, generatePurchaseInvoiceRequest } from "../../requests/requests.js";

const useStyles = makeStyles(styles);

export default function OrderTable() {
  
  const classes = useStyles();

  // will have to fetch values from the database instead of having these hardcoded here ..
  // GET API call of subscribers

  const [rows, setRows] = useState('');

  const generateSalesOrder = (orderId) => {
    let generateSalesOrderPromise = generateSalesOrderRequest(orderId);

    generateSalesOrderPromise.then(response => response.json().then(data => {
      console.log(data.message);
    }))
  }

  const rejectOrder = (orderId) => {
    console.log("reject for order: " + orderId);
  }

  const generatePurchaseInvoice = (orderId) => {
    let generatePurchaseInvoicePromise = generatePurchaseInvoiceRequest(orderId);

    generatePurchaseInvoicePromise.then(response => response.json().then(data => {
      console.log(data.message);
    }))
  }

  const getOrders = () => {
    if(localStorage.getItem('userOrders') !== null){
      let localStoredOrders = JSON.stringify(localStorage.getItem('userOrders'));

      if(localStoredOrders !== null){
        let JSONparsed = JSON.parse(JSON.parse(localStoredOrders || '') || '');
        return JSONparsed;
      }
    }

    return '';
  }

  useEffect(() => {
    let localStoredOrders = getOrders();
    setRows(localStoredOrders);    
  }, []);

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
              <TableCell align="center">Purchase Invoice</TableCell>
            }

            {localStorage.getItem('userType') === "Supplier" && 
              <TableCell align="center">Reject</TableCell>
            }

            {localStorage.getItem('userType') === "Supplier" && 
              <TableCell align="center">Sales Order</TableCell>
            }
          </TableRow>
        </TableHead>
        <TableBody>
          { rows !== '' && rows.map(row => (
            <TableRow key={row.orderId}>
              <TableCell align="center" component="th" scope="row">
                {row.orderId}
              </TableCell>
              <TableCell align="center">{row.stage}</TableCell>
              <TableCell align="center">{row.purchaseOrderName}</TableCell>
              <TableCell align="center">{row.supplierOrCustomer}</TableCell>
              <TableCell align="center">{row.items}</TableCell>

              {localStorage.getItem('userType') === "Customer" && row.stage !== "SALES_INVOICE" &&
                <TableCell align="center">
                  <Button style={{ margin: "2em" }} variant="contained" color="primary" disabled>
                    Generate Purchase Invoice
                  </Button>
                </TableCell>
              }

              {localStorage.getItem('userType') === "Customer" && row.stage === "SALES_INVOICE" &&
                <TableCell align="center">
                  <Button onClick={() => { generatePurchaseInvoice(row.purchaseOrderName) }} style={{ margin: "2em" }} variant="contained" color="primary">
                    Generate Purchase Invoice
                  </Button>
                </TableCell>
              }

              {localStorage.getItem('userType') === "Supplier" && row.stage !== "PURCHASE_ORDER" &&
                <TableCell align="center">
                </TableCell>
              }

              {localStorage.getItem('userType') === "Supplier" && row.stage === "PURCHASE_ORDER" &&
                <TableCell align="center">
                  <IconButton onClick={() => rejectOrder(row.orderId)} aria-label="Close" className={classes.tableActionButton}>
                    <Close className={classes.tableActionButtonIcon + " " + classes.close}/>
                  </IconButton>
                </TableCell>
              }

              {localStorage.getItem('userType') === "Supplier" && row.stage !== "PURCHASE_ORDER" &&
                <TableCell align="center">
                  <Button style={{ margin: "2em" }} variant="contained" color="primary" disabled>
                    Generate Sales Order
                  </Button>
                </TableCell>
              }

              {localStorage.getItem('userType') === "Supplier" && row.stage === "PURCHASE_ORDER" &&
                <TableCell align="center">
                  <Button onClick={() => { generateSalesOrder(row.purchaseOrderName) }} style={{ margin: "2em" }} variant="contained" color="primary">
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