import React, { useEffect } from "react";
import ManagerNavigation from "./ManagerNavigation";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllSkillCategories, getAllSkills } from "../../State/Skills/Action";
import {
  getAllCoursePrograms,
  getAllCourses,
} from "../../State/Courses/Action";
import { getAllEmployees } from "../../State/Employees/Action";
import { getAllEvents } from "../../State/Events/Actions";
import Employees from "../Employees/Employees";

const Manager = () => {
  const dispatch = useDispatch();
  const handleClose = () => {};
  const jwt = localStorage.getItem("jwt");
  useEffect(() => {
    dispatch(getAllSkillCategories({ jwt }));
    dispatch(getAllSkills({ jwt }));
    dispatch(getAllCoursePrograms({ jwt }));
    dispatch(getAllEmployees({ jwt }));
    dispatch(getAllCourses({ jwt }));
    dispatch(getAllEvents({ jwt }));
  }, []);
  return (
    <div>
      <div className="lg:flex justify-between">
        <div className="">
          <ManagerNavigation handleClose={handleClose} />
        </div>
        <div className="lg:w-[80%]">
          <Routes>
            <Route path="/employees" element={<Employees />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course-programs" element={<CoursePrograms />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/skill-categories" element={<SkillCategories />} />
            <Route path="/events" element={<Events />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Manager;
