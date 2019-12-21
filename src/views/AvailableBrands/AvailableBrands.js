import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import BrandsTable from "components/Brands/BrandsTable.js";
import BrandsSubscribeBox from "components/Brands/BrandsSubscribeBox.js";

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

export default function AvailableBrands() {
  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          {localStorage.getItem('userType') === "Customer" &&
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Subscribe to a Brand</h4>
              <p className={classes.cardCategoryWhite}>
                As a customer, use your key here to subscribe to a brand
              </p>
            </CardHeader>
          }

          {localStorage.getItem('userType') === "Supplier" &&
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>List of Available Brands</h4>
              <p className={classes.cardCategoryWhite}>
                As a supplier, see all brands that are available
              </p>
            </CardHeader>
          }

          <CardBody>
            {localStorage.getItem('userType') === "Supplier" &&
              <BrandsTable />
            }

            {localStorage.getItem('userType') === "Customer" &&
              <BrandsSubscribeBox />
            }
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
