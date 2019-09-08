import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { Box, Grid } from "@material-ui/core";
/****************************************************************************************/
const Empty = ({ description = "No hay data" }) => {
  const classes = useStyles();
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{
        minHeight: 50
      }}
    >
      <Grid item xs="12">
        <span> {description}</span>
      </Grid>
    </Grid>
  );
};
/****************************************************************************************/
/****************************************************************************************/
const useStyles = makeStyles(({}) => ({
  root: {}
}));
export default Empty;
