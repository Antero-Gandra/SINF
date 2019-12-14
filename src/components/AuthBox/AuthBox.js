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
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { login } from "../../requests/requests.js";

const useStyles = makeStyles(styles);

const useStateWithLocalStorage = localStorageKey => {
  const [value, setValue] = React.useState(
    localStorage.getItem(localStorageKey) || ''
  );
  React.useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [value]);

  return [value, setValue];
};

export default function AuthBox() {

  const [tenant, setTenant] = useStateWithLocalStorage('tenant');
  const [organization, setOrganization] = useStateWithLocalStorage('organization');
  const [company, setCompany] = useStateWithLocalStorage('key');
  const [userType, setUserType] = useStateWithLocalStorage('userType');
 
  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }

    if(userType === ''){
      alert("Select which type of user you are first!");
      return;
    }

    let loginAPI = login(tenant, organization, company, userType);

    loginAPI.then(response => response.json().then(data => {
      console.log(data.message);
      let msg = data.message
      if(msg == "Register successful" || msg == "Login successful")
      {
        callback(msg);
        window.location.replace("/admin");
      }
      else
        alert('Company does not exist!')
    }))
  }

  const classes = useStyles();

  const callback = (message) => {
    alert(`${message}
           Tenant: ${tenant}
           Organization: ${organization}
           Company: ${company}
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
                <TextField required value={company} onChange={e => setCompany(e.target.value)} label="Enter your company" />
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