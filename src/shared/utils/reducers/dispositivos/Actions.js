// Firebase Database
import database from "../../../firebase/database";

// Action Types
import {
  FETCH_DISPOSITIVOS_REQUEST,
  FETCH_DISPOSITIVOS_SUCCESS,
  ADD_DISPOSITIVOS_REQUEST,
  DELETE_DISPOSITIVOS_REQUEST,
  DELETE_DISPOSITIVOS_SUCCESS,
  UPDATE_DISPOSITIVOS_SUCCESS
} from "./actionsConst";

// Base Actions
import { request, received } from "../../redux/baseActions";

const REFERENCIA = "dispositivos";

export const getDISPOSITIVOS = () => dispatch => {
  // Dispatching our FETCH_DISPOSITIVOS_REQUEST action
  dispatch(request(FETCH_DISPOSITIVOS_REQUEST));
  try {
    // Listening for added rows

    database()
      .ref(REFERENCIA)
      .on("child_added", snapshot => {
        dispatch(
          received(FETCH_DISPOSITIVOS_SUCCESS, {
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
          received(UPDATE_DISPOSITIVOS_SUCCESS, {
            key: snapshot.key,
            ...snapshot.val()
          })
        );
      });

    // Lisetining for removed rows

    database()
      .ref(REFERENCIA)
      .on("child_removed", snapshot => {
        dispatch(received(DELETE_DISPOSITIVOS_SUCCESS, { key: snapshot.key }));
      });
  } catch (error) {}
};

export const addDISPOSITIVOS = data => dispatch => {
  // Dispatching our ADD_DISPOSITIVOS_REQUEST action
  dispatch(request(ADD_DISPOSITIVOS_REQUEST));

  // Adding a new element by pushing to the ref.
  // NOTE: Once this is executed the listener will be on fetch (child_added)

  try {
    database()
      .ref(REFERENCIA)
      .push(data);
  } catch (error) {}
};

export const updateDISPOSITIVOS = (data, key) => dispatch => {
  // Removing element by key
  // NOTE: Once this is executed the listener will be on fetchPrueba (child_removed)

  try {
    database()
      .ref(REFERENCIA)
      .child(key)
      .update(data);
  } catch (error) {}
};
export const deleteDISPOSITIVOS = key => dispatch => {
  // Dispatching our DELETE_DISPOSITIVOS_REQUEST action
  dispatch(request(DELETE_DISPOSITIVOS_REQUEST));

  // Removing element by key
  // NOTE: Once this is executed the listener will be on fetchPrueba (child_removed)

  try {
    database()
      .ref(REFERENCIA)
      .child(key)
      .remove();
  } catch (error) {}
};
