import { Box, makeStyles } from '@material-ui/core';
import React from 'react';

function TwatWrapper() {
  const classes = useStyles();

    return (
       <Box className={classes.rootStyle}>
           
       </Box>
    );
}
const useStyles = makeStyles((theme) => ({
    rootStyle: {
      height: "200rem",
      width: "20rem",
      background: "grey",
    },
    headerWrapper: {},
  }));


export default TwatWrapper;