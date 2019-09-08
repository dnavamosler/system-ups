import { combineReducers } from "redux";

import DISPOSITIVOS from "../reducers/dispositivos/Reducer";
import UBICACION from "../reducers/ubicacion/Reducer";
import SALA from "../reducers/sala/Reducer";

const rootReducer = combineReducers({
  DISPOSITIVOS,
  UBICACION,
  SALA
});
export default rootReducer;
