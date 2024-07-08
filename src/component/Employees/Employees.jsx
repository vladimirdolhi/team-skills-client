import React, { useState } from "react";
import { Box, Card, CardHeader, IconButton, Modal, Chip } from "@mui/material";
import { Create, EditNote } from "@mui/icons-material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import EditEmployee from "./EditEmployee";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useSelector } from "react-redux";

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

const nameCellRender = (data) => {
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
        {data.row.firstName} {data.row.lastName}
      </div>
    </Box>
  );
};

const emailCellRender = (data) => {
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
      <div className="flex items-center justify-left">{data.row.email}</div>
    </Box>
  );
};

const skillsCellRender = (data) => {
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
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {data.value.map((courseProgram, index) => (
          <Chip
            key={index}
            label={courseProgram.name}
            color="success"
            style={{ margin: "1.5px" }}
          />
        ))}
      </div>
    </Box>
  );
};

const columns = [
  {
    field: "id",
    headerName: "ID",
    renderCell: idCellRender,
    width: 90,
  },
  {
    field: "name",
    headerName: "Fullname",
    renderCell: nameCellRender,
    width: 300,
  },
  {
    field: "email",
    headerName: "Email",
    renderCell: emailCellRender,
    width: 400,
  },
  {
    field: "skills",
    headerName: "Skills",
    renderCell: skillsCellRender,
    width: 600,
  },
];

const Employees = () => {
  const { employees } = useSelector((store) => store);

  const [openEditEmployee, setOpenEditEmployee] = useState(false);
  const handleOpenEditEmployee = () => setOpenEditEmployee(true);
  const handleCloseEditEmployee = () => setOpenEditEmployee(false);

  const [selectedRow, setSelectedRow] = useState(null);
  const handleRowClick = (params) => {
    setSelectedRow(params.row);
    handleOpenEditEmployee();
  };

  const getRowHeight = (params) => {
    const skills = params.model.skills || [];
    const numOfLines = Math.ceil(skills.length / 6) - 1;
    return 50 + numOfLines * 25;
  };

  return (
    <>
      <Card className="mt-1">
        <CardHeader
          title={"Employees"}
          sx={{
            pt: 2,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
        />

        <DataGrid
          rows={employees.employees}
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
        <Modal
          open={openEditEmployee}
          onClose={handleCloseEditEmployee}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <EditEmployee
              employee={selectedRow}
              handleClose={handleCloseEditEmployee}
            />
          </Box>
        </Modal>
      </Card>
    </>
  );
};

export default Employees;
