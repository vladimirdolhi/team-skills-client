import React from "react";
import "./Home.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const navigate = useNavigate();
  const { auth } = useSelector((store) => store);

  const handleStartClick = () => {
    if (auth.user?.role === "EMPLOYEE_ROLE") {
      navigate("/employee/profile");
    } else if (auth.user?.role === "MANAGER_ROLE") {
      navigate("/manager/courses");
    } else if (auth.user?.role === "ADMIN_ROLE") {
      navigate("/admin/courses");
    } else {
      navigate("/account/login");
    }
  };

  return (
    <div className="">
      <section className="banner relative flex flex-col justify-center items-center">
        <div className="w-[50vw] z-20 text-center">
          <p className="z-20 text-gray-300 text-xl lg:text-4xl mb-4">
            Empower Your Team, Unleash The Potential: Welcome to TeamSkills!
          </p>
          <Button
            variant="contained"
            size="medium"
            className="transition"
            onClick={handleStartClick}
          >
            Start
          </Button>
        </div>

        <div className="cover absolute top-0 left-0 right-0" />
        <div className="fadout"></div>
      </section>
    </div>
  );
};

export default Home;
