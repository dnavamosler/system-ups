// Firebase Database
import database from "../../../firebase/database";

// Action Types
import {
  FETCH_UBICACION_REQUEST,
  FETCH_UBICACION_SUCCESS,
  ADD_UBICACION_REQUEST,
  DELETE_UBICACION_REQUEST,
  DELETE_UBICACION_SUCCESS,
  UPDATE_UBICACION_SUCCESS
} from "./actionsConst";

// Base Actions
import { request, received } from "../../redux/baseActions";

const REFERENCIA = "ubicacion";

export const getUBICACION = () => dispatch => {
  // Dispatching our FETCH_UBICACION_REQUEST action
  dispatch(request(FETCH_UBICACION_REQUEST));
  try {
    // Listening for added rows

    database()
      .ref(REFERENCIA)
      .on("child_added", snapshot => {
        dispatch(
          received(FETCH_UBICACION_SUCCESS, {
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
          received(UPDATE_UBICACION_SUCCESS, {
            key: snapshot.key,
            ...snapshot.val()
          })
        );
      });

    // Lisetining for removed rows

    database()
      .ref(REFERENCIA)
      .on("child_removed", snapshot => {
        dispatch(received(DELETE_UBICACION_SUCCESS, { key: snapshot.key }));
      });
  } catch (error) {}
};

export const addUBICACION = data => dispatch => {
  // Dispatching our ADD_UBICACION_REQUEST action
  dispatch(request(ADD_UBICACION_REQUEST));

  // Adding a new element by pushing to the ref.
  // NOTE: Once this is executed the listener will be on fetch (child_added)

  try {
    database()
      .ref(REFERENCIA)
      .push(data);
  } catch (error) {}
};

export const deleteUBICACION = key => dispatch => {
  // Dispatching our DELETE_UBICACION_REQUEST action
  dispatch(request(DELETE_UBICACION_REQUEST));

  // Removing element by key
  // NOTE: Once this is executed the listener will be on fetchPrueba (child_removed)

  try {
    database()
      .ref(REFERENCIA)
      .child(key)
      .remove();
  } catch (error) {}
};
