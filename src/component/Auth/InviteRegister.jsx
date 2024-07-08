import {
  Button,
  Container,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { api } from "../../config/api";
import { useDispatch } from "react-redux";
import { registerUser } from "../../State/Authentication/Action";

const InviteRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();
  const token = query.get("token");

  useEffect(() => {
    const fetchTokenData = async () => {
      try {
        const url = `/auth/invite-token?token=${token}`;
        const res = await api.get(url);
        const data = res.data;
        setInitialValues({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: "",
          role: data.role,
        });
      } catch (error) {
        console.error("Failed to fetch token data", error);
      }
    };

    if (token) {
      fetchTokenData();
    }
  }, [token]);

  const handleSubmit = (values) => {
    console.log("values ----- ", values);
    const reqData = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      role: values.role,
    };
    dispatch(registerUser({ userData: reqData, navigate }));

    //handleClose();
    console.log("Form submitted:", reqData);
  };

  // const formik = useFormik({
  //   initialValues,
  //   onSubmit: handleSubmit,
  //   enableReinitialize,
  // });

  return (
    <div>
      <Typography variant="h5" className="text-center">
        Complete Register
      </Typography>

      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        <Form>
          <Field
            as={TextField}
            variant="outlined"
            margin="normal"
            fullWidth
            label="First Name"
            name="firstName"
            disabled={true}
            id="firstName"
            autoComplete="firstName"
            helperText={<ErrorMessage name="firstName" />}
          />

          <Field
            as={TextField}
            variant="outlined"
            margin="normal"
            fullWidth
            label="Last Name"
            name="lastName"
            disabled={true}
            id="lastName"
            autoComplete="lastName"
            helperText={<ErrorMessage name="lastName" />}
          />

          <Field
            as={TextField}
            variant="outlined"
            margin="normal"
            fullWidth
            label="Email Address"
            name="email"
            disabled={true}
            id="email"
            autoComplete="email"
            helperText={<ErrorMessage name="email" />}
          />
          <Field
            as={TextField}
            variant="outlined"
            margin="normal"
            fullWidth
            label="Password"
            name="password"
            //value={formik.values.lastName}
            type="password"
            id="password"
            helperText={<ErrorMessage name="password" />}
          />
          <Field
            className="mt-3"
            as={Select}
            variant="outlined"
            margin="normal"
            fullWidth
            name="role"
            disabled={true}
            id="role"
            //value={formik.values.role}
            // autoComplete="role"
            helperText={<ErrorMessage name="role" />}
          >
            <MenuItem value="EMPLOYEE_ROLE">Employee</MenuItem>
            <MenuItem value="MANAGER_ROLE">Manager</MenuItem>
          </Field>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
          >
            Register
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default InviteRegister;
