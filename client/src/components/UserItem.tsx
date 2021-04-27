import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import React from "react";

interface IProps {
  userName: string;
  name: string;
  role: string;
  password: string;
}

function UserItem(props: IProps) {
  const classes = useStyles();
  return (
    <Box className={classes.rootStyle}>
      <Box>
        <Typography>Username: {props.userName}</Typography>
        <Typography>Name: {props.name}</Typography>
        <Typography>Role: {props.role}</Typography>
      </Box>
      <Box>
        <Button>Edit</Button>
        <Button>Delete</Button>
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
