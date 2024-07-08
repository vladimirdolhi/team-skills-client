import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useFormik } from "formik";
import React, { useState } from "react";
import { uploadToCloudinary } from "../../../util/uploadToCloudinary";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useDispatch } from "react-redux";
import { createEvent } from "../../../State/Events/Actions";

const initialValues = {
  name: "",
  image: "",
  description: "",
  location: "",
  start: dayjs(Date.now()),
  finish: dayjs(Date.now()),
};

const CreateEventForm = ({ handleClose }) => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const [uploadImage, setUploadingImage] = useState("");
  const handleSubmit = (values) => {
    console.log("values ----- ", values);
    const reqData = {
      name: values.name,
      image: values.image,
      description: values.description,
      location: values.location,
      start: dayjs(values.start).format("DD-MM-YYYY HH:mm"),
      finish: dayjs(values.finish).format("DD-MM-YYYY HH:mm"),
    };
    dispatch(createEvent({ reqData, jwt }));
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
      <h1 className="text-black-400 text-center text-xl pb-10">Create Event</h1>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Event name"
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
          label="Description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          fullWidth
          multiline
          rows={4}
        />

        <Grid item xs={12}>
          <TextField
            fullWidth
            id="location"
            name="location"
            label="Event location"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.location}
          />
        </Grid>

        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Start"
              inputFormat="MM/dd/yyyy hh:mm a"
              name="start"
              value={formik.values.start}
              onChange={(value) => formik.setFieldValue("start", value, true)}
              slotProps={{ field: { shouldRespectLeadingZeros: true } }}
              fullWidth
              className="w-full"
              sx={{ width: "100%" }}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Finish"
              inputFormat="MM/dd/yyyy hh:mm a"
              name="finish"
              value={formik.values.finish}
              onChange={(value) => formik.setFieldValue("finish", value, true)}
              slotProps={{ field: { shouldRespectLeadingZeros: true } }}
              fullWidth
              className="w-full"
              sx={{ width: "100%" }}
            />
          </LocalizationProvider>
        </Grid>

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
};

export default CreateEventForm;
