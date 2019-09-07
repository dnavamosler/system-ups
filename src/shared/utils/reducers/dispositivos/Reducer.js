// Action Types
import {
  FETCH_DISPOSITIVOS_SUCCESS,
  DELETE_DISPOSITIVOS_SUCCESS,
  UPDATE_DISPOSITIVOS_SUCCESS,
  FETCH_DISPOSITIVOS_REQUEST
} from "./actionsConst";

import { getNewState } from "../../redux/frontend";

// Initial State
const initialState = {
  data: [],
  cargando: false
};

export default function DISPOSITIVOS(state = initialState, action) {
  switch (action.type) {
    case FETCH_DISPOSITIVOS_REQUEST: {
      return getNewState(state, {
        // cargando: true
      });
    }
    case FETCH_DISPOSITIVOS_SUCCESS: {
      const { payload: data } = action;

      return getNewState(state, {
        data: [...state.data, data],
        cargando: false
      });
    }

    case DELETE_DISPOSITIVOS_SUCCESS: {
      const { payload: data } = action;

      const filteredData = state.data.filter(item => item.key !== data.key);

      return getNewState(state, {
        data: filteredData
      });
    }

    case UPDATE_DISPOSITIVOS_SUCCESS: {
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
