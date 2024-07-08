import React from "react";
import BadgeIcon from "@mui/icons-material/Badge";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import SchoolIcon from "@mui/icons-material/School";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import CategoryIcon from "@mui/icons-material/Category";
import EventIcon from "@mui/icons-material/Event";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Divider, Drawer, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../State/Authentication/Action";

const menu = [
  { title: "Employees", icon: <BadgeIcon />, path: "employees" },
  { title: "Courses", icon: <FormatListBulletedIcon />, path: "courses" },
  { title: "Course programs", icon: <SchoolIcon />, path: "course-programs" },
  { title: "Skills", icon: <TipsAndUpdatesIcon />, path: "skills" },
  {
    title: "Skill categories",
    icon: <CategoryIcon />,
    path: "skill-categories",
  },
  { title: "Events", icon: <EventIcon />, path: "events" },
  { title: "Accounts", icon: <ManageAccountsIcon />, path: "accounts" },

  { title: "Logout", icon: <LogoutIcon />, path: "" },
];

const AdminNavigation = ({ open, handleClose }) => {
  const isSmallScreen = useMediaQuery("(max-width:1080px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigate = (item) => {
    navigate(`/admin/${item.path}`);

    if (item.title === "Logout") {
      navigate("/");
      dispatch(logout());
    }

    handleClose();
  };

  return (
    <div className=" ">
      <>
        <Drawer
          sx={{ zIndex: 1 }}
          anchor={"left"}
          //open={open}
          onClose={handleClose}
          variant={isSmallScreen ? "temporary" : "permanent"}
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
      </>
    </div>
  );
};

export default AdminNavigation;
