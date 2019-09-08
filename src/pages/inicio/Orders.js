/* eslint-disable no-script-url */

import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import { useSelector } from "react-redux";
import { IconButton, Icon, Link as StyleLink } from "@material-ui/core";
// Generate Order Data

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3)
  }
}));

export default function Orders() {
  const classes = useStyles();

  const [data, setData] = React.useState([]);

  const dispositivos = useSelector(state => state.DISPOSITIVOS).data;

  React.useEffect(() => {
    setData(
      dispositivos.map(item => {
        return item;
      })
    );
  }, [dispositivos]);

  return (
    <React.Fragment>
      <Title>Ultimos dispositivos registrados</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Modelo</TableCell>
            <TableCell>Marca</TableCell>
            <TableCell>Fecha de instalación</TableCell>

            <TableCell align="right">opciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => (
            <TableRow key={row.key}>
              <TableCell>{row.nombre}</TableCell>
              <TableCell>{row.modelo}</TableCell>
              <TableCell>{row.marca}</TableCell>
              <TableCell>{row.fechaInstalacion}</TableCell>

              <TableCell align="right">
                <Link to={`/dispositivos/key=${row.key}`}>
                  <IconButton color="primary">
                    <Icon>visibility</Icon>
                  </IconButton>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link to="/dispositivos">
          <StyleLink color="primary">ver todos</StyleLink>
        </Link>
      </div>
    </React.Fragment>
  );
}
