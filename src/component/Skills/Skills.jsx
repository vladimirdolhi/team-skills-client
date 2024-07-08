import {
  Avatar,
  Box,
  Card,
  CardHeader,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Create, EditNote } from "@mui/icons-material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import React, { useState } from "react";
import CreateSkill from "./CreateSkill";
import { style } from "../SkillCategories/SkillCategories";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import EditSkill from "./EditSkill";

const nameCellRender = (data) => {
  return (
    <div className="flex items-center justify-left">
      <Avatar alt="img" src={data.row.image} className="mr-2" />
      <span m-2>{data.value}</span>
    </div>
  );
};
const categoryComparator = (c1, c2) => {
  return c1.name > c2.name;
};

const categoryCellRender = (data) => {
  return (
    <div className="flex items-center justify-left">
      <span m-2>{data.value.name}</span>
    </div>
  );
};

const Skills = () => {
  const { skills } = useSelector((store) => store);

  const [openCreateSkill, setOpenCreateSkill] = useState(false);
  const handleOpenCreateSkill = () => setOpenCreateSkill(true);
  const handleCloseCreateSkill = () => setOpenCreateSkill(false);

  const [openEditSkill, setOpenEditSkill] = useState(false);
  const handleOpenEditSkill = () => setOpenEditSkill(true);
  const handleCloseEditSkill = () => setOpenEditSkill(false);

  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (params) => {
    console.log(params);
    setSelectedRow(params.row);
    handleOpenEditSkill();
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
      renderCell: nameCellRender,
      width: 200,
    },
    {
      field: "description",
      headerName: "Description",
      width: 800,
    },
    {
      field: "category",
      headerName: "Category",
      renderCell: categoryCellRender,
      sortComparator: categoryComparator,
      width: 250,
    },
  ];
  return (
    <>
      <Card className="mt-1">
        <CardHeader
          title={"Skills"}
          sx={{
            pt: 2,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
          action={
            <IconButton onClick={handleOpenCreateSkill}>
              {" "}
              <Create />
            </IconButton>
          }
        />
        {/* <TableContainer>
          <Table sx={{}} aria-label="table in dashboard">
            <TableHead>
              <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Skill Name</TableCell>
              <TableCell>Skill Category</TableCell>
              <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {skill.map((item) => (
                <TableRow
                  hover
                  key={item.id}
                  sx={{
                    "&:last-of-type td, &:last-of-type th": { border: 0 },
                  }}
                  //onClick = {handleOpenEditSkill}
                >
                  <TableCell component="th" scope="row">{item.id}</TableCell>
                  <TableCell>
                    <div className='flex items-center justify-left'>
                    <Avatar
                            alt="img"
                            src={item.image}
                            className='mr-2'
                          />
                    <span m-2>
                    {item.name}
                    </span>
                    </div>
                    </TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer> */}
        <DataGrid
          rows={skills.skills}
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
        open={openCreateSkill}
        onClose={handleCloseCreateSkill}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateSkill handleClose={handleCloseCreateSkill} />
        </Box>
      </Modal>

      <Modal
        open={openEditSkill}
        onClose={handleCloseEditSkill}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EditSkill handleClose={handleCloseEditSkill} skill={selectedRow} />
        </Box>
      </Modal>
    </>
  );
};

export default Skills;
