import { Create, RemoveCircleOutline } from "@mui/icons-material";
import { Box, Card, CardHeader, Chip, IconButton, Modal } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import InviteLinkForm from "./InviteLinkForm";
import CheckIcon from "@mui/icons-material/Check";
import EditAccount from "./EditAccount";
const roles = {
  EMPLOYEE_ROLE: "Employee",
  MANAGER_ROLE: "Manager",
  ADMIN_ROLE: "Admin",
};

const roleColors = {
  EMPLOYEE_ROLE: "employeeRoleColor",
  MANAGER_ROLE: "managerRoleColor",
  ADMIN_ROLE: "success",
};

const nameCellRender = (data) => {
  return (
    <div className="flex items-center justify-left">
      {data.row.firstName} {data.row.lastName}
    </div>
  );
};

const isActiveCellRender = (data) => {
  return data.value ? (
    <>
      <CheckIcon /> Active
    </>
  ) : (
    <>
      <RemoveCircleOutline /> Blocked
    </>
  );
};

const roleCellRender = (data) => {
  const role = data.value;
  const label = roles[role] || role;
  const color = roleColors[role] || "default";

  return <Chip label={label} color={color} />;
};

const columns = [
  {
    field: "id",
    headerName: "ID",
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
    width: 400,
  },
  {
    field: "role",
    headerName: "Role",
    renderCell: roleCellRender,
    width: 300,
  },
  {
    field: "active",
    headerName: "Is Active",
    renderCell: isActiveCellRender,
    width: 250,
  },
];

const Accounts = () => {
  const { employees } = useSelector((store) => store);

  const [openSendInviteLink, setOpenSendInviteLink] = useState(false);
  const handleOpenSendInviteLink = () => setOpenSendInviteLink(true);
  const handleCloseSendInviteLink = () => setOpenSendInviteLink(false);

  const [openEditAccount, setOpenEditAccount] = useState(false);
  const handleOpenEditAccount = () => setOpenEditAccount(true);
  const handleCloseEditAccount = () => setOpenEditAccount(false);

  const getAllAccounts = () => {
    return [...employees.employees, ...employees.managers];
  };

  const [selectedRow, setSelectedRow] = useState(null);
  const handleRowClick = (params) => {
    setSelectedRow(params.row);
    handleOpenEditAccount();
  };

  return (
    <>
      <Card className="mt-1">
        <CardHeader
          title={"Accounts"}
          sx={{
            pt: 2,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
          action={
            <IconButton onClick={handleOpenSendInviteLink}>
              {" "}
              <PersonAddIcon />
            </IconButton>
          }
        />

        <DataGrid
          rows={getAllAccounts()}
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
          open={openSendInviteLink}
          onClose={handleCloseSendInviteLink}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <InviteLinkForm
              handleClose={handleCloseSendInviteLink}
              roles={roles}
            />
          </Box>
        </Modal>
        <Modal
          open={openEditAccount}
          onClose={handleCloseEditAccount}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <EditAccount
              account={selectedRow}
              handleClose={handleCloseEditAccount}
            />
          </Box>
        </Modal>
      </Card>
    </>
  );
};

export default Accounts;
