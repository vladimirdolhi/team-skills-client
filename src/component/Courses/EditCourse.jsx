import {
  Autocomplete,
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { deleteCourse, updateCourse } from "../../State/Courses/Action";

const EditCourse = ({ course, isMentorshipTab, handleClose }) => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const { skills, courses, employees } = useSelector((store) => store);
  const handleSubmit = (values) => {
    if (formik.values.button === "save") {
      const data = {
        id: course.id,
        courseProgramId: values.courseProgramId,
        menteeId: values.menteeId,
        mentorId: values.mentorId,
        startDate: dayjs(values.startDate).format("DD-MM-YYYY"),
        endDate: dayjs(values.endDate).format("DD-MM-YYYY"),
        status: values.status,
      };
      console.log(data);
      dispatch(updateCourse({ reqData: data, jwt: jwt }));
    } else {
      console.log("delete");
      dispatch(deleteCourse({ id: values.id, jwt: jwt }));
    }
    handleClose();
  };

  const initialValues = {
    id: course.id,
    courseProgramId: course.courseProgram.id,
    menteeId: course.mentee.id,
    mentorId: course.mentor.id,
    startDate: dayjs(course.start),
    endDate: dayjs(course.finish),
    status: course.status,
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
  });

  const filteredMentors = employees.employees.filter(
    (employee) => employee.id !== course.mentee.id
  );

  const isOptionEqualToValue = (option, value) => {
    return option.id === value.id && option.firstName === value.firstName;
  };

  const isPlanned = course.status === "PLANNED";
  const isInProgress = course.status === "IN_PROGRESS";
  const isCompleted = course.status === "COMPLETED";

  const statusLabels = {
    PLANNED: "Planned",
    IN_PROGRESS: "In progress",
    COMPLETED: "Completed",
  };

  const getStatusOptionTransition = (currentStatus) => {
    if (currentStatus === "PLANNED") {
      return "IN_PROGRESS";
    } else if (currentStatus === "IN_PROGRESS") {
      return "COMPLETED";
    } else {
      return "";
    }
  };

  const chipStyles = {
    color: "white !important",
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
  };

  const containerStyles = {
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "auto",
  };

  const statusChipRender = (status) => {
    return (
      <Box sx={containerStyles}>
        <Chip
          sx={chipStyles}
          label={statusLabels[status]}
          color={
            status === "IN_PROGRESS"
              ? "info"
              : status === "COMPLETED"
              ? "success"
              : "warning"
          }
          className="text-white"
        />
      </Box>
    );
  };

  const statusRender = (status) => {
    return <Box sx={containerStyles}>{statusLabels[status]}</Box>;
  };

  return (
    <div className="">
      <h1 className="text-black-400 text-center text-xl pb-10">Course</h1>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <Grid item xs={6}>
          <FormControl fullWidth variant="outlined" disabled>
            <InputLabel htmlFor="mentee">Mentee</InputLabel>
            <Select
              id="mentee"
              name="mentee"
              label="Mentee"
              defaultValue={course.mentee}
            >
              <MenuItem value={course.mentee}>
                {course.mentee.firstName} {course.mentee.lastName}
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              isOptionEqualToValue={isOptionEqualToValue}
              options={filteredMentors}
              getOptionLabel={(option) =>
                `${option.firstName} ${option.lastName}`
              }
              defaultValue={course.mentor}
              onChange={(event, value) =>
                formik.setFieldValue("mentorId", value.id)
              }
              disabled={isCompleted || isMentorshipTab}
              sx={{ width: "100%" }}
              renderInput={(params) => <TextField {...params} label="Mentor" />}
            />
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth variant="outlined" disabled>
            <InputLabel htmlFor="courseProgram">Course Program</InputLabel>
            <Select
              id="courseProgram"
              name="courseProgram"
              label="Course Program"
              value={course.courseProgram}
            >
              <MenuItem value={course.courseProgram}>
                {course.courseProgram.name}
              </MenuItem>
            </Select>
          </FormControl>
          <div className="justify-center">
            <div className="mt-2">
              {course.courseProgram.skills.map((skill) => (
                <Chip
                  key={skill.id}
                  label={skill.name}
                  color="secondary"
                  className="mr-1"
                />
              ))}
            </div>
          </div>
        </Grid>

        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start date"
              format="D/M/YYYY"
              name="startDate"
              value={formik.values.startDate}
              onChange={(value) =>
                formik.setFieldValue("startDate", value, true)
              }
              slotProps={{ field: { shouldRespectLeadingZeros: true } }}
              disabled={!isPlanned}
              fullWidth
              className="w-full"
              sx={{ width: "100%" }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="End date"
              format="D/M/YYYY"
              name="endDate"
              value={formik.values.endDate}
              onChange={(value) => formik.setFieldValue("endDate", value, true)}
              slotProps={{ field: { shouldRespectLeadingZeros: true } }}
              disabled={isCompleted}
              fullWidth
              className="w-full"
              sx={{ width: "100%" }}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="status">Status</InputLabel>
            <Select
              id="status"
              name="status"
              label="Status"
              value={formik.values.status}
              //isOptionEqualToValue={isStatusOptionEqualToValue}
              onChange={(event) =>
                formik.setFieldValue("status", event.target.value, true)
              }
              disabled={isCompleted}
              renderValue={(value) => statusChipRender(value)}
            >
              {formik.values.status === course.status && (
                <MenuItem
                  key={getStatusOptionTransition(course.status)}
                  value={getStatusOptionTransition(course.status)}
                >
                  {statusChipRender(getStatusOptionTransition(course.status))}
                </MenuItem>
              )}
              {formik.values.status !== course.status && (
                <MenuItem key={course.status} value={course.status}>
                  {statusChipRender(course.status)}
                </MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>

        {!isCompleted && (
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
        )}

        {!isCompleted && (
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
        )}
      </form>
    </div>
  );
};

export default EditCourse;
