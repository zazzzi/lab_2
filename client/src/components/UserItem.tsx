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

interface IProps {
  userName: string;
  name: string;
  role: string;
  password: string;
  id: string;
}

function UserItem(props: IProps) {
  const classes = useStyles();
  const { deleteProfile, editProfile } = useContext(ProfileContext);
  const [editMode, setEditMode] = useState(false);
  const [rolePlaceholder, setRolePlaceholder] = useState<string>(props.role);

  const [values, setValues] = useState<Object>({
    userName: "",
    name: "",
    password: "",
    role: "",
  });
  const roles = [
    { value: "admin", label: "Admin" },
    { value: "plebian", label: "Plebian" },
  ];

  const handleChange = (e: any) => {
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
    <Box className={classes.rootStyle}>
      <Box className={classes.fieldWrapper}>
        <TextField
          disabled={!editMode}
          label="Username"
          value={props.userName}
        />
        <TextField disabled={!editMode} label="Name" value={props.name} />
        {!editMode ? (
          <TextField disabled={!editMode} label="Role" value={props.role} />
        ) : (
          <TextField
            select
            value={rolePlaceholder}
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
        )}

        {editMode ? <TextField label="Password" /> : null}
      </Box>
      <Box>
        {!editMode ? (
          <Button onClick={() => setEditMode(!editMode)}>Edit</Button>
        ) : (
          <Button
            onClick={() => {
              setEditMode(!editMode);
                editProfile(props.id, values)
            }}
          >
            Save
          </Button>
        )}
        <Button onClick={() => deleteProfile(props.id)}>Delete</Button>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  rootStyle: {
    display: "flex",
    border: "solid 1px black",
    margin: ".5rem",
    padding: ".5rem",
  },
  fieldWrapper: {
    display: "flex",
    flexDirection: "column",
    "& > *": {
      margin: ".2rem 0",
    },
  },
}));

export default UserItem;
