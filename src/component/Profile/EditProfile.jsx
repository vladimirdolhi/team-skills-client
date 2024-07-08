import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadToCloudinary } from "../../util/uploadToCloudinary";

const EditProfile = ({ employee, handleClose }) => {
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
    const data = {
      id: values.id,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      image: values.image,
      bio: values.bio,
      skills: values.skills,
    };
    dispatch(updateEmployee({ reqData: data, jwt: jwt }));
    dispatch(getUser(jwt));
    handleClose();
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
  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
  });

  return (
    <div>
      <div className="p-5">
        <h1 className="text-black-400 text-center text-xl pb-10">
          Edit Profile
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
            label="Bio"
            name="bio"
            value={formik.values.bio}
            onChange={formik.handleChange}
            fullWidth
            multiline
            rows={4}
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
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
