import React, { useState} from "react";
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
import { subscribeRequest } from "../../requests/requests.js";

const useStyles = makeStyles(styles);

export default function BrandsSubscribeBox() {

  const [subscribeKey, setKey] = useState('');
 
  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }

    callback("Subscribed!");
  }

  const classes = useStyles();

  const callback = (message) => {
    alert(`${message}
           Key: ${subscribeKey}`
    );
  }

  const subscribe = () =>
  {
    subscribeRequest (localStorage.getItem('tenant'), localStorage.getItem('organization'),  localStorage.getItem('key'), subscribeKey);
 }

  return (
    <form onSubmit={handleSubmit}>
      <Table className={classes.table}>
        <TableBody>
            <TableRow key={1}>
              <TableCell>
                <TextField 
                    multiline 
                    rows="5" 
                    required 
                    id="subscribeKey"
                    value={subscribeKey} 
                    onChange={e => setKey(e.target.value)} 
                    fullwidth={true}
                    variant="outlined" 
                    label="Enter your key" 
                />
              </TableCell>
            </TableRow>

            <TableRow key={2}>
                <TableCell> 
                  <Button onClick={() => { subscribe() }} type="submit" variant="contained">Submit</Button>
                </TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </form>
  );
}