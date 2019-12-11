import React from "react";
import styles from "assets/jss/material-dashboard-react/components/tasksStyle.js";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import AuthBox from "components/AuthBox/AuthBox.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import GridContainer from "components/Grid/GridContainer";


const useStyles = makeStyles(styles);

export default function Authentication() {
  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={6}>
        <CustomTabs
          title="Jasmin Settings:"
          headerColor="primary"
          tabs={[
          {
          tabName: "Authentication",
          tabIcon: LockOpenIcon,
          tabContent: (
            <AuthBox />
          )
          },
          ]}
        />
      </GridItem>
    </GridContainer>
  );
}