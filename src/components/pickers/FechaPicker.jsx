import React, { Fragment, useState } from "react";
import { KeyboardDatePicker } from "@material-ui/pickers";

import "moment/locale/es";
function FechaPicker(props) {
  return (
    <Fragment>
      <KeyboardDatePicker
        clearable
        locale={"es"}
        variant="inline"
        inputVariant="outlined"
        {...props}
        format="DD/MM/YYYY"
        fullWidth
        autoOk
      />
    </Fragment>
  );
}

export default FechaPicker;
