import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import React, { useContext } from "react";
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
  const { deleteProfile } = useContext(ProfileContext);

  return (
    <Box className={classes.rootStyle}>
      <Box>
        <Typography color="secondary">Username: {props.userName}</Typography>
        <Typography color="secondary">Name: {props.name}</Typography>
        <Typography color="secondary">Role: {props.role}</Typography>
      </Box>
      <Box>
        <Button color="secondary">Edit</Button>
        <Button color="primary" onClick={() => deleteProfile(props.id)}>
          Delete
        </Button>
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
}));

export default UserItem;
