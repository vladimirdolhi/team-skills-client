import { Button, MenuItem, Select, TextField, Typography } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../State/Authentication/Action";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  role: "ROLE_CUSTOMER",
};

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    console.log("Form values:", values);
    dispatch(registerUser({ userData: values, navigate }));
  };

  return (
    <div>
      <Typography variant="h5" className="text-center">
        Register
      </Typography>

      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <Form>
          <Field
            as={TextField}
            variant="outlined"
            margin="normal"
            fullWidth
            label="First Name"
            name="firstName"
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
            id="role"
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
