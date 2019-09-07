import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { Paper } from "@material-ui/core";
/****************************************************************************************/
const Card = ({ children }) => {
  const classes = useStyles();
  return (
    <Paper>
      <div className={classes.root}>{children} </div>
    </Paper>
  );
};
/****************************************************************************************/
/****************************************************************************************/
const useStyles = makeStyles(({}) => ({
  root: { padding: 20 }
}));
export default Card;
