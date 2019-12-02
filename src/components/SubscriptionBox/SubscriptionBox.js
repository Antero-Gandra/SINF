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
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(styles);

function createData(supplier, purchaseOrders, date, unsubscribe){
  return {supplier, purchaseOrders, date, unsubscribe};
}

export default function SubscriptionBox() {
  const classes = useStyles();

  const errorStyle = {
    color: 'red',
    fontSize: '13px',
  };

  const [APIkey, setAPIkey] = useState("");
  const [APIkeyErrors, setAPIkeyErrors] = useState(false);

  const checkAPIkey = () => {
    let isValid = true;
    // API call to check GET API key
    return isValid;
  }

  // will have to fetch values from the database instead of having these hardcoded here ..
  // GET API call of subscribers
  const [rows, setRows] = useState([
    createData('S1', 0, "12/2/2019", false),
    createData('S2', 0, "12/2/2019", false),
    createData('S3', 0, "12/2/2019", false),
    createData('S4', 0, "12/2/2019", false),
    createData('S5', 0, "12/2/2019", false)
  ]);

  const unsubscribeFrontEnd = (supplier) => {
    setRows(rows.filter(item => item.supplier !== supplier));
    let removeIndex = rows.map(function(item) { return item.supplier; }).indexOf(supplier);
    rows.splice(removeIndex, 1);
  }

  const unsubscribeBackEnd = (supplier) => {
    // DELETE API call to unsubscribe
  }

  const unsubscribe = (supplier) => {
    unsubscribeFrontEnd(supplier);
    unsubscribeBackEnd(supplier);
  }

  const handleValidation = () => {
    let isValid = true;

    if(!checkAPIkey()){
      setAPIkeyErrors(true);
      isValid = false;
    }

    return isValid;
  }

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }

    if(handleValidation()){
      callback();
    }

    else {
      alert("Invalid Jasmin authentication.");
    }
  }

  const callback = () => {
    alert(`Subscribed!
           Key: ${APIkey}`);
    // API call to SUBSCRIBE (POST?)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Supplier</TableCell>
            <TableCell align="center">#Pending Purchase Orders</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Unsubscribe</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.supplier}>
              <TableCell align="center" component="th" scope="row">
                {row.supplier}
              </TableCell>
              <TableCell align="center">{row.purchaseOrders}</TableCell>
              <TableCell align="center">{row.date}</TableCell>
              <TableCell align="center">
                <IconButton onClick={() => unsubscribe(row.supplier)} aria-label="Close" className={classes.tableActionButton}>
                  <Close className={classes.tableActionButtonIcon + " " + classes.close}/>
                </IconButton>
              </TableCell>
            </TableRow>
          ))} 
        </TableBody>
        <TableBody>
          <TableRow>
            <TableCell>
              <TextField 
              rows="4" 
              style={{width: 200}} 
              multiline 
              variant="outlined"
              required
              onChange={e => setAPIkey(e.target.value)} 
              label="Insert Jasmin API key to subscribe" 
              />
              {APIkeyErrors && <p style={errorStyle}>Invalid API key</p>}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Button type="submit" variant="contained">Submit</Button>
            </TableCell>
          </TableRow>
        </TableBody>      
      </Table>
    </form>
  );
}