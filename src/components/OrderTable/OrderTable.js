import React, { useState, useEffect, useCallback } from "react";
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
import TextField from '@material-ui/core/TextField';
import Close from "@material-ui/icons/Close";
import Button from '@material-ui/core/Button';
import { generateSalesOrderRequest, generatePurchaseInvoiceRequest, rejectOrderRequest } from "../../requests/requests.js";

const useStyles = makeStyles(styles);

export default function OrderTable() {
  
  const classes = useStyles();

  // will have to fetch values from the database instead of having these hardcoded here ..
  // GET API call of subscribers

  const [rows, setRows] = useState('');
  const [, updateState] = React.useState();
  const forceUpdate = useCallback(() => updateState({}), [])

  const generateSalesOrder = (orderId) => {
    let generateSalesOrderPromise = generateSalesOrderRequest(orderId);

    generateSalesOrderPromise.then(response => response.json().then(data => {
      alert(data.message);
    }))
  }

  const rejectOrder = (orderId) => {

    let id = parseInt(orderId);

    let rejectOrderPromise = rejectOrderRequest(id);

    rejectOrderPromise.then(response => response.json().then(data => {
      alert("Rejected order!");

      let pos = rows.map(function(row) { return row.orderId; }).indexOf(orderId);

      let copyRows = rows;

      copyRows[pos] = {
        orderId: rows[pos].orderId, 
        stage: "REJECTED", 
        price: rows[pos].price,
        supplierOrCustomer: rows[pos].supplierOrCustomer,
        items: rows[pos].items
      }

      console.log(rows);

      setRows(copyRows);
      forceUpdate();
    }))
  }

  const generatePurchaseInvoice = (orderId) => {
    let generatePurchaseInvoicePromise = generatePurchaseInvoiceRequest(orderId);

    generatePurchaseInvoicePromise.then(response => response.json().then(data => {
      alert(data.message);
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
            <TableCell align="center">Total Price</TableCell>

            {localStorage.getItem('userType') === "Customer" &&
              <TableCell align="center">Supplier</TableCell>
            }

            {localStorage.getItem('userType') === "Supplier" &&
              <TableCell align="center">Customer</TableCell>
            }

            <TableCell align="center">Number of Items</TableCell>

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
                ORD-{row.orderId}
              </TableCell>
              <TableCell align="center">{row.stage}</TableCell>
              <TableCell align="center">{row.price}</TableCell>
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
                  <Button onClick={() => { generatePurchaseInvoice(row.orderId) }} style={{ margin: "2em" }} variant="contained" color="primary">
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

              {localStorage.getItem('userType') === "Supplier" && row.stage !== "PURCHASE_ORDER" && row.stage !== "REJECTED" &&
                <TableCell align="center">
                    To Associate this invoice with an order, write ORD-(id) in "Remarks" while creating the invoice
                </TableCell>
              }

              {localStorage.getItem('userType') === "Supplier" && row.stage === "PURCHASE_ORDER" && row.stage !== "REJECTED" &&
                <TableCell align="center">
                  <Button onClick={() => { generateSalesOrder(row.orderId) }} style={{ margin: "2em" }} variant="contained" color="primary">
                    Generate Sales Order
                  </Button>
                </TableCell>
              }

              {localStorage.getItem('userType') === "Supplier" && row.stage === "REJECTED" &&
                <TableCell align="center">
                    This order has been rejected!
                </TableCell>
              }

            </TableRow>
          ))} 
        </TableBody>
      </Table>
  );
}