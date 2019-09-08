import React from "react";
import Dashboard from "../../components/dashboard/Dashboard";

import { Grid, Paper } from "@material-ui/core";

//dependencies
import Chart from "./Chart";
import CantidadUps from "./cantidadUps";
import Orders from "./Orders";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";

const Inicio = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <Grid container spacing={3}>
      {/* Chart */}
      <Grid item xs={12} md={8} lg={9}>
        <Paper className={fixedHeightPaper}>
          <Chart />
        </Paper>
      </Grid>
      {/* Recent cantidadUps */}
      <Grid item xs={12} md={4} lg={3}>
        <Paper className={fixedHeightPaper}>
          <CantidadUps />
        </Paper>
      </Grid>
      {/* Recent Orders */}
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Orders />
        </Paper>
      </Grid>
    </Grid>
  );
};
export default Inicio;

const useStyles = makeStyles(() => ({
  paper: {
    padding: 20,
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  }
}));
