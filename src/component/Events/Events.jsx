import {
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import EventCard from "./EventCard";
import { Create, EditNote } from "@mui/icons-material";
import CreateEventForm from "./CreateEventForm";

const eventsSample = [
  {
    name: "Java JMS Meetup",
    description:
      "Join us for an engaging Java JMS Meetup! Dive into the world of Java Message Service (JMS) as we explore its key concepts, best practices, and real-world applications. Whether you're a seasoned developer or just starting with JMS, this meetup offers valuable insights, networking opportunities, and lively discussions.",
    image:
      "https://media.licdn.com/dms/image/D4D22AQE06cj0oksdvQ/feedshare-shrink_800/0/1684423253800?e=2147483647&v=beta&t=Tc3cRX23im6OGR9mGoczhh6uHzXtiB5U9uM8jXZmcRs",
    location: "Minsk, st. Melezha, 5, floor 15, office 1511",
    start: "30-06-2024 19:00",
    finish: "30-06-2024 22:00",
  },
  {
    name: "Cyber Security Meetup",
    description:
      "Embark on a journey into the ever-evolving world of Cyber Security at our upcoming meetup! Delve into cutting-edge technologies and methodologies shaping digital defense strategies. From AI-powered threat detection to blockchain-based encryption, sessions cover technologies for professionals and newcomers.",
    image:
      "https://cdn.asp.events/CLIENT_Nineteen_F7A1E73F_5056_B725_6BE81DEAAC036B43/sites/The-Security-Event-2020/media/SECURITY---DAY-1---LJ-117-(1).jpg",
    location: "Minsk, st. Melezha, 5, floor 15, office 1511",
    start: "01-08-2024 17:00",
    finish: "01-08-2024 19:30",
  },
  {
    name: "Scala For Java Developers",
    description:
      "Join us for an engaging workshop tailored for Java developers eager to explore Scala! Discover how Scala's powerful features and functional programming paradigms can enhance your Java applications. Through hands-on sessions and expert guidance, learn to leverage Scala for improved code efficiency and scalability.",
    image:
      "https://www.globalnerdy.com/wp-content/uploads/2023/05/scala-1-600x450.jpg",
    location: "Minsk, st. Melezha, 5, floor 15, office 1511",
    start: "15-08-2024 17:00",
    finish: "15-08-2024 19:30",
  },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

const Events = () => {
  const [openCreateEvent, setOpenCreateEvent] = useState(false);
  const handleOpenCreateEvent = () => setOpenCreateEvent(true);
  const handleCloseCreateEvent = () => setOpenCreateEvent(false);

  const { auth, events } = useSelector((store) => store);
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
    <>
      <div className="mt-5 px-5 flex flex-wrap gap-5">
        {eventsSample.map((item) => (
          <EventCard item={item} />
        ))}
      </div>

      {!isEmployee && (
        <div className="p-5 justify-center">
          <Button
            sx={{ padding: "1rem 2rem" }}
            onClick={handleOpenCreateEvent}
            variant="contained"
            color="primary"
          >
            Create New Event
          </Button>
        </div>
      )}

      <Modal
        open={openCreateEvent}
        onClose={handleCloseCreateEvent}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateEventForm handleClose={handleCloseCreateEvent} />
        </Box>
      </Modal>
    </>
  );
};

export default Events;
