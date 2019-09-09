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
import moment from "moment";
import Empty from "../../components/Empty";
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
    let dispositivosSorted = dispositivos.sort((a, b) => {
      const primero = moment(a.fechaInstalacion, "DD/MM/YYYY");
      const segundo = moment(b.fechaInstalacion, "DD/MM/YYYY");

      if (primero.isAfter(segundo)) return -1;
      else if (segundo.isAfter(primero)) return 1;
      else return 0;
    });

    setData(dispositivosSorted.slice(0, 6));
  }, [dispositivos]);

  return (
    <React.Fragment>
      <Title>Ultimos dispositivos registrados</Title>
      {data.length < 1 ? (
        <Empty />
      ) : (
        <>
          {" "}
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Modelo</TableCell>
                <TableCell>Marca</TableCell>
                <TableCell>Fecha de instalación</TableCell>

                <TableCell align="right">Opciones</TableCell>
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
        </>
      )}
    </React.Fragment>
  );
}
