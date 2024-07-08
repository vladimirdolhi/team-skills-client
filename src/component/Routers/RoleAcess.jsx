import { CircularProgress } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const RoleAccess = ({ roles = [] }) => {
  const { auth } = useSelector((store) => store);

  if (!auth.user) {
    return (
      <div>
        <CircularProgress />
        Loading...
      </div>
    );
  }

  const role = auth.user.role;

  return roles.includes(role) ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" replace />
  );
};

export default RoleAccess;
