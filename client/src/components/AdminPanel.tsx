import {
  Box,
  Button,
  makeStyles,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";
import { useContext, useState } from "react";
import { ProfileContext, Profile } from "./context/profileContext";
import UserItem from "./UserItem";

function AdminPanel() {
  const [currentAction, setCurrentAction] = useState("create");
  const classes = useStyles();
  const { registerNewProfile, profiles } = useContext(ProfileContext);
  const [values, setValues] = useState<Object>({
    userName: "",
    name: "",
    password: "",
    role: "",
  });
  const [rolePlaceholder, setRolePlaceholder] = useState<string | undefined>();

  const roles = [
    { value: "admin", label: "Admin" },
    { value: "plebian", label: "Plebian" },
  ];

  const handleChange = (e: { target: { value: string; name: string; }; }) => {
    const { name, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name === "role") {
      setRolePlaceholder(e.target.value);
    }
  };

  return (
    <Box className={classes.modal}>
      <Box className={classes.modalContent}>
        <Box className={classes.tabs}>
          <Button color="secondary" onClick={() => setCurrentAction("create")}>
            Create new user
          </Button>
          <Button color="secondary" onClick={() => setCurrentAction("edit")}>
            Edit existing users
          </Button>
        </Box>
        {currentAction === "create" ? (
          <Box className={classes.createNewStyle}>
            <Typography color="secondary">Create New</Typography>
            <TextField
              color="secondary"
              onChange={handleChange}
              label="Username"
              name="userName"
            />
            <TextField
              color="secondary"
              onChange={handleChange}
              label="Name"
              name="name"
            />
            <TextField
              color="secondary"
              onChange={handleChange}
              label="Password"
              name="password"
            />

            <TextField
              color="secondary"
              select
              value={!rolePlaceholder ? "" : rolePlaceholder}
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
              color="secondary"
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
            <Typography color="secondary">Edit</Typography>
            {profiles.map((u: Profile, _i) => (
              <UserItem
              key={_i}
                id={u._id}
                userName={u.userName}
                name={u.name}
                password={u.password}
                role={u.role}
              />
            ))}
          </Box>
        ) : currentAction === "created" ? (
          <Box>
            <Typography color="secondary">New user created</Typography>
            <Button
              color="secondary"
              onClick={() => setCurrentAction("create")}
            >
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
    maxHeight: "30rem",
  },
}));

export default AdminPanel;
