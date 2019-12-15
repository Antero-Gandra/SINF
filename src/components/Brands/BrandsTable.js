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
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import FileCopyIcon from '@material-ui/icons/FileCopy';
//import {  } from "../../requests/requests.js";

const useStyles = makeStyles(styles);

export default function BrandsTable() {
  
  const classes = useStyles();

  // will have to fetch values from the database instead of having these hardcoded here ..
  // GET API call of subscribers

  const [rows, setRows] = useState('');
  const [key, setKey] = useState('');

  const getBrands = () => {
    /*if(localStorage.getItem('userOrders') !== null){
      let localStoredOrders = JSON.stringify(localStorage.getItem('userOrders'));

      if(localStoredOrders !== null){
        let JSONparsed = JSON.parse(JSON.parse(localStoredOrders || '') || '');
        return JSONparsed;
      }
    }*/

    return [{brandId:"BRND-1", brandName:"EXEMPLO", numberOfSalesItems:"2", numberOfSubscriptions:"3"},
    {brandId:"BRND-1", brandName:"EXEMPLO", numberOfSalesItems:"2", numberOfSubscriptions:"3"}, 
    {brandId:"BRND-1", brandName:"EXEMPLO", numberOfSalesItems:"2", numberOfSubscriptions:"3"},
    {brandId:"BRND-1", brandName:"EXEMPLO", numberOfSalesItems:"2", numberOfSubscriptions:"3"}];
  }

  useEffect(() => {
    let localStoredBrands = getBrands();
    setRows(localStoredBrands);    
  }, []);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell align="center">Brand-ID</TableCell>
          <TableCell align="center">Brand Name</TableCell>
          <TableCell align="center">Number of Sales Items</TableCell>
          <TableCell align="center">Number of Subscriptions</TableCell>
          <TableCell align="center">Generate Key</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        { rows !== '' && rows.map(row => (
          <TableRow key={row.brandId}>
            <TableCell align="center" component="th" scope="row">
              {row.brandId}
            </TableCell>
            <TableCell align="center">{row.brandName}</TableCell>
            <TableCell align="center">{row.numberOfSalesItems}</TableCell>
            <TableCell align="center">{row.numberOfSubscriptions}</TableCell>
            <TableCell align="center">
              <Button style={{ margin: "2em" }} variant="contained" color="primary">
                Generate Key
              </Button>
              <TextField
                id="standard-read-only-input"
                value={key}
                onChange={e => setKey(e.target.value)}
                label="Your Key"
                className={classes.textField}
                margin="normal"
                InputProps={{
                  readOnly: true,
                }}
              />
              <CopyToClipboard text={key} onCopy={() => alert("Copied your key!")}>
                <IconButton aria-label="Copy" className={classes.tableActionButton}>
                  <FileCopyIcon className={classes.copy}/>
                </IconButton>
              </CopyToClipboard>
            </TableCell>
          </TableRow>
        ))} 
      </TableBody>
    </Table>
  );
}