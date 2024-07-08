import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSkillCategory } from "../../State/Skills/Action";

const CreateSkillCategory = ({ handleClose }) => {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  const [formData, setFormData] = useState({
    categoryName: "",
    description: "",
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: formData.categoryName,
      description: formData.description,
    };
    dispatch(createSkillCategory({ reqData: data, jwt: auth.jwt || jwt }));
    setFormData({
      name: "",
      description: "",
    });
    handleClose();
    console.log("Form submitted:", formData);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className=" ">
      <div className="p-5">
        <h1 className="text-black-400 text-center text-xl pb-10">
          Create Skill Category
        </h1>
        <form className="space-y-5" onSubmit={handleFormSubmit}>
          <TextField
            label="Category Name"
            name="categoryName"
            value={formData.categoryName}
            onChange={handleInputChange}
            fullWidth
          />

          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
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
    </div>
  );
};

export default CreateSkillCategory;
