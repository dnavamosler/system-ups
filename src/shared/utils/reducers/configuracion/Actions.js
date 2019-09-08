// Firebase Database
import database from "../../../firebase/database";

// Action Types
import {
  FETCH_CONFIGURACION_REQUEST,
  FETCH_CONFIGURACION_SUCCESS,
  ADD_CONFIGURACION_REQUEST,
  DELETE_CONFIGURACION_REQUEST,
  DELETE_CONFIGURACION_SUCCESS,
  UPDATE_CONFIGURACION_SUCCESS
} from "./actionsConst";

// Base Actions
import { request, received } from "../../redux/baseActions";

const REFERENCIA = "CONFIGURACION";

export const getCONFIGURACION = () => dispatch => {
  // Dispatching our FETCH_CONFIGURACION_REQUEST action
  dispatch(request(FETCH_CONFIGURACION_REQUEST));
  try {
    // Listening for added rows

    database()
      .ref(REFERENCIA)
      .on("child_added", snapshot => {
        dispatch(
          received(FETCH_CONFIGURACION_SUCCESS, {
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
          received(UPDATE_CONFIGURACION_SUCCESS, {
            key: snapshot.key,
            ...snapshot.val()
          })
        );
      });

    // Lisetining for removed rows

    database()
      .ref(REFERENCIA)
      .on("child_removed", snapshot => {
        dispatch(received(DELETE_CONFIGURACION_SUCCESS, { key: snapshot.key }));
      });
  } catch (error) {}
};

export const addCONFIGURACION = data => dispatch => {
  // Dispatching our ADD_CONFIGURACION_REQUEST action
  dispatch(request(ADD_CONFIGURACION_REQUEST));

  // Adding a new element by pushing to the ref.
  // NOTE: Once this is executed the listener will be on fetch (child_added)

  try {
    database()
      .ref(REFERENCIA)
      .push(data);
  } catch (error) {}
};
export const updateCONFIGURACION = (data, key) => dispatch => {
  // Removing element by key
  // NOTE: Once this is executed the listener will be on fetchPrueba (child_removed)

  try {
    database()
      .ref(REFERENCIA)
      .child(key)
      .update(data);
  } catch (error) {}
};

export const deleteCONFIGURACION = key => dispatch => {
  // Dispatching our DELETE_CONFIGURACION_REQUEST action
  dispatch(request(DELETE_CONFIGURACION_REQUEST));

  // Removing element by key
  // NOTE: Once this is executed the listener will be on fetchPrueba (child_removed)

  try {
    database()
      .ref(REFERENCIA)
      .child(key)
      .remove();
  } catch (error) {}
};
