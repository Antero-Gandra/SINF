import React, { useState } from "react";
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
import {getToken} from "../../requests/requests.js";

const useStyles = makeStyles(styles);

function createData(order, created, status, supplier, due, product, total, pin){
  return {order, created, status, supplier, due, product, total, pin};
}

export default function SubscriptionBox() {
  const classes = useStyles();

  // will have to fetch values from the database instead of having these hardcoded here ..
  // GET API call of subscribers
  const [rows, setRows] = useState([
    createData('Dakota Rice', '20 Oct', 'Sent','RiceLDA','22 Oct', 'rice', '103€', false),
    createData('Dakota Rice', '20 Oct', 'Sent','RiceLDA','22 Oct', 'rice', '103€', false),
    createData('Dakota Rice', '20 Oct', 'Sent','RiceLDA','22 Oct', 'rice', '103€', false),
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

  return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">order</TableCell>
            <TableCell align="center">status</TableCell>
            <TableCell align="center">supplier</TableCell>
            <TableCell align="center">due</TableCell>
            <TableCell align="center">product</TableCell>
            <TableCell align="center">total</TableCell>
            <TableCell align="center">pin</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.supplier}>
              <TableCell align="center" component="th" scope="row">
                {row.supplier}
              </TableCell>
              <TableCell align="center">{row.order}</TableCell>
              <TableCell align="center">{row.status}</TableCell>
              <TableCell align="center">{row.supplier}</TableCell>
              <TableCell align="center">{row.due}</TableCell>
              <TableCell align="center">{row.product}</TableCell>
              <TableCell align="center">{row.total}</TableCell>
              <TableCell align="center">
                <IconButton onClick={() => unsubscribe(row.pin)} aria-label="Close" className={classes.tableActionButton}>
                  <Close className={classes.tableActionButtonIcon + " " + classes.close}/>
                </IconButton>
              </TableCell>
            </TableRow>
          ))} 
        </TableBody>
      </Table>
  );
}