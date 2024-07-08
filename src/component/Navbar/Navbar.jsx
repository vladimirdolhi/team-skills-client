import React from "react";
import "./Navbar.css";
import { Avatar, Box, IconButton } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useLocation, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import { store } from "../../State/store";

export const Navbar = () => {
  const { auth } = useSelector((store) => store);
  const navigate = useNavigate();

  const location = useLocation();

  const handleAvatarClick = () => {
    if (auth.user.role === "EMPLOYEE_ROLE") {
      navigate("/employee/profile");
    }
  };

  const isProfilePage = location.pathname === "/employee/profile";

  return (
    <Box
      sx={{ zIndex: 1400 }}
      className="px-5 sticky top-0 z-1400 py-[.8rem] bg-[#e91e63]  lg:px-20
     flex justify-between"
    >
      <div className="flex items-center space-x-4">
        <div
          //onClick={navigateToHome}
          className="lg:mr-10 cursor-pointer flex items-center space-x-4"
        >
          <li className="logo font-semibold text-gray-300 text-2xl">
            TeamSkills
          </li>
        </div>
      </div>

      <div className="flex items-center space-x-2 lg:space-x-10">
        <div className="flex items-center space-x-2">
          {/* {auth.user ? (
            <Avatar sx={{ bgcolor: "white" }}>
              {auth.user?.firstName[0].toUpperCase()}
            </Avatar> //TODO
          ) : (
            <IconButton onClick={() => navigate("/account/login")}>
              <PersonIcon sx={{ fontSize: "2rem" }} />
            </IconButton>
          )} */}
          {auth.user ? (
            !isProfilePage &&
            (auth.user.image ? (
              <Avatar
                src={auth.user.image}
                sx={{ cursor: "pointer", fontSize: "2.5rem" }}
                onClick={handleAvatarClick}
              />
            ) : (
              <Avatar
                sx={{
                  bgcolor: "white",
                  color: "blue",
                  fontSize: "2rem",
                  cursor: "pointer",
                }}
                onClick={handleAvatarClick}
              >
                {auth.user.firstName[0].toUpperCase()}
              </Avatar>
            ))
          ) : (
            <IconButton onClick={() => navigate("/account/login")}>
              <PersonIcon sx={{ fontSize: "2.5rem" }} />
            </IconButton>
          )}
        </div>
      </div>
    </Box>
  );
};

export default Navbar;
