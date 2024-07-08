import React from "react";
import { Route, Routes } from "react-router-dom";
import Profile from "../Profile/Profile";

function EmployeeRouter() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/*" element={<Profile />} />
        </Routes>
      </div>
    </>
  );
}

export default EmployeeRouter;
