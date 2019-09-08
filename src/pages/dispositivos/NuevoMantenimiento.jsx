import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { Grid, Divider, TextField } from "@material-ui/core";
import HeaderPage from "../../components/HeaderPage";
import Card from "../../components/Card";
import { Formik, Field } from "formik";
import ButtonSTD from "../../components/ButtonSTD";
import FechaPicker from "../../components/pickers/FechaPicker";
import moment from "moment";
import { Link } from "react-router-dom";
import { addMANTENIMIENTO } from "../../shared/utils/reducers/mantenimiento/Actions";
/****************************************************************************************/
const NuevoMantenimiento = ({
  match: {
    params: { idDispositivo }
  },
  history
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const guardar = values => {
    dispatch(
      addMANTENIMIENTO({ ...values, fecha: values.fecha.format("DD/MM/YYYY") })
    );
    history.push(`/dispositivos/key=${idDispositivo}/mantenimiento`);
  };
  return (
    <div className={classes.root}>
      <Grid container spacing="2">
        <Grid container spacing="2">
          <Grid item xs="12">
            <HeaderPage icon="calendar_today">Mantenimientos</HeaderPage>
          </Grid>

          <Grid item xs="12">
            <Card>
              <Formik
                initialValues={{
                  fecha: moment(),
                  comentario: "",
                  FK_ID_dispositivo: idDispositivo
                }}
                render={({ values, setFieldValue }) => (
                  <Grid container spacing="2">
                    {/*************************** */}
                    <Grid item xs="12" md="6">
                      <Field
                        name="fecha"
                        render={({ field }) => (
                          <FechaPicker
                            label="Fecha"
                            {...field}
                            onChange={date => {
                              setFieldValue("fecha", date);
                            }}
                          />
                        )}
                      />
                    </Grid>
                    {/*************************** */}
                    {/*************************** */}
                    <Grid item xs="12" md="6">
                      <Field
                        name="comentario"
                        render={({ field }) => (
                          <TextField
                            label="Comentarios"
                            {...field}
                            multiline
                            rowsMax="6"
                            fullWidth
                            variant="outlined"
                          />
                        )}
                      />
                    </Grid>
                    {/*************************** */}
                    <Grid item xs="12">
                      <Divider />
                    </Grid>
                    {/*************************** */}
                    <Grid item>
                      <ButtonSTD
                        onClick={() => {
                          guardar(values);
                        }}
                        color="primary"
                        icon="save"
                      >
                        Guardar
                      </ButtonSTD>
                    </Grid>
                    {/*************************** */}
                    {/*************************** */}
                    <Grid item>
                      <Link
                        to={`/dispositivos/key=${idDispositivo}/mantenimiento`}
                      >
                        <ButtonSTD icon="close" color="secondary">
                          cancelar
                        </ButtonSTD>
                      </Link>
                    </Grid>
                    {/*************************** */}
                  </Grid>
                )}
              />
            </Card>
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
export default NuevoMantenimiento;
