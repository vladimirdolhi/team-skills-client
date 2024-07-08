import React, { useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { Create, EditNote } from "@mui/icons-material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CreateSkillCategory from "./CreateSkillCategory";
import EditCategory from "./EditCategory";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 90,
  },
  {
    field: "name",
    headerName: "Name",
    width: 200,
  },
  {
    field: "description",
    headerName: "Description",
    width: 1000,
  },
];
export const categories = [
  { id: "1", name: "Backend", description: "Backend technologies" },
  { id: "2", name: "Frontend", description: "Frontend technologies" },
  { id: "3", name: "Version Control", description: "Version control tools" },
  { id: "4", name: "DevOps", description: "DevOps Tools" },
  { id: "5", name: "QA", description: "Quality Assurance tools" },
  {
    id: "6",
    name: "Big Data",
    description: "Big Data processing frameworks and tools",
  },
  {
    id: "7",
    name: "AR/VR",
    description: "Augmented Reality and Virtual Reality technologies",
  },
];

export const style = {
  position: "absolute",
  top: "53%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  boxShadow: 24,
  outline: "none",
  p: 4,
};

const SkillCategories = () => {
  const diapatch = useDispatch();
  const { auth, skills } = useSelector((store) => store);
  const [openCreateCategory, setOpenCreateCategory] = React.useState(false);
  const handleOpenCreateCategory = () => setOpenCreateCategory(true);
  const handleCloseCreateCategory = () => setOpenCreateCategory(false);

  const [openEditCategory, setOpenEditCategory] = React.useState(false);
  const handleOpenEditCategory = () => setOpenEditCategory(true);
  const handleCloseEditCategory = () => setOpenEditCategory(false);

  const [selectedRow, setSelectedRow] = useState(null);
  const handleRowClick = (params) => {
    setSelectedRow(params.row);
    handleOpenEditCategory();
  };

  return (
    <Box sx={{ height: "auto", width: 1 }}>
      <CardHeader
        title={"Skill Categories"}
        sx={{
          pt: 2,
          alignItems: "center",
          "& .MuiCardHeader-action": { mt: 0.6 },
        }}
        action={
          <IconButton onClick={handleOpenCreateCategory}>
            {" "}
            <Create />
          </IconButton>
        }
      />
      <DataGrid
        rows={skills.categories}
        onRowClick={handleRowClick}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        columns={columns}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
      />
      <Modal
        open={openCreateCategory}
        onClose={handleCloseCreateCategory}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateSkillCategory handleClose={handleCloseCreateCategory} />
        </Box>
      </Modal>
      <Modal
        open={openEditCategory}
        onClose={handleCloseEditCategory}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EditCategory
            category={selectedRow}
            handleClose={handleCloseEditCategory}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default SkillCategories;
