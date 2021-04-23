import {
  Avatar,
  Box,
  makeStyles,
  Typography,
  Link,
  Button,
  Modal,
  TextField,
  Tooltip,
  Zoom,
} from "@material-ui/core";
import React, { useState } from "react";
import catProfile from "../assets/images/Cat-Profile.png";
import Register from "./Register";


function Header() {
  const classes = useStyles();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [loginCredentials, setloginCredentials] = useState<Object>({
    userName: "",
    password: "",
  })

  const handleOpen = () => {
    setIsLoginModalOpen(true);
  };

  const handleClose = () => {
    setIsLoginModalOpen(false);
  };

  const handleRegOpen = () => {
    setIsRegisterModalOpen(true)
  }

  const handleRegClose = () => {
    setIsRegisterModalOpen(false);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setloginCredentials(prevState => ({
        ...prevState,
        [name]: value
    }));
  };

  console.log(loginCredentials)

  async function loginHandler(loginCredentials: object) {
    const response = await fetch("http://localhost:6969/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(loginCredentials),
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
        <Button onClick={handleRegOpen} color="secondary">
          Register
        </Button>
        <Link href="/">
          <Tooltip title={"Profile"} arrow TransitionComponent={Zoom}>
            <Avatar src={catProfile}></Avatar>
          </Tooltip>
        </Link>
      </Box>
      <Modal
        className={classes.modal}
        open={isLoginModalOpen}
        onClose={handleClose}
        aria-labelledby="Login"
      >
        <Box className={classes.modalContent}>
          <Typography>Login</Typography>
          <TextField 
            name="userName" 
            label="User name"
            onChange={handleChange}
          />
          <TextField 
            name="password" 
            label="Password" 
            onChange={handleChange}
          />
          <Button
            onClick={() => {
              loginHandler(loginCredentials);
              handleClose();
            }}
          >
            Login
          </Button>
        </Box>
      </Modal>
      <Modal
        className={classes.modal}
        open={isRegisterModalOpen}
        onClose={handleRegClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box>
          <Register
            handleRegClose={handleRegClose}
          />
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
