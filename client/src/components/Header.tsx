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

  async function loginHandler(username: string, password: string) {
    const loginInfo = {
      userName: username,
      password: password,
    };
    

    const response = await fetch("http://localhost:6969/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(loginInfo),
    });
    console.log(response);
  }

  async function logoutHandler() {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(
      "http://localhost:6969/api/logout",
      requestOptions
    );
    console.log(response);
  }

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
        <Button onClick={logoutHandler} color="secondary">
          Logout
        </Button>
        <Link href="/">
          <Avatar src={catProfile}></Avatar>
        </Link>
      </Box>
      <Modal
        className={classes.modal}
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="Login"
      >
        <Box className={classes.modalContent}>
          <Typography>Login</Typography>
          <TextField label="User name" />
          <TextField label="Password" />
          <Button
            onClick={() => {
              loginHandler("tester420", "1234");
              handleClose();
            }}
          >
            Login
          </Button>
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
