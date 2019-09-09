import React from "react";

//rutas de React ROUTER
import { BrowserRouter, Switch } from "react-router-dom";

//REDUX
import { Provider, useDispatch } from "react-redux";
import configureStore from "../shared/utils/redux/configureStore";
import Dashboard from "../components/dashboard/Dashboard";

//rutas

import RutasInicio from "../pages/inicio/RutasInicio";
import RutasDispositivos from "../pages/dispositivos/RutasDispositivos";
// Configure Redux Store

//provider date
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

import FirebaseComp from "./FirebaseComp";
import RutasLogin from "../pages/login/RutasLogin";
import { Route } from "react-router-dom";
import Login from "../pages/login/Login";
import SignUp from "../pages/signup/SingUp";
const store = configureStore({});

function App() {
  return (
    <Provider store={store}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <BrowserRouter>
          <FirebaseComp>
            <Switch>
              {/**Rutas de inicio */}
              <Route path="/login" exact component={Login} />
              <Route path="/registrarse" exact component={SignUp} />

              <Dashboard>
                <RutasInicio />
                <RutasDispositivos />
              </Dashboard>
            </Switch>
          </FirebaseComp>
        </BrowserRouter>
      </MuiPickersUtilsProvider>
    </Provider>
  );
}

export default App;
