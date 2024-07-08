import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { api } from "../../../config/api";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  role: "",
};

const InviteLinkForm = ({ handleClose, roles }) => {
  const jwt = localStorage.getItem("jwt");
  const handleSubmit = async (values) => {
    console.log("values ----- ", values);
    const reqData = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      role: values.role,
    };

    try {
      const res = await api.post(`/api/user/invite-link`, reqData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log(reqData);
      handleClose();
    } catch (error) {
      console.error("Failed to send invite link", error);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
  });

  return (
    <div className=" ">
      <div className="p-5">
        <h1 className="text-black-400 text-center text-xl pb-10">
          Send Invite Link
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

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="role">Role</InputLabel>
              <Select
                id="role"
                name="role"
                label="Role"
                onChange={formik.handleChange}
                value={formik.values.category}
              >
                {Object.entries(roles).map(([key, value]) => (
                  <MenuItem key={key} value={key}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Button
            type="submit"
            variant="contained"
            align="center"
            color="primary"
            fullWidth
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default InviteLinkForm;
