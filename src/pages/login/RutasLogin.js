import React from "react";
import { Route } from "react-router-dom";

import Login from "./Login";

const RutasLogin = () => {
  return <Route path="/login" exact component={Login} />;
};
export default RutasLogin;
