import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { Grid, Divider, TextField } from "@material-ui/core";
import HeaderPage from "../../components/HeaderPage";
import Card from "../../components/Card";
import { Formik, Field } from "formik";
import TextWithAdorn from "../../components/TextWithAdorn";
import FechaPicker from "../../components/pickers/FechaPicker";
import CreableSelect from "../../components/pickers/CreableSelect";
import ButtonSTD from "../../components/ButtonSTD";
import { addDISPOSITIVOS } from "../../shared/utils/reducers/dispositivos/Actions";
import { addUBICACION } from "../../shared/utils/reducers/ubicacion/Actions";
import { addSALA } from "../../shared/utils/reducers/sala/Actions";
import { useToasts } from "react-toast-notifications";
import { trowNotification } from "../../functions/otros";
import MySwitch from "../../components/MySwitch";
/****************************************************************************************/
const FormularioDispositivos = ({ update }) => {
  const classes = useStyles();

  const { addToast } = useToasts();

  const dispatch = useDispatch();

  //enviar data
  const submit = data => {
    console.log(data);
    dispatch(addDISPOSITIVOS(data));
  };

  //seleccionables
  const ubicaciones = useSelector(state => state.UBICACION).data;
  const salas = useSelector(state => state.SALA).data;

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
              <Grid item xs="12">
                <h3>{update ? "Actualizar" : "Registrar"} dispositivos</h3>
                <Divider />
              </Grid>

              {/****************************************************** */}
              <Grid
                item
                xs="12"
                style={{
                  marginTop: 20
                }}
              >
                <Formik
                  initialValues={{
                    nombre: "",
                    marca: "",
                    modelo: "",
                    fechaInstalacion: new Date(),
                    ubicacion: "",
                    sala: "",
                    autonomia: "",
                    potencia: ""
                  }}
                  render={({ values, setFieldValue }) => (
                    <Grid container spacing="3">
                      {/************** Nombre de dispositivo */}
                      <Field
                        name="nombre"
                        render={({ field }) => (
                          <Grid item xs="12" md="6">
                            <TextField
                              {...field}
                              fullWidth
                              label="Nombre de dispositivo"
                              variant="outlined"
                            />
                          </Grid>
                        )}
                      />
                      {/************** Nombre de dispositivo */}
                      <Field
                        name="marca"
                        render={({ field }) => (
                          <Grid item xs="12" md="6">
                            <TextField
                              {...field}
                              fullWidth
                              label="Marca"
                              variant="outlined"
                            />
                          </Grid>
                        )}
                      />
                      {/************** Nombre de dispositivo */}
                      <Field
                        name="modelo"
                        render={({ field }) => (
                          <Grid item xs="12" md="6">
                            <TextField
                              {...field}
                              fullWidth
                              label="Modelo"
                              variant="outlined"
                            />
                          </Grid>
                        )}
                      />
                      {/************** Nombre de dispositivo */}
                      <Field
                        name="fechaInstalacion"
                        render={({ field }) => (
                          <Grid item xs="12" md="6">
                            <FechaPicker
                              {...field}
                              onChange={date => {
                                setFieldValue(
                                  "fechaInstalacion",
                                  date.format()
                                );
                              }}
                            />
                          </Grid>
                        )}
                      />
                      {/***************************************** */}
                      {/************** Ubicacion */}
                      <Field
                        name="ubicacion"
                        render={({ field }) => (
                          <Grid item xs="12" md="6">
                            <CreableSelect
                              label="Ubicación"
                              suggestions={ubicaciones.map(item => ({
                                label: item.descripcion,
                                value: item.key
                              }))}
                              onChange={e => {
                                setFieldValue("sala", "");
                                setFieldValue(field.name, e);
                              }}
                              value={values.ubicacion}
                              crear={e => {
                                addToast(
                                  "Nueva ubicación creada",
                                  trowNotification("success")
                                );
                                dispatch(addUBICACION({ descripcion: e }));
                              }}
                            />
                          </Grid>
                        )}
                      />
                      {/***************************************** */}
                      {/************** Ubicacion */}
                      <Field
                        name="sala"
                        render={({ field }) => (
                          <Grid item xs="12" md="6">
                            <CreableSelect
                              disabled={values.ubicacion == ""}
                              label="Nombre de sala"
                              suggestions={salas
                                .filter(
                                  item =>
                                    item.FK_ID_ubicacion ==
                                    values.ubicacion.value
                                )
                                .map(item => ({
                                  label: item.descripcion,
                                  value: item.key
                                }))}
                              onChange={e => {
                                setFieldValue(field.name, e);
                              }}
                              value={values[field.name]}
                              crear={e => {
                                addToast(
                                  "Nueva sala creada",
                                  trowNotification("success")
                                );
                                dispatch(
                                  addSALA({
                                    FK_ID_ubicacion: values.ubicacion.value,
                                    descripcion: e
                                  })
                                );
                              }}
                            />
                          </Grid>
                        )}
                      />
                      {/***************************************** */}
                      {/************** potencia */}
                      <Field
                        name="potencia"
                        render={({ field }) => (
                          <Grid item xs="12" md="6">
                            <TextWithAdorn
                              type="number"
                              label="Potencia"
                              adorno={"KVA"}
                              {...field}
                            />
                          </Grid>
                        )}
                      />
                      {/***************************************** */}
                      {/***************************************** */}
                      {/************** autonomia */}
                      <Field
                        name="autonomia"
                        render={({ field }) => (
                          <Grid item xs="12" md="6">
                            <TextWithAdorn
                              type="number"
                              label="Autonomia"
                              adorno={"Hrs."}
                              {...field}
                            />
                          </Grid>
                        )}
                      />
                      {/***************************************** */}
                      {/************** otros */}
                      <Grid item xs="12" md="6">
                        <Grid container spacing="1" justify="space-between">
                          <Grid item xs="12">
                            <h3>Otras opciones</h3>
                            <Divider />
                          </Grid>
                          {/**************************************************** */}
                          <Field
                            name="bateria"
                            render={({ field }) => (
                              <Grid item>
                                <MySwitch {...field} label="Banco de bateria" />
                              </Grid>
                            )}
                          />
                          {/**************************************************** */}
                          {/**************************************************** */}
                          <Field
                            name="byPass"
                            render={({ field }) => (
                              <Grid item>
                                <MySwitch {...field} label="Tablero By-pass" />
                              </Grid>
                            )}
                          />
                          {/**************************************************** */}
                          {/**************************************************** */}
                          <Field
                            name="rackApc"
                            render={({ field }) => (
                              <Grid item>
                                <MySwitch {...field} label="Racks APC" />
                              </Grid>
                            )}
                          />
                          {/**************************************************** */}
                        </Grid>
                      </Grid>
                      {/***************************************** */}
                      <Grid item xs="12">
                        <Grid container spacing="3">
                          <Grid item xs="12">
                            <Divider></Divider>
                          </Grid>
                          {/************** ENVIAR */}
                          <Grid item>
                            <ButtonSTD
                              icon="save"
                              color="primary"
                              onClick={() => {
                                submit(values);
                              }}
                            >
                              Procesar
                            </ButtonSTD>
                          </Grid>
                          {/********************************** */}
                          {/************** ENVIAR */}
                          <Grid item>
                            <ButtonSTD
                              onClick={() => {}}
                              icon="delete"
                              color="secondary"
                            >
                              Cancelar
                            </ButtonSTD>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  )}
                ></Formik>
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
export default FormularioDispositivos;
