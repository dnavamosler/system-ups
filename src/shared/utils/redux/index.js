import { combineReducers } from "redux";

import DISPOSITIVOS from "../reducers/dispositivos/Reducer";
import UBICACION from "../reducers/ubicacion/Reducer";
import SALA from "../reducers/sala/Reducer";
import EQUIPOS_RESPALDO from "../reducers/equiposRespaldo/Reducer";
import MANTENIMIENTO from "../reducers/mantenimiento/Reducer";

const rootReducer = combineReducers({
  DISPOSITIVOS,
  UBICACION,
  SALA,
  EQUIPOS_RESPALDO,
  MANTENIMIENTO
});
export default rootReducer;
