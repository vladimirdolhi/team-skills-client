import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminRouter from "./AdminRouter";
import EmployeeRouter from "./EmployeeRouter";
import ManagerRouter from "./ManagerRouter";
import Home from "../Home/Home";
import Navbar from "../Navbar/Navbar";
import { Auth } from "../Auth/Auth";
import RoleAccess from "./RoleAcess";
import { useSelector } from "react-redux";

export const Routers = () => {
  return (
    <div>
      <nav className="top-0 z-9999" position="fixed">
        <Navbar />
      </nav>
      {/* <div>
        <Routes>
          <Route exact path="/*" element={<Home />} />
          <Route path="/admin/*" element={<AdminRouter />}></Route>
          <Route path="/manager/*" element={<ManagerRouter />}></Route>
          <Route path="/employee/*" element={<EmployeeRouter />}></Route>
        </Routes>
        <Auth />
      </div> */}
      <div>
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route
            path="/admin/*"
            element={<RoleAccess roles={["ADMIN_ROLE"]} />}
          >
            <Route path="*" element={<AdminRouter />} />
          </Route>
          <Route
            path="/manager/*"
            element={<RoleAccess roles={["MANAGER_ROLE"]} />}
          >
            <Route path="*" element={<ManagerRouter />} />
          </Route>
          <Route
            path="/employee/*"
            element={<RoleAccess roles={["EMPLOYEE_ROLE"]} />}
          >
            <Route path="*" element={<EmployeeRouter />} />
          </Route>
          <Route
            path="/unauthorized"
            element={<div>Unauthorized Access</div>}
          />
        </Routes>
        <Auth />
      </div>
    </div>
  );
};
