import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  CircularProgress,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

import { useFormik } from "formik";
import React, { useState } from "react";
import { uploadToCloudinary } from "../../../util/uploadToCloudinary";
import { useDispatch, useSelector } from "react-redux";
import { createSkill } from "../../../State/Skills/Action";

const initialValues = {
  name: "",
  image: "",
  category: "",
  description: "",
};

function CreateSkill({ handleClose }) {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const [uploadImage, setUploadingImage] = useState("");
  const { skills } = useSelector((store) => store);

  const handleSubmit = (values) => {
    console.log("values ----- ", values);
    const reqData = {
      name: values.name,
      image: values.image,
      skillCategoryId: values.category,
      description: values.description,
    };
    dispatch(createSkill({ reqData, jwt }));
    console.log(reqData);
    handleClose();
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
  });
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
    <div className="">
      <h1 className="text-black-400 text-center text-xl pb-10">
        Add New Skill
      </h1>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Skill name"
              variant="outlined"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </Grid>

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

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="categoryId">Skill Category</InputLabel>
              <Select
                id="category"
                name="category"
                label="Skill Category"
                onChange={formik.handleChange}
                value={formik.values.category}
              >
                {skills.categories.map((item) => (
                  <MenuItem value={item.id}>{item.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <TextField
          label="Description"
          name="description"
          value={formik.values.description}
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
        >
          Create
        </Button>
      </form>
    </div>
  );
}

export default CreateSkill;
