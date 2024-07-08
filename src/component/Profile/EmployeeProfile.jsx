import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Modal,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import EditProfile from "./EditProfile";

function EmployeeProfile() {
  const { auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  const [openEditProfile, setOpenEditProfile] = useState(false);
  const handleOpenEditProfile = () => setOpenEditProfile(true);
  const handleCloseEditProfile = () => setOpenEditProfile(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(auth.jwt || jwt));
  }, []);

  if (!auth.user) {
    return (
      <div>
        <CircularProgress />
        Loading...
      </div>
    ); // Or any loading indicator
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
      textAlign="center"
      sx={{ bgcolor: "background.default", p: 3 }}
    >
      {auth.user?.image ? (
        <Avatar
          src={auth.user?.image}
          sx={{ height: "150px", width: "150px" }}
        />
      ) : (
        <Avatar
          sx={{
            height: "150px",
            width: "150px",
            bgcolor: "rgb(250 245 255)",
            color: "blue",
            fontSize: "3.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {auth.user?.firstName[0].toUpperCase()}
        </Avatar>
      )}

      <Typography variant="h4" component="h1" sx={{ py: 2 }}>
        {auth.user.firstName} {auth.user.lastName}
      </Typography>
      <Typography variant="body1" component="p">
        Email: {auth.user.email}
      </Typography>

      {auth.user.skills.length != 0 && (
        <>
          <Typography variant="body1" component="p" sx={{ mt: 2 }}>
            Skills:
          </Typography>
          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
            sx={{ mt: 1 }}
          >
            {auth.user.skills.map((skill) => (
              <Chip
                key={skill.name}
                label={skill.name}
                color="secondary"
                sx={{ m: 0.5 }}
              />
            ))}
          </Box>
        </>
      )}

      {auth.user.bio && (
        <>
          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
            sx={{ mt: 1 }}
          >
            <Typography variant="body1" component="p" sx={{ mt: 2 }}>
              Bio: {auth.user.bio}
            </Typography>
          </Box>
        </>
      )}
      <Divider
        orientation="vertical"
        flexItem
        sx={{ mx: 2, bgcolor: "#1976d2" }}
      />

      <Button
        ariant="contained"
        color="primary"
        sx={{ mt: 3 }}
        onClick={handleOpenEditProfile}
      >
        Edit
      </Button>

      <Modal
        open={openEditProfile}
        onClose={handleCloseEditProfile}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EditProfile
            employee={auth.user}
            handleClose={handleCloseEditProfile}
          />
        </Box>
      </Modal>
    </Box>
  );
}

export default EmployeeProfile;
