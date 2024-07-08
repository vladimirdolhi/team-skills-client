import {
  Autocomplete,
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
import { createCourse } from "../../State/Courses/Action";

const initialValues = {
  courseProgramId: "",
  menteeId: "",
  mentorId: "",
  startDate: dayjs(Date.now()),
  endDate: dayjs(Date.now()),
};

const CreateCourse = ({ handleClose }) => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const { skills, courses, employees } = useSelector((store) => store);

  const [selectedEmployees, setSelectedEmployees] = useState({
    mentee: null,
    mentor: null,
  });

  const [selectedCourseProgram, setSelectedCourseProgram] = useState(null);

  const handleCourseProgramChange = (event) => {
    formik.handleChange(event); //
    setSelectedCourseProgram(event.target.value);
  };

  const handleEmployeeChange = (type, newValue) => {
    setSelectedEmployees({
      ...selectedEmployees,
      [type]: newValue,
    });
    formik.setFieldValue(type, newValue);
  };

  const filteredEmployees = employees.employees.filter(
    (employee) =>
      employee.id !== selectedEmployees.mentee?.id &&
      employee.id !== selectedEmployees.mentor?.id
  );

  const handleSubmit = (values) => {
    console.log("values ----- ", values);
    const reqData = {
      courseProgramId: values.courseProgram.id,
      menteeId: values.mentee.id,
      mentorId: values.mentor.id,
      startDate: dayjs(values.startDate).format("DD-MM-YYYY"),
      endDate: dayjs(values.endDate).format("DD-MM-YYYY"),
    };
    dispatch(createCourse({ reqData, jwt }));
    console.log(reqData);
    handleClose();
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
  });

  const isOptionEqualToValue = (option, value) => {
    return option.id === value.id && option.firstName === value.firstName;
  };

  return (
    <div className="">
      <h1 className="text-black-400 text-center text-xl pb-10">
        Create Course
      </h1>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="courseProgram">Course Program</InputLabel>
            <Select
              id="courseProgram"
              name="courseProgram"
              label="Course Program"
              onChange={handleCourseProgramChange}
              value={formik.values.courseProgram}
            >
              {courses.coursePrograms.map((item) => (
                <MenuItem value={item}>{item.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <div className="justify-center">
            {selectedCourseProgram && (
              <div className="mt-2">
                {selectedCourseProgram.skills.map((skill) => (
                  <Chip
                    key={skill.id}
                    label={skill.name}
                    color="secondary"
                    className="mr-1"
                  />
                ))}
              </div>
            )}
          </div>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              isOptionEqualToValue={isOptionEqualToValue}
              options={filteredEmployees}
              getOptionLabel={(option) => {
                return option.firstName + " " + option.lastName;
              }}
              onChange={(event, newValue) =>
                handleEmployeeChange("mentee", newValue)
              }
              sx={{ width: "100%" }}
              renderInput={(params) => <TextField {...params} label="Mentee" />}
            />
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              isOptionEqualToValue={isOptionEqualToValue}
              options={filteredEmployees}
              onChange={(event, newValue) =>
                handleEmployeeChange("mentor", newValue)
              }
              getOptionLabel={(option) => {
                return option.firstName + " " + option.lastName;
              }}
              sx={{ width: "100%" }}
              renderInput={(params) => <TextField {...params} label="Mentor" />}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start date"
              format="D/M/YYYY"
              //defaultValue={dayjs("2022-04-17")}
              name="startDate"
              value={formik.values.startDate}
              onChange={(value) =>
                formik.setFieldValue("startDate", value, true)
              }
              slotProps={{ field: { shouldRespectLeadingZeros: true } }}
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

export default CreateCourse;
