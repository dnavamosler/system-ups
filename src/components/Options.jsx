import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popper from "@material-ui/core/Popper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import { Grid, IconButton, Icon } from "@material-ui/core";

export default function OptionButton({ options }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  }

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  return (
    <Grid container>
      <Grid item xs={12} align="center">
        <IconButton onClick={handleClick}>
          <Icon>more_vert</Icon>
        </IconButton>

        <Popper id={id} open={open} anchorEl={anchorEl} transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper style={{ padding: 20 }}>{options}</Paper>
            </Fade>
          )}
        </Popper>
      </Grid>
    </Grid>
  );
}
