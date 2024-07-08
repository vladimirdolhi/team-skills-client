import { Autocomplete, Button, TextField } from "@mui/material";
import { useFormik } from "formik";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCourseProgram,
  updateCourseProgram,
} from "../State/Courses/Action";
import { skill } from "../component/Manager/Skills/Skills";

const EditCourseProgram = ({ courseProgram, handleClose }) => {
  const { skills } = useSelector((store) => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const initialValues = {
    id: courseProgram.id,
    name: courseProgram.name,
    description: courseProgram.description,
    skills: courseProgram.skills,
  };

  const handleSubmit = (values) => {
    if (formik.values.button === "save") {
      const data = {
        id: values.id,
        name: values.name,
        description: values.description,
        skills: values.skills,
      };
      dispatch(updateCourseProgram({ reqData: data, jwt: jwt }));
    } else {
      console.log("delete");
      dispatch(deleteCourseProgram({ id: values.id, jwt: jwt }));
    }
    handleClose();
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
  });

  const changeSkills = (e, values) => {
    formik.setFieldValue("skills", values);
    console.log(skills.skills);
    console.log(formik.values.skills);
  };

  const isOptionEqualToValue = (option, value) => {
    return option.id === value.id && option.name === value.name;
  };

  return (
    <div>
      <div className="p-5">
        <h1 className="text-black-400 text-center text-xl pb-10">
          Edit Course Program Id = {formik.values.id}
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
            value={formik.values.skills}
            isOptionEqualToValue={isOptionEqualToValue}
            getOptionLabel={(option) => option.name}
            onChange={changeSkills}
            // value={formik.values.skills}
            renderInput={(params) => (
              <TextField {...params} variant="standard" label="Skills" />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            align="center"
            color="primary"
            fullWidth
            onClick={() => formik.setFieldValue("button", "save")}
          >
            Save
          </Button>

          <Button
            type="submit"
            variant="contained"
            align="center"
            color="primary"
            fullWidth
            onClick={() => formik.setFieldValue("button", "delete")}
          >
            Remove
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditCourseProgram;
