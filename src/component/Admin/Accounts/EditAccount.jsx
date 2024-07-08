import { Button, FormControlLabel, Switch, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";

const EditAccount = ({ account, handleClose }) => {
  const initialValues = {
    id: account.id,
    firstName: account.firstName,
    lastName: account.lastName,
    email: account.email,
    active: account.active,
  };

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const label = { inputProps: { "aria-label": "Switch demo" } };

  const handleSubmit = (values) => {
    const data = {
      id: values.id,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      active: values.active,
    };
    dispatch(updateAccount({ reqData: data, role: account.role, jwt: jwt }));
    handleClose();
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
  });

  return (
    <div>
      <div className="p-5">
        <h1 className="text-black-400 text-center text-xl pb-10">
          Edit Account Id = {formik.values.id}
        </h1>
        <form className="space-y-5" onSubmit={formik.handleSubmit}>
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

          <FormControlLabel
            control={
              <Switch
                checked={formik.values.active}
                onChange={(e) =>
                  formik.setFieldValue("active", e.target.checked)
                }
              />
            }
            label="Is Active"
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
          {/* <Button
            type="submit"
            variant="contained"
            align="center"
            color="primary"
            fullWidth
            onClick={() => formik.setFieldValue("button", "delete")}
          >
            Remove
          </Button> */}
        </form>
      </div>
    </div>
  );
};

export default EditAccount;
