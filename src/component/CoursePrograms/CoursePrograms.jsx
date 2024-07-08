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
  Chip,
  TableHead,
  TableRow,
} from "@mui/material";
import { Create, EditNote } from "@mui/icons-material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { style } from "../component/Manager/SkillCategories/SkillCategories";
import { useSelector } from "react-redux";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import CreateCourseProgram from "./CreateCourseProgram";
import EditCourseProgram from "./EditCourseProgram";

const skillsCellRender = (data) => {
  return (
    <div>
      {data.value.map((courseProgram) => (
        <Chip
          label={courseProgram.name}
          color="secondary"
          style={{ margin: "1.5px" }}
        />
      ))}
    </div>
  );
};

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 90,
  },
  {
    field: "name",
    headerName: "Name",
    width: 250,
  },
  {
    field: "description",
    headerName: "Description",
    width: 500,
  },
  {
    field: "skills",
    headerName: "Skills",
    renderCell: skillsCellRender,
    width: 500,
  },
];

const CoursePrograms = () => {
  const { courses } = useSelector((store) => store);

  const [openCreateCourseProgram, setOpenCreateCourseProgram] = useState(false);
  const handleOpenCreateCourseProgram = () => setOpenCreateCourseProgram(true);
  const handleCloseCreateCourseProgram = () =>
    setOpenCreateCourseProgram(false);

  const [openEditCourseProgram, setOpenEditCourseProgram] = useState(false);
  const handleOpenEditCourseProgram = () => setOpenEditCourseProgram(true);
  const handleCloseEditCourseProgram = () => setOpenEditCourseProgram(false);

  const [selectedRow, setSelectedRow] = useState(null);
  const handleRowClick = (params) => {
    setSelectedRow(params.row);
    handleOpenEditCourseProgram();
  };

  return (
    <>
      <Card className="mt-1">
        <CardHeader
          title={"Course Programs"}
          sx={{
            pt: 2,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
          action={
            <IconButton onClick={handleOpenCreateCourseProgram}>
              {" "}
              <Create />
            </IconButton>
          }
        />
        <DataGrid
          rows={courses.coursePrograms}
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
      </Card>

      <Modal
        open={openCreateCourseProgram}
        onClose={handleCloseCreateCourseProgram}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateCourseProgram handleClose={handleCloseCreateCourseProgram} />
        </Box>
      </Modal>
      <Modal
        open={openEditCourseProgram}
        onClose={handleCloseEditCourseProgram}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EditCourseProgram
            courseProgram={selectedRow}
            handleClose={handleCloseEditCourseProgram}
          />
        </Box>
      </Modal>
    </>
  );
};

export default CoursePrograms;
