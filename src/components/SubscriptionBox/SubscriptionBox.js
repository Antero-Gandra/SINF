import React from "react";
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

const rows = [
  createData('S1', 0, "12/2/2019", false),
  createData('S2', 0, "12/2/2019", false),
  createData('S3', 0, "12/2/2019", false),
  createData('S4', 0, "12/2/2019", false),
  createData('S5', 0, "12/2/2019", false)
];

export default function AuthBox() {
  const classes = useStyles();
  return (
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
            <TableCell align="center"><IconButton aria-label="Close" className={classes.tableActionButton}>
              <Close className={classes.tableActionButtonIcon + " " + classes.close}/>
              </IconButton>
            </TableCell>
          </TableRow>
        ))} 
      </TableBody>

      <div>
        <br></br>

        <div>
          <div>
            <TextField 
            rows="4" 
            fullwidth  
            style={{width: 200}} 
            multiline 
            variant="outlined" 
            label="Insert Jasmin API key to subscribe" 
            />
          </div>

          <br></br>

          <div>
            <Button id="test" variant="contained">Submit</Button>
          </div>
         
        </div>
      </div>
      
    </Table>
  );
}