import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  TextField,
  CircularProgress,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Autocomplete from "@mui/material/Autocomplete";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadToCloudinary } from "../../util/uploadToCloudinary";
import { deleteEmployee, updateEmployee } from "../../State/Employees/Action";

const EditEmployee = ({ employee, handleClose }) => {
  const { skills } = useSelector((store) => store);
  const [uploadImage, setUploadingImage] = useState("");

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const initialValues = {
    id: employee.id,
    firstName: employee.firstName,
    lastName: employee.lastName,
    email: employee.email,
    image: employee.image,
    bio: employee.bio,
    skills: employee.skills,
  };

  const handleSubmit = (values) => {
    if (formik.values.button === "save") {
      const data = {
        id: values.id,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        image: values.image,
        bio: values.bio,
        description: values.description,
        skills: values.skills,
      };
      dispatch(updateEmployee({ reqData: data, jwt: jwt }));
    } else {
      console.log("delete");
      dispatch(deleteEmployee({ id: values.id, jwt: jwt }));
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

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setUploadingImage(true);
    const image = await uploadToCloudinary(file);
    formik.setFieldValue("image", image);
    setUploadingImage(false);
  };

  const handleRemoveImage = (e) => {
    formik.setFieldValue("image", null);
  };

  return (
    <div className=" ">
      <div className="p-5">
        <h1 className="text-black-400 text-center text-xl pb-10">
          Edit Employee Id = {formik.values.id}
        </h1>
        <form className="space-y-5" onSubmit={formik.handleSubmit}>
          <Grid className="flex flex-wrap gap-5" item xs={12}>
            {!formik.values.image && (
              <input
                type="file"
                accept="image/*"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            )}

            <label className="relative" htmlFor="fileInput">
              {!formik.values.image && (
                <span className="w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-600">
                  <AddPhotoAlternateIcon className="text-white" />
                </span>
              )}
              {uploadImage && (
                <div className="absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center">
                  <CircularProgress />
                </div>
              )}
            </label>

            <div className="flex flex-wrap gap-2">
              {formik.values.image && (
                <div className="relative">
                  <img
                    className="w-24 h-24 object-cover"
                    //key={}
                    src={formik.values.image}
                    alt={`ProductImage`}
                  />
                  <IconButton
                    onClick={() => handleRemoveImage()}
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      outline: "none",
                    }}
                  >
                    <CloseIcon sx={{ fontSize: "1rem" }} />
                  </IconButton>
                </div>
              )}
            </div>
          </Grid>

          <TextField
            label="First Name"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            fullWidth
          />

          <TextField
            label="Last Name"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            fullWidth
          />

          <TextField
            label="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            fullWidth
          />

          <TextField
            label="Bio"
            name="bio"
            value={formik.values.bio}
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

export default EditEmployee;
