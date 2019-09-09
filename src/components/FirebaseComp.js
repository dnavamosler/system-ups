import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/styles";

import { firebaseConfig } from "../config/firebase";
import { getDISPOSITIVOS } from "../shared/utils/reducers/dispositivos/Actions";
import { getUBICACION } from "../shared/utils/reducers/ubicacion/Actions";
import { getSALA } from "../shared/utils/reducers/sala/Actions";
import { getEQUIPOS_RESPALDO } from "../shared/utils/reducers/equiposRespaldo/Actions";
import { getMANTENIMIENTO } from "../shared/utils/reducers/mantenimiento/Actions";
import { getCONFIGURACION } from "../shared/utils/reducers/configuracion/Actions";
import { withRouter } from "react-router-dom";
//auth
import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import "firebase/auth";

/****************************************************************************************/
//inicializacion de firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseAppAuth = firebaseApp.auth();
export const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider()
};

const FirebaseComp = props => {
  const dispatch = useDispatch();
  //*** INICIALIZACION DE FIREBASE */
  React.useEffect(() => {
    //set providers

    dispatch(getDISPOSITIVOS());
    dispatch(getUBICACION());
    dispatch(getSALA());
    dispatch(getEQUIPOS_RESPALDO());
    dispatch(getMANTENIMIENTO());
    dispatch(getCONFIGURACION());
  }, []);

  const { user, signOut, signInWithGoogle } = props;
  useEffect(() => {
    !user ? props.history.push("/login") : props.history.push("/");
  }, [user]);

  const classes = useStyles();
  return <>{props.children}</>;
};
/****************************************************************************************/
/****************************************************************************************/
const useStyles = makeStyles(({}) => ({
  root: {}
}));

export default withRouter(
  withFirebaseAuth({
    providers,
    firebaseAppAuth
  })(FirebaseComp)
);
