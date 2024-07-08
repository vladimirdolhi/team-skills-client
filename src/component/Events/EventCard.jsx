import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";

const formatDate = (dateString) => {
  return format(new Date(dateString), "dd-MM-yyyy HH:mm");
};

const EventCard = ({ item }) => {
  const { auth } = useSelector((store) => store);
  if (!auth.user) {
    return (
      <div>
        <CircularProgress />
        Loading...
      </div>
    );
  }

  const isEmployee = auth.user.role === "EMPLOYEE_ROLE";

  return (
    <div>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          width: 345,
        }}
      >
        <CardMedia
          sx={{
            height: 345,
            "&:hover": {
              transform: "scale(1.1)",
              transition: "transform 0.5s ease-in-out",
            },
          }}
          image={item.image}
          title="green iguana"
        />

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              wordWrap: "break-word",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
            }}
          >
            {item.description}
          </Typography>
          <div className="py-2 space-y-2">
            <p>{item.location}</p>
            <p className="text-sm text-blue-500">{item.start}</p>
            <p className="text-sm text-red-500">{item.finish}</p>
          </div>
        </CardContent>
        {true && (
          <div className="">
            {!isEmployee && (
              <CardActions className="justify-items-end">
                <IconButton
                  //onClick={handleDeleteEvent}
                  aria-label="add to favorites"
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                //onClick={handleOpenCreateCategory}
                >
                  {" "}
                  <EditNoteIcon />
                </IconButton>
              </CardActions>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default EventCard;
