import { Box, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import PostField from './components/PostField';
import TwatWrapper from './components/TwatWrapper';

function App () {
const [state, setState] = useState({
  data: null
}); 

const classes = useStyles();

  useEffect(() => {
      // Call our fetch function below once the component mounts
    callBackendAPI()
      .then(res => setState({ data: res.express }))
      .catch(err => console.log(err));
  })
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  const callBackendAPI = async () => {
    const response = await fetch('/');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

    return (
      <Box className={classes.rootStyle}>
        <Header/>
        <PostField/>
        <TwatWrapper/>
      </Box>
    );
}

const useStyles = makeStyles((theme) => ({
  rootStyle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
}));
export default App;