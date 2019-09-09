import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { Box, Grid, Icon } from "@material-ui/core";
/****************************************************************************************/
const Empty = ({ description = "No hay data", icon = "cloud_off" }) => {
  const classes = useStyles();
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{
        minHeight: 80
      }}
    >
      <Grid item xs="12">
        <Box display="flex" justifyContent="center">
          {" "}
          <Icon className={classes.icon}>{icon}</Icon>
        </Box>
      </Grid>
      <Grid item xs="12">
        <Box display="flex" justifyContent="center">
          <span className={classes.texto}> {description}</span>
        </Box>
      </Grid>
    </Grid>
  );
};
/****************************************************************************************/
/****************************************************************************************/
const useStyles = makeStyles(({}) => ({
  icon: {
    fontSize: "5em",
    color: "#cfd8dc"
  },
  texto: {
    fontSize: "1.3em",
    fontWeight: 100,
    color: "#b0bec5"
  }
}));
export default Empty;
