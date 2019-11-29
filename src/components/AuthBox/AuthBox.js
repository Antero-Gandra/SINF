import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import styles from "assets/jss/material-dashboard-react/components/tasksStyle.js";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(styles);

export default function AuthBox() {
  const classes = useStyles();
  return (
    <Table className={classes.table}>
      <TableBody>
          <TableRow key={1}>
            <TableCell>
              <TextField label="Enter your username" />
            </TableCell>
          </TableRow>

          <TableRow key={2}>
            <TableCell>
              <TextField label="Enter your password" />
            </TableCell>
          </TableRow>

          <TableRow key={3}>
            <TableCell> 
              <TextField label="Enter your API key" />
            </TableCell>

            <TableCell> 
              <Button variant="contained">Submit</Button>
            </TableCell>
          </TableRow>
      </TableBody>
    </Table>
  );
}