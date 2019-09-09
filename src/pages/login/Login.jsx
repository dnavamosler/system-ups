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
import withFirebaseAuth from "react-with-firebase-auth";
import { providers, firebaseAppAuth } from "../../components/FirebaseComp";
import ButtonSTD from "../../components/ButtonSTD";
import { Formik, Field } from "formik";
import { Link as RouterLink } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {/* {"Copyright © "} */}
      {/* <Link color="inherit" href="https://material-ui.com/"> */}
      Manuel Arameda Cortes
      {/* </Link>{" "} */}
      {/* {new Date().getFullYear()} */}
      {"."}
    </Typography>
  );
}

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
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));
const SignIn = props => {
  const classes = useStyles();

  const login = data => {
    firebaseAppAuth
      .signInWithEmailAndPassword(data.correo, data.pass)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        //lanzar error
        // ...
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Grid container spacing="3">
          <Grid item xs="12">
            <Box display="flex" flexDirection="column" alignItems="center">
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Iniciar Sesión
              </Typography>
            </Box>
          </Grid>

          <Grid item xs="12">
            <Formik
              initialValues={{
                correo: "",
                pass: ""
              }}
              render={({ values, setFieldValue }) => (
                <>
                  <Grid container spacing="2">
                    <Grid item xs="12">
                      <Field
                        name="correo"
                        render={({ field }) => (
                          <TextField
                            variant="outlined"
                            required
                            fullWidth
                            {...field}
                            label="Email"
                            autoComplete="email"
                            autoFocus
                          />
                        )}
                      ></Field>
                    </Grid>{" "}
                    <Grid item xs="12">
                      <Field
                        name="pass"
                        render={({ field }) => (
                          <TextField
                            label="contraseña"
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            {...field}
                            type="password"
                            autoComplete="current-password"
                          />
                        )}
                      ></Field>
                    </Grid>{" "}
                    <Grid item xs="12">
                      <ButtonSTD
                        disabled={values.correo == "" || values.pass == ""}
                        style={{ width: "100%" }}
                        color="primary"
                        onClick={() => {
                          login(values);
                        }}
                      >
                        Ingresar
                      </ButtonSTD>
                    </Grid>
                    <Grid item xs="12">
                      <ButtonSTD
                        style={{ width: "100%" }}
                        onClick={props.signInWithGoogle}
                      >
                        Ingresar con google
                      </ButtonSTD>
                    </Grid>{" "}
                    <Grid item xs="12">
                      <RouterLink to="registrarse">
                        <Link href="#" variant="body2">
                          {"No tienes cuenta? Registrate"}
                        </Link>{" "}
                      </RouterLink>
                    </Grid>
                  </Grid>
                </>
              )}
            />
          </Grid>
          {/* <form className={classes.form} noValidate>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
           
          </Grid>
        </form> */}
        </Grid>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};
export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(SignIn);
