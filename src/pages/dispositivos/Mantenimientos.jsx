import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { Grid, IconButton, Icon } from "@material-ui/core";
import HeaderPage from "../../components/HeaderPage";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "../inicio/Title";
import Card from "../../components/Card";
import Empty from "../../components/Empty";
import ButtonSTD from "../../components/ButtonSTD";
import { Link } from "react-router-dom";
import { deleteMANTENIMIENTO } from "../../shared/utils/reducers/mantenimiento/Actions";

/****************************************************************************************/
const Mantenimiento = ({
  match: {
    params: { idDispositivo }
  },
  history
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing="2">
        <Grid item xs="12">
          <HeaderPage icon="calendar_today">
            Mantenimientos{" "}
            <IconButton
              onClick={() => {
                history.push("/dispositivos");
              }}
            >
              <Icon>keyboard_arrow_left</Icon>
            </IconButton>
          </HeaderPage>
        </Grid>

        <Grid item xs="12">
          <Card>
            <TablasMantenimiento id={idDispositivo} />
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};
/****************************************************************************************/
/****************************************************************************************/
const useStyles = makeStyles(({}) => ({
  root: {}
}));
export default Mantenimiento;

const TablasMantenimiento = ({ id }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [data, setData] = React.useState([]);

  const mantenimiento = useSelector(state => state.MANTENIMIENTO).data;

  React.useEffect(() => {
    setData(
      mantenimiento
        .filter(item => item.FK_ID_dispositivo == id)
        .map(item => {
          return item;
        })
    );
  }, [mantenimiento]);

  const deteleMantenimiento = id => {
    dispatch(deleteMANTENIMIENTO(id));
  };

  return (
    <React.Fragment>
      <Title>
        <Grid container spacing="2" alignItems="center">
          <Grid item>Mantenimientos de dispositivo</Grid>
          <Grid item>
            {" "}
            <Link to={`/mantenimiento/key=${id}`}>
              <ButtonSTD icon="add" color="primary">
                Nuevo mantenimiento
              </ButtonSTD>
            </Link>
          </Grid>
        </Grid>
      </Title>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>fecha</TableCell>
            <TableCell>comentario</TableCell>

            <TableCell align="right">opciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length < 1 ? (
            <Empty />
          ) : (
            data.map(row => (
              <TableRow key={row.key}>
                <TableCell>{row.fecha}</TableCell>
                <TableCell>{row.comentario}</TableCell>

                <TableCell align="right">
                  <IconButton
                    onClick={() => {
                      deteleMantenimiento(row.key);
                    }}
                    color="secondary"
                  >
                    <Icon>delete</Icon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};
