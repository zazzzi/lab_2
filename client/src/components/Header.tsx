import { Box, makeStyles, Typography } from "@material-ui/core";
import React from "react";

function Header() {
  const classes = useStyles();

  return (
    <Box className={classes.rootStyle}>
      <Box className={`${classes.headerWrapper}`}>
        <Typography>Welcome to twatter, hoe</Typography>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  rootStyle: {
    height: "5rem",
    width: "100%",
    background: "grey",
  },
  headerWrapper: {},
}));

export default Header;
