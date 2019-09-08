import React from "react";

/****************************************************************************************/

import { Route } from "react-router-dom";
import MostrarDispositivos from "./MostrarDispositivos";
import FormularioDispositivos from "./FormularioDispositivos";
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
        path="/dispositivos/registrar"
        component={() => <FormularioDispositivos />}
      />
    </>
  );
};
/****************************************************************************************/
/****************************************************************************************/

export default RutasDispositivos;
