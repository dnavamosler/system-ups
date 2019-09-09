import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { Grid, Divider, TextField, IconButton, Icon } from "@material-ui/core";
import HeaderPage from "../../components/HeaderPage";
import Card from "../../components/Card";
import { Formik, Field } from "formik";
import TextWithAdorn from "../../components/pickers/TextWithAdorn";
import FechaPicker from "../../components/pickers/FechaPicker";
import CreableSelect from "../../components/pickers/CreableSelect";
import ButtonSTD from "../../components/ButtonSTD";
import {
  addDISPOSITIVOS,
  deleteDISPOSITIVOS,
  updateDISPOSITIVOS
} from "../../shared/utils/reducers/dispositivos/Actions";
import { addUBICACION } from "../../shared/utils/reducers/ubicacion/Actions";
import { addSALA } from "../../shared/utils/reducers/sala/Actions";
import { addEQUIPOS_RESPALDO } from "../../shared/utils/reducers/equiposRespaldo/Actions";
import { useToasts } from "react-toast-notifications";
import { trowNotification } from "../../functions/otros";
import MySwitch from "../../components/pickers/MySwitch";
import CreableList from "../../components/pickers/creableList";
import moment from "moment";
import { Link, withRouter } from "react-router-dom";

/****************************************************************************************/
const FormularioDispositivos = ({ data, history }) => {
  const classes = useStyles();

  const { addToast } = useToasts();

  const dispatch = useDispatch();

  //enviar data
  const submit = values => {
    const valuesFormateada = {
      ...values,
      equiposRespaldo: values.equiposRespaldo.map(item => item.value),
      sala: values.sala.value,
      ubicacion: values.ubicacion.value,
      fechaInstalacion: values.fechaInstalacion.format("DD/MM/YYYY")
    };

    if (!data) {
      dispatch(addDISPOSITIVOS(valuesFormateada));
    } else {
      dispatch(updateDISPOSITIVOS(valuesFormateada, values.key));
    }
    history.push("/dispositivos");
  };

  //eliminar
  const eliminarDispositivo = key => {
    dispatch(deleteDISPOSITIVOS(key));
  };

  //seleccionables
  const ubicaciones = useSelector(state => state.UBICACION).data;
  const salas = useSelector(state => state.SALA).data;
  const EquiposRespaldo = useSelector(state => state.EQUIPOS_RESPALDO).data;

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
                <h3>{data ? "Actualizar" : "Registrar"} dispositivos</h3>
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
                  enableReinitialize={true}
                  initialValues={
                    data && data != null
                      ? data
                      : {
                          autonomia: "",
                          bateria: false,
                          byPass: false,
                          comentarios: "",
                          equiposRespaldo: [],
                          fechaInstalacion: moment(),
                          nombre: "",
                          ip: "",
                          marca: "",
                          modelo: "",
                          ubicacion: "",
                          sala: "",
                          potencia: "",
                          rackApc: false,
                          ping: false
                        }
                  }
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
                              label="Fecha de instalación"
                              {...field}
                              onChange={date => {
                                setFieldValue("fechaInstalacion", date);
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
                      {/************** SALA */}
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
                        name="ip"
                        render={({ field }) => (
                          <Grid item xs="12" md="6">
                            <TextField
                              {...field}
                              fullWidth
                              label="Dirección ip"
                              variant="outlined"
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
                      {/************** Comentarios */}
                      <Grid item xs="12" md="6">
                        <Field
                          name="comentarios"
                          render={({ field }) => {
                            return (
                              <TextField
                                label="Comentarios adicionales"
                                {...field}
                                multiline
                                rowsMax="6"
                                fullWidth
                                variant="outlined"
                              />
                            );
                          }}
                        />
                      </Grid>
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
                                <MySwitch
                                  {...field}
                                  checked={values[field.name]}
                                  label="Banco de bateria"
                                />
                              </Grid>
                            )}
                          />
                          {/**************************************************** */}
                          {/**************************************************** */}
                          <Field
                            name="byPass"
                            render={({ field }) => (
                              <Grid item>
                                <MySwitch
                                  {...field}
                                  checked={values[field.name]}
                                  label="Tablero By-pass"
                                />
                              </Grid>
                            )}
                          />
                          {/**************************************************** */}

                          {/**************************************************** */}
                          <Field
                            name="rackApc"
                            render={({ field }) => (
                              <Grid item>
                                <MySwitch
                                  {...field}
                                  checked={values[field.name]}
                                  label="Racks APC"
                                />
                              </Grid>
                            )}
                          />
                          {/**************************************************** */}
                          <Field
                            name="ping"
                            render={({ field }) => (
                              <Grid item>
                                <MySwitch
                                  {...field}
                                  checked={values[field.name]}
                                  label="Ping en red"
                                />
                              </Grid>
                            )}
                          />
                          {/**************************************************** */}
                        </Grid>
                      </Grid>
                      {/************** EQUIPOS CONECTADOS */}
                      <Grid item xs="12" md="6">
                        <CreableList
                          label="Equipos"
                          onChange={e => {
                            setFieldValue("equiposRespaldo", [
                              e,
                              ...values.equiposRespaldo
                            ]);
                          }}
                          lista={values.equiposRespaldo}
                          suggestions={EquiposRespaldo.filter(item => {
                            if (
                              !values.equiposRespaldo.find(
                                item2 => item2.value == item.key
                              )
                            )
                              return true;
                          }).map(item => ({
                            label: item.descripcion,
                            value: item.key
                          }))}
                          crear={e => {
                            dispatch(addEQUIPOS_RESPALDO({ descripcion: e }));
                          }}
                          titulo="  ¿Que equipos tiene conectados y respaldando?"
                          DeleteItem={e => {
                            setFieldValue(
                              "equiposRespaldo",
                              values.equiposRespaldo.filter(
                                item => item.value != e
                              )
                            );
                          }}
                        />
                      </Grid>
                      {/***************************************** */}
                      {/************** Historial de mantenimiento */}
                      {/* <Grid item xs="12" md="6">
                        <CreableList
                          date
                          label="Mantenimiento"
                          onChange={e => {
                            setFieldValue("mantenimientos", [
                              {
                                label: e.format("DD/MM/YYYY"),
                                value: e.format("DD/MM/YYYY")
                              },
                              ...values.mantenimientos
                            ]);
                          }}
                          lista={values.mantenimientos}
                          titulo="Lista de mantenimientos"
                          DeleteItem={e => {
                            setFieldValue(
                              "mantenimientos",
                              values.mantenimientos.filter(
                                item => item.value != e
                              )
                            );
                          }}
                        />
                      </Grid> */}
                      {/***************************************** */}
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
                              {data ? "Actualizar" : "Procesar"}
                            </ButtonSTD>
                          </Grid>
                          {/************** ENVIAR */}
                          {data && (
                            <Grid item>
                              <ButtonSTD
                                icon="delete"
                                color="secondary"
                                onClick={() => {
                                  eliminarDispositivo(values.key);
                                  history.push("/dispositivos");
                                }}
                              >
                                Eliminar
                              </ButtonSTD>
                            </Grid>
                          )}
                          {/********************************** */}
                          {/************** ENVIAR */}
                          <Grid item>
                            <Link to="/dispositivos">
                              <ButtonSTD icon="close">Cancelar</ButtonSTD>
                            </Link>
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
export default withRouter(FormularioDispositivos);
