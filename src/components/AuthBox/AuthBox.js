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

const useStyles = makeStyles(styles);

export default function AuthBox() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [APIkey, setAPIkey] = useState("");
  const [usernameErrors, setUsernameErrors] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState(false);
  const [APIkeyErrors, setAPIkeyErrors] = useState(false);


  const checkUsername = () => {
    let isValid = true;
    // API call to check GET username
    return isValid;
  }

  const checkPassword = () => {
    let isValid = true;
    // API call to check GET password
    return isValid;
  }

  const checkAPIkey = () => {
    let isValid = false;
    // API call to check GET API key
    return isValid;
  }

  const handleValidation = () => {
    let isValid = true;

    if(!checkUsername()){
      setUsernameErrors(true);
      isValid = false;
    }

    if(!checkPassword()){
      setPasswordErrors(true);
      isValid = false;
    }

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

  const classes = useStyles();

  const callback = () => {
    alert(`User synced!
           Name: ${username}
           Key: ${APIkey}`);
  }

  const errorStyle = {
    color: 'red',
    fontSize: '13px',
  };

  return (
    <form onSubmit={handleSubmit}>
      <Table className={classes.table}>
        <TableBody>
            <TableRow key={1}>
              <TableCell>
                <TextField required value={username} onChange={e => setUsername(e.target.value)} label="Enter your username" />
                {usernameErrors && <p style={errorStyle}>Invalid username</p>}
              </TableCell>
            </TableRow>

            <TableRow key={2}>
              <TableCell>
                <TextField type="password" required value={password} onChange={e => setPassword(e.target.value)} label="Enter your password" />
                {passwordErrors && <p style={errorStyle}>Invalid password</p>}
              </TableCell>
            </TableRow>

            <TableRow key={3}>
              <TableCell> 
                <TextField required value={APIkey} onChange={e => setAPIkey(e.target.value)} label="Enter your API key" />
                {APIkeyErrors && <p style={errorStyle}>Invalid API key</p>}
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