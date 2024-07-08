import { Autocomplete, Button, TextField } from "@mui/material";
import { useFormik } from "formik";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCourseProgram } from "../State/Courses/Action";

const CreateCourseProgram = ({ handleClose }) => {
  const { skills } = useSelector((store) => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const initialValues = {
    name: "",
    description: "",
    skills: [],
  };

  const handleSubmit = (values) => {
    console.log("values ----- ", values);
    const reqData = {
      name: values.name,
      description: values.description,
      skills: values.skills,
    };
    dispatch(createCourseProgram({ reqData, jwt }));
    console.log(reqData);
    handleClose();
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
  });

  const changeSkills = (e, values) => {
    formik.values.skills = values;
    console.log("change");
  };

  return (
    <div>
      <div className="p-5">
        <h1 className="text-black-400 text-center text-xl pb-10">
          Create Course Program
        </h1>
        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <TextField
            label="Course Program Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            fullWidth
          />

          <TextField
            label="Description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            fullWidth
            multiline
            rows={4}
          />

          <Autocomplete
            multiple
            id="tags-standard"
            options={skills.skills}
            getOptionLabel={(option) => option.name}
            onChange={changeSkills}
            // value={formik.values.skills}
            renderInput={(params) => (
              <TextField
                {...params}
                //variant="standard"
                label="Skills"
                //placeholder="Click to add"
              />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            align="center"
            color="primary"
            fullWidth
          >
            Create
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateCourseProgram;
