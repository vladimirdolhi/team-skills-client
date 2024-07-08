import {
  Button,
  Container,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../State/Authentication/Action";
import * as Yup from "yup";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { skills } = useSelector((store) => store);

  const handleSubmit = (values) => {
    console.log("Form values:", values);
    dispatch(loginUser({ userData: values, navigate }));
  };

  return (
    <Container component="main" maxWidth="xs">
      {/* <CssBaseline /> */}
      <div>
        <Typography className="text-center" variant="h5">
          Login
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
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
              autoComplete="current-password"
              helperText={<ErrorMessage name="password" />}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2, padding: "1rem" }}
              helperText
            >
              Login
            </Button>
          </Form>
        </Formik>
        {/* <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          Don't have an account?{" "}
          <Button onClick={() => navigate("/account/register")}>
            Register
          </Button>
        </Typography> */}
      </div>
    </Container>
  );
};
