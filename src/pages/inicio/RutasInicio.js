import React from "react";
import { Route } from "react-router-dom";

import Inicio from "./Inicio";
import AcercaDe from "./AcercaDe";

const RutasInicio = () => {
  return (
    <>
      <Route exact path="/" component={() => <Inicio />} />
      <Route exact path="/acerca_de" component={AcercaDe} />
    </>
  );
};
export default RutasInicio;
