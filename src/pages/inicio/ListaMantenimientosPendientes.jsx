import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { Grid, Divider, IconButton, Icon } from "@material-ui/core";
import moment from "moment";
import { Link } from "react-router-dom";

/****************************************************************************************/
const ListaMantenimientosPendientes = (
  {
    /**000 */
  }
) => {
  const classes = useStyles();

  const configuracion = useSelector(state => state.CONFIGURACION).data;
  const dispositivos = useSelector(state => state.DISPOSITIVOS).data;

  const mantenimientos = useSelector(state => state.MANTENIMIENTO).data;

  const [pendMantenimientos, setPendMantenimientos] = useState([]);

  useEffect(() => {
    try {
      let dispositivosMant = [];

      mantenimientos.forEach(item => {
        if (
          dispositivosMant.find(item2 => {
            if (item2.dispositivo == item.FK_ID_dispositivo) return true;
          })
        ) {
          dispositivosMant = dispositivosMant.map(item2 => {
            if (item2.dispositivo == item.FK_ID_dispositivo) {
              return {
                ...item2,
                mantenimientos: [...item2.mantenimientos, item]
              };
            } else {
              return item2;
            }
          });
        } else {
          dispositivosMant = [
            ...dispositivosMant,
            {
              dispositivo: item.FK_ID_dispositivo,
              mantenimientos: [item]
            }
          ];
        }
      });

      /// DISPOSITIVOS SEPARADOS PARA CALCULAR SUS MANTENIMIENTOS
      const periodo = configuracion;
      let dispositivosMantenimiento = [];
      let pendientesMant = [];

      if (periodo.length > 0) {
        dispositivosMant.forEach(item => {
          item.mantenimientos.forEach(mantenimiento => {
            // const periodoActual = periodo[0].periodo;
            const encontrado = dispositivosMantenimiento.find(
              item => item.FK_ID_dispositivo == mantenimiento.FK_ID_dispositivo
            );

            if (encontrado) {
              const dateEncontrado = moment(encontrado);
              const actual = moment(mantenimiento);
              if (dateEncontrado.isAfter(actual)) {
                dispositivosMantenimiento = dispositivosMantenimiento.map(
                  item3 => {
                    if (item3.key == encontrado.key) {
                      return actual;
                    } else {
                      return item3;
                    }
                  }
                );
              }
              // } else {
              //   // console.log("la nueva es menor");
              // }
            } else {
              dispositivosMantenimiento = [
                ...dispositivosMantenimiento,
                mantenimiento
              ];
            }
          });
        });

        //chechear si han pasado los meses

        dispositivosMantenimiento.forEach(item => {
          const actual = moment();
          const mantenimiento = item.fecha.split("/");
          const mantenimientoFormat = moment(
            `${mantenimiento[1]}/${mantenimiento[0]}/${mantenimiento[2]}`
          );

          const diferencia = actual.diff(mantenimientoFormat, "months");
          if (diferencia > periodo[0].periodo) {
            pendientesMant = [...pendientesMant, item];
          } else {
          }
        });

        setPendMantenimientos(pendientesMant);
      }
    } catch (error) {
      console.log(error);
    }
  }, [mantenimientos, configuracion]);

  return (
    <div className={classes.root}>
      {pendMantenimientos.map(item => {
        const dispositivo = dispositivos.find(
          item2 => item2.key == item.FK_ID_dispositivo
        );

        console.log(dispositivo);
        return (
          <Grid container spacing="1" alignItems="center">
            <Grid item xs>
              {dispositivo.nombre}
            </Grid>
            <Grid item>
              <Link to={`/dispositivos/key=${dispositivo.key}/mantenimiento`}>
                <IconButton>
                  <Icon>visibility</Icon>
                </IconButton>
              </Link>
            </Grid>
            <Grid item xs="12">
              <Divider />
            </Grid>
          </Grid>
        );
      })}
    </div>
  );
};
/****************************************************************************************/
/****************************************************************************************/
const useStyles = makeStyles(({}) => ({
  root: {}
}));
export default ListaMantenimientosPendientes;
