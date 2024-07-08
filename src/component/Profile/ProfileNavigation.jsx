import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SchoolIcon from "@mui/icons-material/School";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GroupIcon from "@mui/icons-material/Group";
import EventIcon from "@mui/icons-material/Event";
import { Divider, Drawer, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const menu = [
  { title: "Profile", icon: <AccountCircleIcon />, path: "profile" },
  { title: "My courses", icon: <AssignmentIcon />, path: "courses" },
  { title: "Mentorship", icon: <GroupIcon />, path: "mentorship" },
  { title: "Course programs", icon: <SchoolIcon />, path: "course-programs" },
  { title: "Events", icon: <EventIcon />, path: "events" },
  { title: "Logout", icon: <LogoutIcon /> },
];

export const ProfileNavigation = ({ open, handleClose }) => {
  const isSmallScreen = useMediaQuery("(max-width:1080px)");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleNavigate = (item) => {
    navigate(`/employee/${item.path}`);

    if (item.title.toLowerCase() === "logout") {
      handleLogout();
      navigate("/");
      return;
    }
  };

  return (
    <div>
      <Drawer
        sx={{ zIndex: 10 }}
        anchor={"left"}
        open={open}
        onClose={handleClose}
        variant={isSmallScreen ? "temporary" : "permanent"}
        // variant="persistent"
      >
        <div className="w-[50vw] lg:w-[20vw] h-[100vh] flex justify-start flex-col text-xl space-y-8 pt-16 mt-12">
          {menu.map((item, i) => (
            <>
              <div
                onClick={() => handleNavigate(item)}
                className="px-5 flex items-center space-x-5 cursor-pointer"
              >
                {item.icon}
                <span>{item.title}</span>
              </div>
              {i !== menu.length - 1 && <Divider />}
            </>
          ))}
        </div>
      </Drawer>
    </div>
  );
};

export default ProfileNavigation;
