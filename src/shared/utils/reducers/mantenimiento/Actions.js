// Firebase Database
import database from "../../../firebase/database";

// Action Types
import {
  FETCH_MANTENIMIENTO_REQUEST,
  FETCH_MANTENIMIENTO_SUCCESS,
  ADD_MANTENIMIENTO_REQUEST,
  DELETE_MANTENIMIENTO_REQUEST,
  DELETE_MANTENIMIENTO_SUCCESS,
  UPDATE_MANTENIMIENTO_SUCCESS
} from "./actionsConst";

// Base Actions
import { request, received } from "../../redux/baseActions";

const REFERENCIA = "mantenimiento";

export const getMANTENIMIENTO = () => dispatch => {
  // Dispatching our FETCH_MANTENIMIENTO_REQUEST action
  dispatch(request(FETCH_MANTENIMIENTO_REQUEST));
  try {
    // Listening for added rows

    database()
      .ref(REFERENCIA)
      .on("child_added", snapshot => {
        dispatch(
          received(FETCH_MANTENIMIENTO_SUCCESS, {
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
          received(UPDATE_MANTENIMIENTO_SUCCESS, {
            key: snapshot.key,
            ...snapshot.val()
          })
        );
      });

    // Lisetining for removed rows

    database()
      .ref(REFERENCIA)
      .on("child_removed", snapshot => {
        dispatch(received(DELETE_MANTENIMIENTO_SUCCESS, { key: snapshot.key }));
      });
  } catch (error) {}
};

export const addMANTENIMIENTO = data => dispatch => {
  // Dispatching our ADD_MANTENIMIENTO_REQUEST action
  dispatch(request(ADD_MANTENIMIENTO_REQUEST));

  // Adding a new element by pushing to the ref.
  // NOTE: Once this is executed the listener will be on fetch (child_added)

  try {
    database()
      .ref(REFERENCIA)
      .push(data);
  } catch (error) {}
};

export const deleteMANTENIMIENTO = key => dispatch => {
  // Dispatching our DELETE_MANTENIMIENTO_REQUEST action
  dispatch(request(DELETE_MANTENIMIENTO_REQUEST));

  // Removing element by key
  // NOTE: Once this is executed the listener will be on fetchPrueba (child_removed)

  try {
    database()
      .ref(REFERENCIA)
      .child(key)
      .remove();
  } catch (error) {}
};
