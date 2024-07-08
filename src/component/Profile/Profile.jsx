import React, { useEffect } from "react";
import ProfileNavigation from "./ProfileNavigation";
import { Route, Routes } from "react-router-dom";
import EmployeeProfile from "./EmployeeProfile";
import { getAllSkillCategories, getAllSkills } from "../../State/Skills/Action";
import {
  getAllCoursePrograms,
  getAllCourses,
} from "../../State/Courses/Action";
import { useDispatch } from "react-redux";

const Profile = () => {
  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSkillCategories({ jwt }));
    dispatch(getAllSkills({ jwt }));
    dispatch(getAllCoursePrograms({ jwt }));
    dispatch(getAllEmployees({ jwt }));
    dispatch(getAllCourses({ jwt }));
    dispatch(getAllEvents({ jwt }));
  }, []);
  return (
    <div className="lg:flex justify-between">
      <div>
        <ProfileNavigation />
      </div>
      <div className="lg:w-[80%]">
        <Routes>
          <Route path="/profile" element={<EmployeeProfile />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/mentorship" element={<Courses />} />
          <Route path="/course-programs" element={<CoursePrograms />} />
          <Route path="/events" element={<Events />} />
        </Routes>
      </div>
    </div>
  );
};

export default Profile;
