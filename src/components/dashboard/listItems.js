import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";

import AssignmentIcon from "@material-ui/icons/Assignment";
import { Link } from "react-router-dom";
import { Icon } from "@material-ui/core";

const ItemMenu = ({ children, icon = "", link }) => {
  return (
    <Link to={link}>
      <ListItem button>
        <ListItemIcon>
          <Icon>{icon}</Icon>
        </ListItemIcon>
        <ListItemText primary={children} />
      </ListItem>
    </Link>
  );
};

export const mainListItems = (
  <div>
    <ItemMenu link="/" icon="dashboard">
      Inicio
    </ItemMenu>
    <ItemMenu link="/dispositivos" icon="devices">
      Dispositivos
    </ItemMenu>
    <ItemMenu
      link="/acerca_de"
      icon="assignment
"
    >
      Acerca de
    </ItemMenu>
  </div>
);

export const secondaryListItems = (
  <div>
    {/* <ListSubheader inset>Otros</ListSubheader> */}

    {/* <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem> */}
  </div>
);
