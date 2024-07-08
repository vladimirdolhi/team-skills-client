import { Alert, Box, Modal, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RegisterForm } from "./RegisterForm";
import { LoginForm } from "./LoginForm";
import InviteRegister from "./InviteRegister";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  outline: "none",
  p: 4,
};

export const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const { auth } = useSelector((store) => store);

  useEffect(() => {
    if (auth.success || auth.error) setOpenSnackBar(true);
  }, [auth.success, auth.error]);

  const handleCloseSnackBar = () => {
    setOpenSnackBar(false);
  };

  const handleOnClose = () => {
    navigate("/");
  };
  return (
    <>
      <Modal
        onClose={handleOnClose}
        open={
          location.pathname === "/account/register" ||
          location.pathname === "/account/login" ||
          location.pathname === "/account/invite-register"
        }
      >
        <Box sx={style}>
          {location.pathname === "/account/register" ? (
            <RegisterForm />
          ) : location.pathname === "/account/login" ? (
            <LoginForm />
          ) : location.pathname === "/account/invite-register" ? (
            <InviteRegister />
          ) : null}
        </Box>
      </Modal>
      <Snackbar
        sx={{ zIndex: 9999 }}
        open={openSnackBar}
        autoHideDuration={3000}
        onClose={handleCloseSnackBar}
        //onClose={handleCloseSnackBar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }} // Updated to bottom right

        //anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={auth.error ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {auth.success || auth.error}
        </Alert>
      </Snackbar>
    </>
  );
};
