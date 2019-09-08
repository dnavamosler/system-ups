import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import Card from "./Card";
import { Grid, Icon, Divider } from "@material-ui/core";
/****************************************************************************************/
const HeaderPage = ({ children, icon }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Card>
        <Grid container spacing="2" alignItems="center">
          <Grid item>
            <Icon>{icon}</Icon>
          </Grid>
          <Grid item xs>
            {children}
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};
/****************************************************************************************/
/****************************************************************************************/
const useStyles = makeStyles(({}) => ({
  root: {
    fontWeight: 600,
    fontSize: "1.3em"
  }
}));
export default HeaderPage;
