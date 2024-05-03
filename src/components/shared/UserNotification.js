import { Snackbar, Stack } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import React from "react";
import { useSelector } from "react-redux";
import { dispatchSnackbar } from "../../utils/dispatch";

const Alert = React.forwardRef((props, ref) => {
  return (
    <MuiAlert
      elevation={6}
      ref={ref}
      variant="filled"
      sx={{ width: "100%" }}
      vertical="top"
      horizontal="right"
      {...props}
    />
  );
});

export const UserNotification = () => {
  const toastMessageState = useSelector((state) => state?.snackbar);

  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;

    dispatchSnackbar(null);
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
