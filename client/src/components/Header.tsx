import { Avatar, Box, makeStyles, Typography, Link } from "@material-ui/core";
import React from "react";
import catProfile from "../assets/images/Cat-Profile.png";

function Header() {
  const classes = useStyles();

  return (
    <Box className={classes.rootStyle}>
      <Box className={`${classes.headerWrapper}`}>
        <Link href="/">
          <Typography variant={"h5"} color={"primary"}>
            Home
          </Typography>
        </Link>
        <Link href="/">
          <Avatar src={catProfile}></Avatar>
        </Link>
      </Box>
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
}));

export default Header;
