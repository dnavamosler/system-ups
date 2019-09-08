// Action Types
import {
  FETCH_MANTENIMIENTO_SUCCESS,
  DELETE_MANTENIMIENTO_SUCCESS,
  UPDATE_MANTENIMIENTO_SUCCESS,
  FETCH_MANTENIMIENTO_REQUEST
} from "./actionsConst";

import { getNewState } from "../../redux/frontend";

// Initial State
const initialState = {
  data: [],
  cargando: false
};

export default function MANTENIMIENTO(state = initialState, action) {
  switch (action.type) {
    case FETCH_MANTENIMIENTO_REQUEST: {
      return getNewState(state, {
        // cargando: true
      });
    }
    case FETCH_MANTENIMIENTO_SUCCESS: {
      const { payload: data } = action;

      return getNewState(state, {
        data: [...state.data, data],
        cargando: false
      });
    }

    case DELETE_MANTENIMIENTO_SUCCESS: {
      const { payload: data } = action;

      const filteredData = state.data.filter(item => item.key !== data.key);

      return getNewState(state, {
        data: filteredData
      });
    }

    case UPDATE_MANTENIMIENTO_SUCCESS: {
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
