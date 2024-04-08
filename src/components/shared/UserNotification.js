import { Snackbar, Stack } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { notifyUser } from "../../redux/slice";

const Alert = React.forwardRef((props, ref) => {
  return (
    <MuiAlert
      elevation={6}
      ref={ref}
      variant="filled"
      {...props}
      sx={{ width: "100%" }}
      vertical="top"
      horizontal="right"
    />
  );
});

export const UserNotification = () => {
  const dispatch = useDispatch();
  const toastMessageState = useSelector((state) => state.snackBar);

  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;

    dispatch(notifyUser(null));
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={!!toastMessageState}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={toastMessageState?.severity}>
          {toastMessageState?.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};
