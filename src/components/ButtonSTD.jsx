import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { Button, Grid, Icon } from "@material-ui/core";
/****************************************************************************************/
const ButtonSTD = ({
  children,
  icon,
  color = "default",
  onClick,
  disabled = false
}) => {
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      size="small"
      color={color}
      className={classes.root}
      onClick={onClick}
      disabled={disabled}
    >
      <Grid container spacing="1" alignItems="center" alignContent="center">
        {icon && (
          <Grid item>
            <Icon
              style={{
                display: "flex",
                alignItems: "center"
              }}
              fontSize="small"
            >
              {icon}
            </Icon>{" "}
          </Grid>
        )}
        <Grid item xs>
          <span> {children}</span>
        </Grid>
      </Grid>
    </Button>
  );
};
/****************************************************************************************/
/****************************************************************************************/
const useStyles = makeStyles(({}) => ({
  root: {}
}));
export default ButtonSTD;
