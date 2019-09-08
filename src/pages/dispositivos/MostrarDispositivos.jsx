import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/styles";
/****************************************************************************************/
import { Grid } from "@material-ui/core";
import HeaderPage from "../../components/HeaderPage";
import { addDISPOSITIVOS } from "../../shared/utils/reducers/dispositivos/Actions";
import Card from "../../components/Card";
import ButtonSTD from "../../components/ButtonSTD";
import { Link } from "react-router-dom";
const MostrarDispositivos = (
  {
    /**000 */
  }
) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <div className={classes.root}>
      <Grid container spacing="2">
        {/**Cabecera */}
        <Grid item xs="12">
          <HeaderPage icon="devices">Gestión de dispositivos</HeaderPage>
        </Grid>
        {/**Funciones */}
        <Grid item xs="12">
          <Card>
            <Grid container spacing="1">
              <Grid item>
                <Link to="/dispositivos/registrar">
                  <ButtonSTD color="primary" icon="add">
                    Nuevo Dispositivo
                  </ButtonSTD>
                </Link>
              </Grid>
            </Grid>
          </Card>
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
export default MostrarDispositivos;
