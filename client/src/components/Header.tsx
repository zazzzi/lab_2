import {
  Avatar,
  Box,
  makeStyles,
  Typography,
  Link,
  Button,
  Modal,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import catProfile from "../assets/images/Cat-Profile.png";

function Header() {
  const classes = useStyles();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Box className={classes.rootStyle}>
      <Box className={`${classes.headerWrapper}`}>
        <Link href="/">
          <Typography variant={"h5"} color={"primary"}>
            Home
          </Typography>
        </Link>
        <Button onClick={handleOpen} color="secondary">
          Login
        </Button>
        <Link href="/">
          <Avatar src={catProfile}></Avatar>
        </Link>
      </Box>
      <Modal
      className={classes.modal}
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box className={classes.modalContent}>
          <Typography>Login</Typography>
          <TextField label="User name"/>
          <TextField label="Password" />
          <Button>Login</Button>
        </Box>
      </Modal>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  rootStyle: {
    height: "5rem",
    width: "100%",
    background: "black",
    display: "flex",
    justifyContent: "center",
  },
  headerWrapper: {
    width: "80%",
    margin: "auto",
    display: "flex",
    justifyContent: "space-around",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default Header;
