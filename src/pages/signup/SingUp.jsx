import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Formik, Field } from "formik";
import ButtonSTD from "../../components/ButtonSTD";
import { Link as RouterLink } from "react-router-dom";
import { firebaseAppAuth } from "../../components/FirebaseComp";
const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignUp() {
  const classes = useStyles();

  const registrar = data => {
    firebaseAppAuth
      .createUserWithEmailAndPassword(data.correo, data.pass)
      .then(e => {
        console.log(e);
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ...
      });
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registrarse
        </Typography>
        <Formik
          className={classes.form}
          initialValues={{}}
          render={({ values, setFieldValue }) => (
            <>
              <Grid
                container
                spacing={2}
                style={{
                  marginTop: 30
                }}
              >
                <Grid item xs={12}>
                  <Field
                    name="correo"
                    render={({ field }) => {
                      return (
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          label="Email"
                          {...field}
                          autoComplete="email"
                        />
                      );
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="pass"
                    render={({ field }) => {
                      return (
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          label="Password"
                          {...field}
                          type="password"
                          autoComplete="current-password"
                        />
                      );
                    }}
                  />
                </Grid>
                <Grid item xs="12">
                  <ButtonSTD
                    onClick={() => {
                      registrar(values);
                    }}
                    color="primary"
                    style={{ width: "100%" }}
                  >
                    Registrar
                  </ButtonSTD>
                </Grid>
                <Grid item xs="12">
                  <RouterLink to="/login">
                    {" "}
                    <Link variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </RouterLink>
                </Grid>
              </Grid>
            </>
          )}
        />
      </div>
    </Container>
  );
}
