import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";

import Container from "@material-ui/core/Container";
import Logo from "../../shared/images/logo.png";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import { mainListItems, secondaryListItems } from "./listItems";
//redux and firebase
import { useDispatch } from "react-redux";
import firebase from "firebase";
import { firebaseConfig } from "../../config/firebase";
import { getDISPOSITIVOS } from "../../shared/utils/reducers/dispositivos/Actions";
import { getUBICACION } from "../../shared/utils/reducers/ubicacion/Actions";
import { getSALA } from "../../shared/utils/reducers/sala/Actions";
//NOTIFICATIONS
import { ToastProvider } from "react-toast-notifications";
import { getEQUIPOS_RESPALDO } from "../../shared/utils/reducers/equiposRespaldo/Actions";
import { getMANTENIMIENTO } from "../../shared/utils/reducers/mantenimiento/Actions";
import { getCONFIGURACION } from "../../shared/utils/reducers/configuracion/Actions";
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: 20,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  }
}));

const Dashboard = ({ children }) => {
  const dispatch = useDispatch();

  //*** INICIALIZACION DE FIREBASE */
  React.useEffect(() => {
    firebase.initializeApp(firebaseConfig);

    dispatch(getDISPOSITIVOS());
    dispatch(getUBICACION());
    dispatch(getSALA());
    dispatch(getEQUIPOS_RESPALDO());
    dispatch(getMANTENIMIENTO());
    dispatch(getCONFIGURACION());
  }, []);

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <img
            src={Logo}
            height="45px"
            alt="logo"
            style={{
              marginLeft: !open ? 80 : 0,
              marginRight: 20,
              transition: ".3s"
            }}
          />
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            MONITOR UPS
          </Typography>
          {/* <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton
            onClick={() => {
              setOpen(!open);
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <ToastProvider>{children} </ToastProvider>
        </Container>
      </main>
    </div>
  );
};
export default Dashboard;
