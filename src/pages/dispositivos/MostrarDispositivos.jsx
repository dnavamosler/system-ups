import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/styles";
/****************************************************************************************/
import {
  Grid,
  Divider,
  IconButton,
  Icon,
  Box,
  TextField,
  Drawer,
  Typography
} from "@material-ui/core";
import HeaderPage from "../../components/HeaderPage";
import Empty from "../../components/Empty";
import Card from "../../components/Card";
import ButtonSTD from "../../components/ButtonSTD";
import { Link } from "react-router-dom";
import { deleteDISPOSITIVOS } from "../../shared/utils/reducers/dispositivos/Actions";
import OptionButton from "../../components/Options";
import TextWithAdorn from "../../components/pickers/TextWithAdorn";
import { Formik, Field } from "formik";
import {
  addCONFIGURACION,
  updateCONFIGURACION
} from "../../shared/utils/reducers/configuracion/Actions";
const MostrarDispositivos = ({}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const dispositivos = useSelector(state => state.DISPOSITIVOS).data;

  const [contenidoDrawer, setContenidoDrawer] = useState(null);
  const configuracion = useSelector(state => state.CONFIGURACION).data;
  const setearPeriodo = fecha => {
    if (configuracion.length < 1) dispatch(addCONFIGURACION(fecha));
    else {
      dispatch(updateCONFIGURACION(fecha, configuracion[0].key));
    }
    setContenidoDrawer(null);
  };

  const configure = () => {
    if (contenidoDrawer == null)
      setContenidoDrawer(
        <Grid
          container
          spacing="2"
          style={{
            padding: 30,
            width: "100%"
          }}
        >
          <Grid item xs="12">
            <Typography component="p" variant="h6">
              Configurar periodo de mantenimiento
            </Typography>
            <Divider />
          </Grid>
          <Formik
            initialValues={
              configuracion.length > 0
                ? configuracion[0]
                : {
                    periodo: 0
                  }
            }
            render={({ values, setFieldValue }) => (
              <>
                <Grid item xs="12">
                  <Field
                    name="periodo"
                    render={({ field }) => (
                      <TextWithAdorn
                        label="periodo"
                        adorno="meses"
                        type="number"
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item>
                  <ButtonSTD
                    icon="save"
                    color="primary"
                    onClick={() => {
                      setearPeriodo(values);
                    }}
                  >
                    Guardar
                  </ButtonSTD>
                </Grid>
                <Grid item>
                  <ButtonSTD
                    icon="close"
                    onClick={() => {
                      setContenidoDrawer(null);
                    }}
                  >
                    cerrar
                  </ButtonSTD>
                </Grid>
              </>
            )}
          ></Formik>
        </Grid>
      );
    else {
      setContenidoDrawer(null);
    }
  };

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
            <Grid container spacing="1" alignItems="center">
              <Grid item>
                <Link to="/dispositivos/registrar">
                  <ButtonSTD color="primary" icon="add">
                    Nuevo Dispositivo
                  </ButtonSTD>
                </Link>
              </Grid>
              <Grid item>
                <ButtonSTD onClick={configure}>
                  configurar Mantenimientos
                </ButtonSTD>
              </Grid>

              <Grid
                item
                style={{
                  marginLeft: "auto"
                }}
              >
                <span style={{ fontWeight: 600 }}>
                  Hay {dispositivos.length} UPS Registrados
                </span>
              </Grid>
              <Grid item xs="12">
                {" "}
                <Divider />
              </Grid>
              <Grid item xs="12">
                <ListaDispositivos />
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>

      <Drawer variant="persistent" anchor="right" open={contenidoDrawer}>
        {contenidoDrawer}
      </Drawer>
    </div>
  );
};
/****************************************************************************************/
/****************************************************************************************/
const useStyles = makeStyles(({}) => ({
  root: {}
}));
export default MostrarDispositivos;

const ListaDispositivos = ({}) => {
  const dispositivos = useSelector(state => state.DISPOSITIVOS).data;

  return (
    <Grid container spacing="1">
      <Grid
        item
        xs="12"
        style={{
          padding: "20px 0"
        }}
      >
        <Grid container>
          {/********************* */}
          <Grid item xs="3">
            Nombre
          </Grid>
          {/********************* */}
          {/********************* */}
          <Grid item xs="3">
            Modelo
          </Grid>
          {/********************* */}
          {/********************* */}
          <Grid item xs="2">
            Marca
          </Grid>
          {/********************* */}
          {/********************* */}
          <Grid item xs="3">
            Ubicación / sala
          </Grid>
          {/********************* */}
          {/********************* */}
          <Grid item xs="1">
            Opciones
          </Grid>
          {/********************* */}
          <Grid item xs="12">
            <Divider />
          </Grid>
        </Grid>
      </Grid>
      {dispositivos.length < 1 ? (
        <Grid item xs="12">
          {" "}
          <Empty />{" "}
        </Grid>
      ) : (
        dispositivos.map(item => <DispositivoItem data={item} />)
      )}
    </Grid>
  );
};

const DispositivoItem = ({ data }) => {
  const dispatch = useDispatch();
  /*********************************************************** */
  const ubicacion = useSelector(state => state.UBICACION);
  const [cuUbicacion, setCuUbicacion] = useState("N/A");
  useEffect(() => {
    try {
      const find = ubicacion.data.find(item => item.key == data.ubicacion);
      setCuUbicacion(find.descripcion);
    } catch (error) {}
  }, [ubicacion]);

  /*********************************************************** */
  /*********************************************************** */
  const sala = useSelector(state => state.SALA);
  const [cuSala, setCuSala] = useState("N/A");
  useEffect(() => {
    try {
      const find = sala.data.find(item => item.key == data.sala);
      setCuSala(find.descripcion);
    } catch (error) {}
  }, [sala]);

  /*********************************************************** */

  const deleteDispositivo = key => {
    dispatch(deleteDISPOSITIVOS(key));
  };

  return (
    <Grid item xs="12">
      <Card>
        <Grid container spacing="1" alignItems="center">
          {/****************************************** */}
          <Grid item xs="12" sm="3">
            <span
              style={{
                fontWeight: 500
              }}
            >
              {data.nombre}
            </span>
          </Grid>
          {/****************************************** */}
          {/****************************************** */}
          <Grid item xs="12" sm="3">
            <span>{data.modelo}</span>
          </Grid>
          {/****************************************** */}
          {/****************************************** */}
          <Grid item xs="12" sm="2">
            <span>{data.marca}</span>
          </Grid>
          {/****************************************** */}
          {/****************************************** */}
          <Grid item xs="12" sm="3">
            <span>{cuUbicacion}</span> / <span>{cuSala}</span>
          </Grid>
          {/****************************************** */}
          {/****************************************** */}
          <Grid item xs="12" sm="1">
            <OptionButton
              options={
                <Grid container>
                  <Grid item xs="12">
                    <Link to={`dispositivos/key=${data.key}`}>
                      <IconButton color="primary">
                        <Icon>visibility</Icon>
                      </IconButton>
                      Ver
                    </Link>{" "}
                  </Grid>
                  <Grid item xs="12">
                    <Link to={`dispositivos/key=${data.key}/mantenimiento`}>
                      <IconButton color="primary">
                        <Icon>calendar_today</Icon>
                      </IconButton>
                      Mantenimiento
                    </Link>{" "}
                  </Grid>
                  <Grid item xs="12">
                    <IconButton
                      onClick={() => {
                        deleteDispositivo(data.key);
                      }}
                      color="secondary"
                    >
                      <Icon>delete</Icon>
                    </IconButton>
                    Eliminar
                  </Grid>
                </Grid>
              }
            />
            {/*  */}
          </Grid>
          {/****************************************** */}
        </Grid>
      </Card>
    </Grid>
  );
};
