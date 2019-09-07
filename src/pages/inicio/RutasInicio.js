import React from "react";
import { Route } from "react-router-dom";

import Inicio from "./Inicio";

const RutasInicio = () => {
  return (
    <>
      <Route exact path="/" component={() => <Inicio />} />
    </>
  );
};
export default RutasInicio;
