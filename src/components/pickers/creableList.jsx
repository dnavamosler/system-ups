import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { Grid, Divider, IconButton, Icon } from "@material-ui/core";
import CreableSelect from "./CreableSelect";
import Empty from "../Empty";
/****************************************************************************************/
const CreableList = ({
  titulo,
  suggestions = [],
  onChange,
  crear,
  value,
  label,
  placeholder,
  DeleteItem,
  lista
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing="2">
        <Grid item xs="12">
          <Grid container>
            <Grid item xs="12">
              <h3>{titulo}</h3>
            </Grid>
            <Grid item xs="12">
              <Divider />
            </Grid>
            <Grid item xs="12">
              <CreableSelect
                suggestions={suggestions}
                onChange={onChange}
                crear={crear}
                value={value}
                label={label}
                placeholder={placeholder}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs="12">
          <Divider />
        </Grid>
        <Grid item xs="12">
          <Grid container spacing="1">
            {lista.length < 1 ? (
              <Grid item xs="12">
                {" "}
                <Empty description="No hay datos" />{" "}
              </Grid>
            ) : (
              lista.map(item => {
                return (
                  <Grid item xs="12">
                    <Grid
                      container
                      spacing="1"
                      alignItems="center"
                      justify="space-between"
                    >
                      <Grid item xs>
                        {" "}
                        {item.label}{" "}
                      </Grid>
                      <Grid item>
                        <IconButton
                          onClick={() => {
                            DeleteItem(item.value);
                          }}
                          color="secondary"
                        >
                          <Icon>delete</Icon>
                        </IconButton>{" "}
                      </Grid>
                      <Grid item xs="12">
                        <Divider />
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })
            )}
          </Grid>
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
export default CreableList;
