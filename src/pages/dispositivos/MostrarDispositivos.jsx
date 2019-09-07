import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/styles";
/****************************************************************************************/
import { addDISPOSITIVOS } from "../../shared/utils/reducers/dispositivos/Actions";
const MostrarDispositivos = (
  {
    /**000 */
  }
) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const createDispositivo = () => {
    dispatch(addDISPOSITIVOS({ nombre: "daniel" }));
  };

  return (
    <div className={classes.root}>
      {" "}
      aqui dispositivos asdasds
      <button onClick={createDispositivo}>agregar </button>
    </div>
  );
};
/****************************************************************************************/
/****************************************************************************************/
const useStyles = makeStyles(({}) => ({
  root: {}
}));
export default MostrarDispositivos;
