import React from "react";

/****************************************************************************************/

import { Route } from "react-router-dom";
import MostrarDispositivos from "./MostrarDispositivos";
import FormularioDispositivos from "./FormularioDispositivos";
import UpdateDispositivos from "./updateDispositivos";
import Mantenimiento from "./Mantenimientos";
import NuevoMantenimiento from "./NuevoMantenimiento";
const RutasDispositivos = (
  {
    /**000 */
  }
) => {
  return (
    <>
      <Route
        exact
        path="/dispositivos"
        component={() => <MostrarDispositivos />}
      />
      <Route
        exact
        path="/dispositivos/key=:idDispositivo/mantenimiento"
        component={Mantenimiento}
      />

      <Route
        exact
        path="/dispositivos/key=:idDispositivo"
        component={UpdateDispositivos}
      />
      <Route
        exact
        path="/dispositivos/registrar"
        component={() => <FormularioDispositivos />}
      />
      <Route
        exact
        path="/mantenimiento/key=:idDispositivo"
        component={NuevoMantenimiento}
      />
    </>
  );
};
/****************************************************************************************/
/****************************************************************************************/

export default RutasDispositivos;
