import React from "react";
import Dashboard from "../../components/dashboard/Dashboard";
import { useSelector } from "react-redux";
import { Grid, Paper, Box } from "@material-ui/core";

//dependencies

import CantidadUps from "./cantidadUps";
import Orders from "./Orders";
import BarChart from "../../components/BarChart";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import Title from "./Title";
import moment from "moment";
import ListaMantenimientosPendientes from "./ListaMantenimientosPendientes";

const Inicio = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const mantenimientos = useSelector(state => state.MANTENIMIENTO).data;

  const [dataMantenimiento, setDataMantenimiento] = React.useState([]);

  React.useEffect(() => {
    try {
      let data_final = [];

      mantenimientos.forEach(item => {
        const data = {
          name: moment()
            .month(item.fecha.split("/")[1] - 1)
            .format("MMMM")
        };

        if (data_final.find(item2 => data.name == item2.name)) {
          data_final = data_final.map(item3 => {
            if (item3.name == data.name)
              return {
                ...item3,
                mantenimiento: item3.mantenimiento + 1
              };
            else return item3;
          });
        } else {
          data_final = [...data_final, { ...data, mantenimiento: 1 }];
        }
      });
      setDataMantenimiento(data_final);
    } catch (error) {
      console.log(error);
    }
  }, [mantenimientos]);

  return (
    <Grid container spacing={3}>
      {/* Chart */}
      <Grid item xs={12} md={8} lg={9}>
        <Paper
          style={{
            padding: 20
          }}
        >
          <Grid container spacing="3">
            <Grid item xs="12" md="6">
              <Box
                display="flex"
                justifyContent="center"
                flexDirection="column"
                alignItems="center"
              >
                <Title>Mantenimientos realizados</Title>
                <BarChart data={dataMantenimiento} label="mantenimiento" />
              </Box>
            </Grid>
            <Grid item xs="12" md="6">
              {/* <Chart /> */}
              <Box
                display="flex"
                justifyContent="center"
                flexDirection="column"
                alignItems="center"
              >
                <Title>Mantenimientos pendientes</Title>
                <ListaMantenimientosPendientes />
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      {/* Recent cantidadUps */}
      <Grid item xs={12} md={4} lg={3}>
        <Paper className={fixedHeightPaper}>
          <CantidadUps />
        </Paper>
      </Grid>
      {/* Recent Orders */}
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Orders />
        </Paper>
      </Grid>
    </Grid>
  );
};
export default Inicio;

const useStyles = makeStyles(() => ({
  paper: {
    padding: 20,
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  }
}));
