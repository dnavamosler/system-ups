import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { FormControlLabel, Switch } from "@material-ui/core";
/****************************************************************************************/
const MySwitch = props => {
  const classes = useStyles();
  return (
    <FormControlLabel
      style={{ margin: 0 }}
      control={<Switch color="primary" />}
      {...props}
      labelPlacement="start"
    />
  );
};
/****************************************************************************************/
/****************************************************************************************/
const useStyles = makeStyles(({}) => ({
  root: {}
}));
export default MySwitch;
