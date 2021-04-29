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
import { useState} from "react";
import AdminPanel from "./AdminPanel";
import Register from "./Register";
import { Session } from "../App";
interface Props {
  session: Session;
}
interface Credentials {
  userName: string;
  password: string;
}

function Header(props: Props) {
  const classes = useStyles();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [formValidation, setUserNameValidation] = useState(false);

  const [loginCredentials, setloginCredentials] = useState<Credentials>({
    userName: "",
    password: "",
  });

  const handleOpen = () => {
    setIsLoginModalOpen(true);
  };

  const handleClose = () => {
    setIsLoginModalOpen(false);
    setUserNameValidation(false);
  };

  const handleRegOpen = () => {
    setIsRegisterModalOpen(true);
  };

  const handleRegClose = () => {
    setIsRegisterModalOpen(false);
  };

  const handleChange = (e: { target: { name: string; value: string; }; }) => {
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

  async function loginHandler(loginCredentials: Credentials) {
    const response = await fetch("api/login", {
      method: "POST",
      body: JSON.stringify(loginCredentials),
      credentials: 'include',
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();
    if(result.message === "Incorrect user name or password"){
      setUserNameValidation(true)
    } else {
      setUserNameValidation(false)
    }
    return response;
  }

  async function logoutHandler() {
    const response = await fetch("api/logout", {
      method: "DELETE",
      credentials: 'include',
      headers: { "Content-Type": "application/json" },
    });
    return response;
  }
  
  return (
    <Box className={classes.rootStyle}>
      {props.session.role === "admin" || props.session.role === "plebian" ? (
        <Box className={`${classes.headerWrapper}`}>
          <Link href="/">
            <Typography variant={"h5"} color={"primary"}>
              Twatter
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
              Twatter
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
          <Box>
            <Typography color="secondary">Login</Typography>
            <TextField
              error={formValidation}
              color="secondary"
              name="userName"
              label="User name"
              onChange={handleChange}
            />
            <TextField
              error={formValidation}
              color="secondary"
              name="password"
              label="Password"
              type="password"
              onChange={handleChange}
              helperText="Incorrect password or username"
            />
          </Box>
          <Button
            color="secondary"
            onClick={() => {
              loginHandler(loginCredentials);
              if(formValidation){
                reloadPage();
              } 
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
            <AdminPanel/>
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
    display: "flex",
    justifyContent: "space-araound",
    alignItems: "center",
  },
  avatarStyle: {
    background:
      "linear-gradient(261deg, rgba(33,60,209,1) 0%, rgba(29,161,242,1) 100%)",
  },
  adminModal: {},
}));

export default Header;

