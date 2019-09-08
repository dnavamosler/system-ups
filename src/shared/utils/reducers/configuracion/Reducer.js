// Action Types
import {
  FETCH_CONFIGURACION_SUCCESS,
  DELETE_CONFIGURACION_SUCCESS,
  UPDATE_CONFIGURACION_SUCCESS,
  FETCH_CONFIGURACION_REQUEST
} from "./actionsConst";

import { getNewState } from "../../redux/frontend";

// Initial State
const initialState = {
  data: [],
  cargando: false
};

export default function CONFIGURACION(state = initialState, action) {
  switch (action.type) {
    case FETCH_CONFIGURACION_REQUEST: {
      return getNewState(state, {
        // cargando: true
      });
    }
    case FETCH_CONFIGURACION_SUCCESS: {
      const { payload: data } = action;

      return getNewState(state, {
        data: [...state.data, data],
        cargando: false
      });
    }

    case DELETE_CONFIGURACION_SUCCESS: {
      const { payload: data } = action;

      const filteredData = state.data.filter(item => item.key !== data.key);

      return getNewState(state, {
        data: filteredData
      });
    }

    case UPDATE_CONFIGURACION_SUCCESS: {
      const { payload: data } = action;

      const index = state.data.findIndex(item => item.key === data.key);

      state.data[index] = data;

      return getNewState(
        {},
        {
          data: state.data
        }
      );
    }

    default:
      return state;
  }
}
