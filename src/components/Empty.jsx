import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/styles";
/****************************************************************************************/
const Empty = ({ description }) => {
  const classes = useStyles();
  return <div className={classes.root}>{description}</div>;
};
/****************************************************************************************/
/****************************************************************************************/
const useStyles = makeStyles(({}) => ({
  root: {}
}));
export default Empty;
