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

const useStyles = makeStyles(styles);

export default function SubscriptionBox() {
  const classes = useStyles();

  // will have to fetch values from the database instead of having these hardcoded here ..
  // GET API call of subscribers
  const [rows, setRows] = useState('');

  const getSubscriptions = () => {

    if(localStorage.getItem('userSubscriptions') !== null){
      let localStoredSubscriptions = JSON.stringify(localStorage.getItem('userSubscriptions'));

      if(localStoredSubscriptions !== null){
        let JSONparsed = JSON.parse(JSON.parse(localStoredSubscriptions || '') || '');
        return JSONparsed;
      }
    }

    return '';
  }

  useEffect(() => {
    let localStoredSubscriptions = getSubscriptions();
    setRows(localStoredSubscriptions);    
  }, []);

  const unsubscribeFrontEnd = (supplier) => {
    setRows(rows.filter(item => item.subscriptionId !== supplier));
    let removeIndex = rows.map(function(item) { return item.subscriptionId; }).indexOf(supplier);
    rows.splice(removeIndex, 1);
  }

  const unsubscribeBackEnd = (supplier) => {
    // DELETE API call to unsubscribe
  }

  const unsubscribe = (supplier) => {
    unsubscribeFrontEnd(supplier);
    unsubscribeBackEnd(supplier);
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell align="center">Subscription id</TableCell>
          <TableCell align="center">Brand name</TableCell>

          {localStorage.getItem('userType') === "Customer" &&
            <TableCell align="center">Supplier</TableCell>
          }

          {localStorage.getItem('userType') === "Supplier" &&
            <TableCell align="center">Customer</TableCell>
          }

          <TableCell align="center">Created at</TableCell>
          <TableCell align="center">Unsubscribe</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        { rows !== '' && rows.map(row => (
          <TableRow key={row.subscriptionId}>
            <TableCell align="center" component="th" scope="row">
              {row.subscriptionId}
            </TableCell>
            <TableCell align="center">{row.brandName}</TableCell>
            <TableCell align="center">{row.customerOrSupplier}</TableCell>
            <TableCell align="center">{row.createdAt}</TableCell>
            <TableCell align="center">
              <IconButton onClick={() => unsubscribe(row.subscriptionId)} aria-label="Close" className={classes.tableActionButton}>
                <Close className={classes.tableActionButtonIcon + " " + classes.close}/>
              </IconButton>
            </TableCell>
          </TableRow>
        ))} 
      </TableBody>      
    </Table>
  );
}