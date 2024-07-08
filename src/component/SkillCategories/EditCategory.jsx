import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSkillCategory,
  updateSkillCategory,
} from "../../State/Skills/Action";

const EditCategory = ({ category, handleClose }) => {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  const [formData, setFormData] = useState({
    id: category.id,
    name: category.name,
    description: category.description,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    const data = {
      id: formData.id,
      name: formData.name,
      description: formData.description,
    };
    dispatch(updateSkillCategory({ reqData: data, jwt: auth.jwt || jwt }));
    setFormData({
      id: "",
      name: "",
      description: "",
    });
    handleClose();
  };

  const handleDeleteSubmit = (event) => {
    event.preventDefault();
    dispatch(deleteSkillCategory({ id: formData.id, jwt: auth.jwt || jwt }));
    setFormData({
      id: "",
      name: "",
      description: "",
    });
    handleClose();
  };

  return (
    <div className=" ">
      <div className="p-5">
        <h1 className="text-black-400 text-center text-xl pb-10">
          Edit Skill Category Id = {formData.id}
        </h1>
        <form className="space-y-5">
          <TextField
            label="Category Name"
            name="name"
            value={formData.name}
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
            onClick={handleEditSubmit}
            type="submit"
            variant="contained"
            align="center"
            color="primary"
            fullWidth
          >
            Save
          </Button>
          <Button
            onClick={handleDeleteSubmit}
            type="submit"
            variant="contained"
            align="center"
            color="primary"
            fullWidth
          >
            Remove
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
