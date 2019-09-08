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

//NOTIFICATIONS
import { ToastProvider, useToasts } from "react-toast-notifications";
const store = configureStore({});

function App() {
  return (
    <Provider store={store}>
      <ToastProvider>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <BrowserRouter>
            <Switch>
              {/**Rutas de inicio */}
              <Dashboard>
                <RutasInicio />
                <RutasDispositivos />
              </Dashboard>
            </Switch>
          </BrowserRouter>
        </MuiPickersUtilsProvider>
      </ToastProvider>
    </Provider>
  );
}

export default App;
