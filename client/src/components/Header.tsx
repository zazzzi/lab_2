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
import React, { useEffect, useState } from "react";
import catProfile from "../assets/images/Cat-Profile.png";
import AdminPanel from "./AdminPanel";
import Register from "./Register";

interface Props {
  session: any;
}

function Header(props: Props) {
  const classes = useStyles();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [loginCredentials, setloginCredentials] = useState<Object>({
    userName: "",
    password: "",
  });

  const handleOpen = () => {
    setIsLoginModalOpen(true);
  };

  const handleClose = () => {
    setIsLoginModalOpen(false);
  };

  const handleRegOpen = () => {
    setIsRegisterModalOpen(true);
  };

  const handleRegClose = () => {
    setIsRegisterModalOpen(false);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setloginCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const reloadPage = () => {
    setTimeout(reload, 300);
    function reload() {
      window.location.reload();
    }
  };

  async function loginHandler(loginCredentials: object) {
    const response = await fetch("http://localhost:6969/api/login", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(loginCredentials),
      headers: { "Content-Type": "application/json" },
    });
  }

  async function logoutHandler() {
    const response = await fetch("http://localhost:6969/api/logout", {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
  }

  return (
    <Box className={classes.rootStyle}>
      {props.session.role === "admin" || props.session.role === "plebian" ? (
        <Box className={`${classes.headerWrapper}`}>
          <Link href="/">
            <Typography variant={"h5"} color={"primary"}>
              Home
            </Typography>
          </Link>

          <Button
            onClick={() => {
              window.location.href = "/";
              logoutHandler();
            }}
            color="secondary"
          >
            Logout
          </Button>
          {props.session.role === "plebian" ? null : (
            <Button onClick={handleRegOpen} color="secondary">
              Admin Panel
            </Button>
          )}
          <Link href="/profile">
            <Tooltip title={"Profile"} arrow TransitionComponent={Zoom}>
              <Avatar className={classes.avatarStyle}>
                {props.session.name.toUpperCase().slice(0, 1)}
              </Avatar>
            </Tooltip>
          </Link>
        </Box>
      ) : (
        <Box className={`${classes.headerWrapper}`}>
          <Link href="/">
            <Typography variant={"h5"} color={"primary"}>
              Home
            </Typography>
          </Link>
          <Button onClick={handleOpen} color="secondary">
            Login
          </Button>
          <Button onClick={handleRegOpen} color="secondary">
            Register
          </Button>
        </Box>
      )}
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
            type="password"
            onChange={handleChange}
          />
          <Button
            onClick={() => {
              reloadPage();
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
          {props.session.role === "admin" ? (
            <AdminPanel session={props.session} />
          ) : (
            <Register handleRegClose={handleRegClose} />
          )}
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
  avatarStyle: {
    backgroundColor: "#1DA1F2",
  },
  adminModal: {},
}));

export default Header;
