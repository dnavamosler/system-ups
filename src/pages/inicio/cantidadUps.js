/* eslint-disable no-script-url */

import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import { useSelector } from "react-redux";
import moment from "moment";
import { Link as RouterLink } from "react-router-dom";
const useStyles = makeStyles({
  depositContext: {
    flex: 1
  }
});

export default function Deposits() {
  const classes = useStyles();

  const dispositivos = useSelector(state => state.DISPOSITIVOS).data;

  return (
    <React.Fragment>
      <Title>UPS registrados</Title>
      <Typography component="p" variant="h4">
        {dispositivos.length}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {` ${moment().format("DD")} de ${moment().format("MMMM, YYYY")} `}
      </Typography>
      <div>
        <RouterLink to="/dispositivos">
          <Link color="primary">ver todos</Link>
        </RouterLink>
      </div>
    </React.Fragment>
  );
}
