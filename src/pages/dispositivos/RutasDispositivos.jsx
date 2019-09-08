import React from "react";

/****************************************************************************************/

import { Route } from "react-router-dom";
import MostrarDispositivos from "./MostrarDispositivos";
import FormularioDispositivos from "./FormularioDispositivos";
import UpdateDispositivos from "./updateDispositivos";
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
        path="/dispositivos/key=:idDispositivo"
        component={UpdateDispositivos}
      />
      <Route
        exact
        path="/dispositivos/registrar"
        component={() => <FormularioDispositivos />}
      />
    </>
  );
};
/****************************************************************************************/
/****************************************************************************************/

export default RutasDispositivos;
