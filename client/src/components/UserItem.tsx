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
          color="secondary"
          disabled={!editMode}
          label="Username"
          defaultValue={props.userName}
        />
        <TextField color="secondary" disabled={!editMode} label="Name" defaultValue={props.name} />
        {!editMode ? (
          <TextField color="secondary" disabled={!editMode} label="Role" defaultValue={props.role} />
        ) : (
          <TextField
            color="secondary"
            select
            defaultValue={rolePlaceholder}
            onChange={handleChange}
            label="Role"
            name="role"
          >
            {roles.map((option) => (
              <MenuItem key={option.value} defaultValue={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        )}

        {editMode ? <TextField label="Password" /> : null}
      </Box>
      <Box>
        {!editMode ? (
          <Button color="secondary" onClick={() => setEditMode(!editMode)}>Edit</Button>
        ) : (
          <Button
            color="secondary"
            onClick={() => {
              setEditMode(!editMode);
                editProfile(props.id, values)
            }}
          >
            Save
          </Button>
        )}
        <Button             color="primary"
 onClick={() => deleteProfile(props.id)}>Delete</Button>

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
    justifyContent: "space-between",
    alignItems: "center",
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
