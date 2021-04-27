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
        <Typography>Username: {props.userName}</Typography>
        <Typography>Name: {props.name}</Typography>
        <Typography>Role: {props.role}</Typography>
      </Box>
      <Box>
        <Button>Edit</Button>
        <Button onClick={()=> deleteProfile(props.id)}>Delete</Button>
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
}));

export default UserItem;
