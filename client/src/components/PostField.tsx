import { Box, makeStyles, TextField } from "@material-ui/core";
import React from "react";

function PostField() {
  const classes = useStyles();

  return (
    <Box>
      <TextField />
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  rootStyle: {},
}));

export default PostField;
