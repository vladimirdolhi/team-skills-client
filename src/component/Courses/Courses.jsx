import React, { useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  IconButton,
  Modal,
  Chip,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { Create, EditNote } from "@mui/icons-material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { style } from "../SkillCategories/SkillCategories";
import CreateCourse from "./CreateCourse";
import { useSelector } from "react-redux";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { format } from "date-fns/format";
import EditCourse from "./EditCourse";
import { useLocation } from "react-router-dom";

const idCellRender = (data) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "left",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <div className="flex items-center justify-left">{data.value}</div>
    </Box>
  );
};

const employeeCellRender = (data) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "left",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <Chip
        size={"3rem"}
        avatar={
          <Avatar
            sx={{ width: 20, height: 20 }}
            src={data.row[data.field].image}
          />
        }
        label={data.value}
        variant="outlined"
      />
    </Box>
  );
};

const courseProgramRender = (data) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "left",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      {data.value.name}
    </Box>
  );
};

const formatDate = (dateString) => {
  return format(new Date(dateString), "dd-MM-yyyy");
};

const dateCellRender = (data) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "left",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <div className="flex items-center justify-left">
        {formatDate(data.value)}
      </div>
    </Box>
  );
};

const skillsCellRender = (data) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {data.row.courseProgram.skills.map((skill) => (
        <Chip
          label={skill.name}
          color="secondary"
          style={{ margin: "1.5px" }}
        />
      ))}
    </div>
  );
};

const statusLabels = {
  PLANNED: "Planned",
  IN_PROGRESS: "In progress",
  COMPLETED: "Completed",
};

const statusCellRender = (data) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "left",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <Chip
        sx={{
          color: "white !important",
          fontWeight: "bold",
          textAlign: "center",
        }}
        label={statusLabels[data.value]}
        size="small"
        color={
          data.value === "IN_PROGRESS"
            ? "info"
            : data.value === "COMPLETED"
            ? "success"
            : "warning"
        }
        className="text-white"
      />
    </Box>
  );
};

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 90,
    renderCell: idCellRender,
  },
  {
    field: "mentee",
    headerName: "Mentee",
    renderCell: employeeCellRender,
    filterable: false,
    valueGetter: (params) => `${params.firstName} ${params.lastName}`,
    width: 210,
  },
  {
    field: "mentor",
    headerName: "Mentor",
    renderCell: employeeCellRender,
    valueGetter: (params) => `${params.firstName} ${params.lastName}`,
    width: 210,
  },
  {
    field: "courseProgram",
    headerName: "Course Program",
    renderCell: courseProgramRender,
    filterable: false,
    width: 240,
  },
  {
    field: "skills",
    headerName: "Skills",
    renderCell: skillsCellRender,
    width: 300,
  },
  {
    field: "start",
    headerName: "Start",
    renderCell: dateCellRender,
    width: 130,
  },
  {
    field: "finish",
    headerName: "Finish",
    renderCell: dateCellRender,
    width: 130,
  },
  {
    field: "status",
    headerName: "Status",
    renderCell: statusCellRender,
    width: 120,
  },
];

const Courses = () => {
  const { auth, courses } = useSelector((store) => store);

  const location = useLocation();

  const [openCreateCourse, setOpenCreateCourse] = useState(false);
  const handleOpenCreateCourse = () => setOpenCreateCourse(true);
  const handleCloseCreateCourse = () => setOpenCreateCourse(false);

  const [openEditCourse, setOpenEditCourse] = useState(false);
  const handleOpenEditCourse = () => setOpenEditCourse(true);
  const handleCloseEditCourse = () => setOpenEditCourse(false);

  const [selectedRow, setSelectedRow] = useState(null);
  const handleRowClick = (params) => {
    setSelectedRow(params.row);
    handleOpenEditCourse();
  };

  if (!auth.user) {
    return (
      <div>
        <CircularProgress />
        Loading...
      </div>
    );
  }

  const isAdmin = auth.user.role === "ADMIN_ROLE";
  const isManager = auth.user.role === "MANAGER_ROLE";

  const isMentorshipTab = location.pathname.includes("employee/mentorship");
  const isMyCoursesTab = location.pathname.includes("employee/courses");

  const getEmployeeCoursesFilter = (id) => {
    if (isMyCoursesTab) {
      return (course) => course.mentee.id === id;
    } else if (isMentorshipTab) {
      return (course) => course.mentor.id === id;
    }
  };

  const getFilteredCourses = () => {
    if (isAdmin || isManager) {
      return courses.courses;
    } else {
      const filter = getEmployeeCoursesFilter(auth.user.id);
      return courses.courses.filter(filter);
    }
  };

  return (
    <Box sx={{ height: "810", width: 1 }}>
      <Card className="mt-1">
        <CardHeader
          title={"Courses"}
          sx={{
            pt: 2,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
          action={
            (isAdmin || isManager) && (
              <IconButton onClick={handleOpenCreateCourse}>
                {" "}
                <Create />
              </IconButton>
            )
          }
        />

        <DataGrid
          rows={getFilteredCourses()}
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
          getRowHeight={() => "auto"}
        />

        {(isAdmin || isManager) && (
          <Modal
            open={openCreateCourse}
            onClose={handleCloseCreateCourse}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <CreateCourse handleClose={handleOpenCreateCourse} />
            </Box>
          </Modal>
        )}

        {(isAdmin || isManager || isMentorshipTab) && (
          <Modal
            open={
              openEditCourse &&
              (auth.user.id === selectedRow.mentor.id || isManager || isAdmin)
            }
            onClose={handleCloseEditCourse}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <EditCourse
                course={selectedRow}
                handleClose={handleCloseEditCourse}
                isMentorshipTab={isMentorshipTab}
              />
            </Box>
          </Modal>
        )}
      </Card>
    </Box>
  );
};

export default Courses;
