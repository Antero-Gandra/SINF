import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

export default function TableList() {
  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>List of Orders</h4>
            <p className={classes.cardCategoryWhite}>
              See the orders saved on the server, use filters for better navigation
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Order", "Created", "Status", "Supplier", "Due", "Product", "Total", "Pin"]}
              tableData={[
                ["Dakota Rice", "Niger", "Oud-Turnhout", "$36,738", "$36,738", "$36,738", "$36,738", "$36,738"],
                ["Minerva Hooper", "Curaçao", "Sinaai-Waas", "$23,789", "$36,738", "$36,738", "$36,738", "$36,738"],
                ["Sage Rodriguez", "Netherlands", "Baileux", "$56,142", "$36,738", "$36,738", "$36,738","$36,738"],
                ["Philip Chaney", "Korea, South", "Overland Park", "$38,735", "$36,738", "$36,738", "$36,738", "$36,738"],
                ["Doris Greene", "Malawi", "Feldkirchen in Kärnten", "$63,542", "$36,738", "$36,738", "$36,738", "$36,738"],
                ["Mason Porter", "Chile", "Gloucester", "$78,615", "$36,738", "$36,738", "$36,738", "$36,738"]
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
