// Action Types
import {
  FETCH_UBICACION_SUCCESS,
  DELETE_UBICACION_SUCCESS,
  UPDATE_UBICACION_SUCCESS,
  FETCH_UBICACION_REQUEST
} from "./actionsConst";

import { getNewState } from "../../redux/frontend";

// Initial State
const initialState = {
  data: [],
  cargando: false
};

export default function UBICACION(state = initialState, action) {
  switch (action.type) {
    case FETCH_UBICACION_REQUEST: {
      return getNewState(state, {
        // cargando: true
      });
    }
    case FETCH_UBICACION_SUCCESS: {
      const { payload: data } = action;

      return getNewState(state, {
        data: [...state.data, data],
        cargando: false
      });
    }

    case DELETE_UBICACION_SUCCESS: {
      const { payload: data } = action;

      const filteredData = state.data.filter(item => item.key !== data.key);

      return getNewState(state, {
        data: filteredData
      });
    }

    case UPDATE_UBICACION_SUCCESS: {
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
