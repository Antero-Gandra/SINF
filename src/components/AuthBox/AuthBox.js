import React, { useState } from "react";
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
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';


const useStyles = makeStyles(styles);

export default function AuthBox() {

  const [tenant, setTenant] = useState("");
  const [organization, setOrganization] = useState("");
  const [APIkey, setAPIkey] = useState("");
  const [userType, setUserType] = useState("");
 
  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }

    callback();

    window.location.replace("/admin");
  }

  const classes = useStyles();

  const callback = () => {
    alert(`User logged in!
           Tenant: ${tenant}
           Organization: ${organization}
           Key: ${APIkey}
           User type: ${userType}`
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Table className={classes.table}>
        <TableBody>
            <TableRow key={1}>
              <TableCell>
                <TextField required value={tenant} onChange={e => setTenant(e.target.value)} label="Enter your tenant" />
              </TableCell>
            </TableRow>

            <TableRow key={2}>
              <TableCell>
                <TextField required value={organization} onChange={e => setOrganization(e.target.value)} label="Enter your organization" />
              </TableCell>
            </TableRow>

            <TableRow key={3}>
              <TableCell> 
                <TextField required value={APIkey} onChange={e => setAPIkey(e.target.value)} label="Enter your API key" />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell> 
                  <FormControl component="fieldset" className={classes.formControl}>
                    <RadioGroup aria-label="customerType" name="type" value={userType} onChange={e => setUserType(e.target.value)}>
                      <FormControlLabel
                        value="Customer"
                        control={<Radio color="primary" />}
                        label="Customer"
                        labelPlacement="start"
                      />

                      <FormControlLabel
                        value="Supplier"
                        control={<Radio color="primary" />}
                        label="Supplier"
                        labelPlacement="start"
                      />
                    </RadioGroup>
                    <FormHelperText> Choose what type of user you are </FormHelperText>
                  </FormControl>
                </TableCell>

                <TableCell> 
                  <Button type="submit" variant="contained">Submit</Button>
                </TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </form>
  );
}