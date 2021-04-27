import classes from "*.module.css";
import {
  Box,
  Button,
  makeStyles,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import { ProfileContext } from "./context/profileContext";
import Register from "./Register";
import UserItem from "./UserItem";

interface IProps {
  session: any;
}

function AdminPanel(props: IProps) {
  const [currentAction, setCurrentAction] = useState("create");
  const classes = useStyles();
  const { registerNewProfile, profiles } = useContext(ProfileContext);
  const [values, setValues] = useState<Object>({
    userName: "",
    name: "",
    password: "",
    role: "",
  });
  const [rolePlaceholder, setRolePlaceholder] = useState<string | undefined>()

  const roles = [
    { value: "admin", label: "Admin" },
    { value: "pleabian", label: "Pleabian" },
  ];

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name === "role"){
        setRolePlaceholder(e.target.value)
    }
  };

  return (
    <Box className={classes.modal}>
      <Box className={classes.modalContent}>
        <Box className={classes.tabs}>
          <Button onClick={() => setCurrentAction("create")}>
            Create new user
          </Button>
          <Button onClick={() => setCurrentAction("edit")}>
            Edit existing users
          </Button>
        </Box>
        {currentAction === "create" ? (
          <Box className={classes.createNewStyle}>
            <Typography>Create New</Typography>
            <TextField
              onChange={handleChange}
              label="Username"
              name="userName"
            />
            <TextField onChange={handleChange} label="Name" name="name" />
            <TextField
              onChange={handleChange}
              label="Password"
              name="password"
            />

            <TextField
              select
              value={!rolePlaceholder ? null : rolePlaceholder}
              onChange={handleChange}
              label="Role"
              name="role"
            >
              {roles.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <Button
              onClick={() => {
                registerNewProfile(values);
                setCurrentAction("created");
              }}
            >
              Create New User
            </Button>
          </Box>
        ) : currentAction === "edit" ? (
          <Box className={classes.editStlye}>
            <Typography>Edit</Typography>
            {profiles.map((u: any, i) => (
                <UserItem id={u._id} userName={u.userName} name={u.name} password={u.password} role={u.role} />
              ))}
          </Box>
        ) : currentAction === "created" ? (
          <Box>
            <Typography>New user created</Typography>
            <Button onClick={() => setCurrentAction("create")}>
              Create one more
            </Button>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    position: "absolute",
    width: "40rem",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  tabs: {
    display: "flex",
    "& > * ": {
      margin: "1rem",
    },
  },
  createNewStyle: {
    display: "flex",
    flexDirection: "column",
  },
  editStlye: {
    overflowY: "scroll",
    maxHeight:"30rem"
  }
}));

export default AdminPanel;
