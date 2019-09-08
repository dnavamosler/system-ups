// Firebase Database
import database from "../../../firebase/database";

// Action Types
import {
  FETCH_EQUIPOS_RESPALDO_REQUEST,
  FETCH_EQUIPOS_RESPALDO_SUCCESS,
  ADD_EQUIPOS_RESPALDO_REQUEST,
  DELETE_EQUIPOS_RESPALDO_REQUEST,
  DELETE_EQUIPOS_RESPALDO_SUCCESS,
  UPDATE_EQUIPOS_RESPALDO_SUCCESS
} from "./actionsConst";

// Base Actions
import { request, received } from "../../redux/baseActions";

const REFERENCIA = "equiposRespaldo";

export const getEQUIPOS_RESPALDO = () => dispatch => {
  // Dispatching our FETCH_EQUIPOS_RESPALDO_REQUEST action
  dispatch(request(FETCH_EQUIPOS_RESPALDO_REQUEST));
  try {
    // Listening for added rows

    database()
      .ref(REFERENCIA)
      .on("child_added", snapshot => {
        dispatch(
          received(FETCH_EQUIPOS_RESPALDO_SUCCESS, {
            key: snapshot.key,
            ...snapshot.val()
          })
        );
      });

    // Listening for updated rows

    database()
      .ref(REFERENCIA)
      .on("child_changed", snapshot => {
        dispatch(
          received(UPDATE_EQUIPOS_RESPALDO_SUCCESS, {
            key: snapshot.key,
            ...snapshot.val()
          })
        );
      });

    // Lisetining for removed rows

    database()
      .ref(REFERENCIA)
      .on("child_removed", snapshot => {
        dispatch(
          received(DELETE_EQUIPOS_RESPALDO_SUCCESS, { key: snapshot.key })
        );
      });
  } catch (error) {}
};

export const addEQUIPOS_RESPALDO = data => dispatch => {
  // Dispatching our ADD_EQUIPOS_RESPALDO_REQUEST action
  dispatch(request(ADD_EQUIPOS_RESPALDO_REQUEST));

  // Adding a new element by pushing to the ref.
  // NOTE: Once this is executed the listener will be on fetch (child_added)

  try {
    database()
      .ref(REFERENCIA)
      .push(data);
  } catch (error) {}
};

export const deleteEQUIPOS_RESPALDO = key => dispatch => {
  // Dispatching our DELETE_EQUIPOS_RESPALDO_REQUEST action
  dispatch(request(DELETE_EQUIPOS_RESPALDO_REQUEST));

  // Removing element by key
  // NOTE: Once this is executed the listener will be on fetchPrueba (child_removed)

  try {
    database()
      .ref(REFERENCIA)
      .child(key)
      .remove();
  } catch (error) {}
};
