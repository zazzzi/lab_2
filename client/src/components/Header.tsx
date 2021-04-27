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
import Register from "./Register";


function Header() {
  const classes = useStyles();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [session, setSession] = useState<any>([])
  const [loginCredentials, setloginCredentials] = useState<Object>({
    "userName": "",
    "password": ""
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

  useEffect(() => {
    const loadSession = async () => {
      const decodedString = await JSON.parse(atob(getCookie('session')));
      setSession(decodedString)
    }
    loadSession()
  }, [])

  const reloadPage = () => {
    setTimeout( reload, 300)
    function reload () {
      window.location.reload()
    }
  }

  function getCookie(cname: string) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  async function loginHandler(loginCredentials: object) {
    const response = await fetch("http://localhost:6969/api/login", {
      method: "POST",
      credentials: 'include',
      body: JSON.stringify(loginCredentials),
      headers: { "Content-Type": "application/json" },
    }); 
  }

  async function logoutHandler() {
    const response = await fetch("http://localhost:6969/api/logout", {
      method: "DELETE",
      credentials: 'include',
      headers: { "Content-Type": "application/json" },
    }); 
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
        <Button onClick={() => {
          window.location.href = "/";
          logoutHandler()
        }
          } color="secondary">
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
              reloadPage()
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
