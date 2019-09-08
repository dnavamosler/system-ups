import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { Grid, Typography } from "@material-ui/core";
import Logo from "../../shared/images/logo.png";
/****************************************************************************************/
const AcercaDe = (
  {
    /**000 */
  }
) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid
        container
        style={{
          width: "100%",
          height: "100%"
        }}
        alignItems="center"
        justify="center"
      >
        <Grid item style={{ marginBottom: 30 }}>
          <img src={Logo} alt="logo" />
        </Grid>
        <Grid
          item
          xs="12"
          style={{
            display: "flex",
            justifyContent: "center"
          }}
        >
          <Typography component="p" variant="h5" color="primary" gutterBottom>
            Importancia de los UPS para los sistemas Informáticos
          </Typography>
        </Grid>
        <Grid
          item
          xs="12"
          style={{
            display: "flex",
            justifyContent: "center"
          }}
        >
          <Typography component="p" variant="h6" gutterBottom>
            Manuel Arameda Cortes
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};
/****************************************************************************************/
/****************************************************************************************/
const useStyles = makeStyles(({}) => ({
  root: {}
}));
export default AcercaDe;
