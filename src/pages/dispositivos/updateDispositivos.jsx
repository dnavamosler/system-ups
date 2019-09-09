import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import MostrarDispositivos from "./MostrarDispositivos";
import FormularioDispositivos from "./FormularioDispositivos";
import moment from "moment";
/****************************************************************************************/
const UpdateDispositivos = ({
  match: {
    params: { idDispositivo }
  }
}) => {
  const classes = useStyles();

  const dispositivo = useSelector(state => state.DISPOSITIVOS).data.find(
    item => item.key == idDispositivo
  );

  const equipos = useSelector(state => state.EQUIPOS_RESPALDO).data;
  const salas = useSelector(state => state.SALA).data;
  const ubicacion = useSelector(state => state.UBICACION).data;

  const obtainData = () => {
    try {
      const cuSala = salas.find(item => item.key == dispositivo.sala);
      const cuUbicacion = ubicacion.find(
        item => item.key == dispositivo.ubicacion
      );

      const dataFinal = {
        ...dispositivo,
        equiposRespaldo: dispositivo.equiposRespaldo.map(item => {
          const cuEqui = equipos.find(item2 => item2.key == item);
          return {
            label: cuEqui.descripcion,
            value: cuEqui.key
          };
        }),
        sala: { label: cuSala.descripcion, value: cuSala.key },
        ubicacion: { label: cuUbicacion.descripcion, value: cuUbicacion.key },
        fechaInstalacion: moment(dispositivo.fechaInstalacion, "DD/MM/YYYY")
      };

      return dataFinal;
    } catch (error) {
      return null;
    }
  };

  return <>{dispositivo && <FormularioDispositivos data={obtainData()} />}</>;
};
/****************************************************************************************/
/****************************************************************************************/
const useStyles = makeStyles(({}) => ({
  root: {}
}));
export default UpdateDispositivos;
