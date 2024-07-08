import React from "react";
import { Route, Routes } from "react-router-dom";
import Manager from "../Manager/Manager";
import Navbar from "../Navbar/Navbar";

function ManagerRouter() {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<Manager />}></Route>
      </Routes>
    </div>
  );
}

export default ManagerRouter;
