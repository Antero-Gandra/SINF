import React from "react";
import styles from "assets/jss/material-dashboard-react/components/tasksStyle.js";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import AuthBox from "components/AuthBox/AuthBox.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import SubscriptionBox from "components/SubscriptionBox/SubscriptionBox.js";
import GridContainer from "components/Grid/GridContainer";


const useStyles = makeStyles(styles);

export default function MasterData() {
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

      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}> Subscriptions </h4>
          </CardHeader>
          <CardBody>
            <SubscriptionBox />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}