// Firebase Database
import database from "../../../firebase/database";

// Action Types
import {
  FETCH_SALA_REQUEST,
  FETCH_SALA_SUCCESS,
  ADD_SALA_REQUEST,
  DELETE_SALA_REQUEST,
  DELETE_SALA_SUCCESS,
  UPDATE_SALA_SUCCESS
} from "./actionsConst";

// Base Actions
import { request, received } from "../../redux/baseActions";

const REFERENCIA = "sala";

export const getSALA = () => dispatch => {
  // Dispatching our FETCH_SALA_REQUEST action
  dispatch(request(FETCH_SALA_REQUEST));
  try {
    // Listening for added rows

    database()
      .ref(REFERENCIA)
      .on("child_added", snapshot => {
        dispatch(
          received(FETCH_SALA_SUCCESS, {
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
          received(UPDATE_SALA_SUCCESS, {
            key: snapshot.key,
            ...snapshot.val()
          })
        );
      });

    // Lisetining for removed rows

    database()
      .ref(REFERENCIA)
      .on("child_removed", snapshot => {
        dispatch(received(DELETE_SALA_SUCCESS, { key: snapshot.key }));
      });
  } catch (error) {}
};

export const addSALA = data => dispatch => {
  // Dispatching our ADD_SALA_REQUEST action
  dispatch(request(ADD_SALA_REQUEST));

  // Adding a new element by pushing to the ref.
  // NOTE: Once this is executed the listener will be on fetch (child_added)

  try {
    database()
      .ref(REFERENCIA)
      .push(data);
  } catch (error) {}
};

export const deleteSALA = key => dispatch => {
  // Dispatching our DELETE_SALA_REQUEST action
  dispatch(request(DELETE_SALA_REQUEST));

  // Removing element by key
  // NOTE: Once this is executed the listener will be on fetchPrueba (child_removed)

  try {
    database()
      .ref(REFERENCIA)
      .child(key)
      .remove();
  } catch (error) {}
};
