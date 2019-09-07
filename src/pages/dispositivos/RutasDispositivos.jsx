import React from "react";

/****************************************************************************************/

import { Route } from "react-router-dom";
import MostrarDispositivos from "./MostrarDispositivos";
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
    </>
  );
};
/****************************************************************************************/
/****************************************************************************************/

export default RutasDispositivos;
