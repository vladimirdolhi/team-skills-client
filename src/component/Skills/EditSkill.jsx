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
import {
  createSkill,
  deleteSkill,
  updateSkill,
} from "../../../State/Skills/Action";

const EditSkill = ({ skill, handleClose }) => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const [uploadImage, setUploadingImage] = useState("");
  const { skills } = useSelector((store) => store);

  const [category, setCategory] = useState(10);

  const initialValues = {
    id: skill.id,
    name: skill.name,
    image: skill.image,
    category: skill.category.id,
    description: skill.description,
  };

  const handleSubmit = (values) => {
    console.log("values ----- ", values);
    if (formik.values.button === "save") {
      const data = {
        id: values.id,
        name: values.name,
        image: values.image,
        skillCategoryId: values.category,
        description: values.description,
      };
      dispatch(updateSkill({ reqData: data, jwt: jwt }));
    } else {
      console.log("delete");
      dispatch(deleteSkill({ id: values.id, jwt: jwt }));
    }
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
        Edit Skill Id = {formik.values.id}
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
                defaultValue={skill.category.id}
                //value={formik.values.category}
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
  );
};

export default EditSkill;
