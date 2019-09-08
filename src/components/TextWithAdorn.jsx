import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
/****************************************************************************************/
const TextWithAdorn = props => {
  const classes = useStyles();
  return (
    <TextField
      style={{ width: "100%" }}
      variant="outlined"
      {...props}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">{props.adorno}</InputAdornment>
        )
      }}
    />
  );
};
/****************************************************************************************/
/****************************************************************************************/
const useStyles = makeStyles(({}) => ({
  root: {}
}));
export default TextWithAdorn;
