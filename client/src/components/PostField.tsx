import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";

import React, { useContext, useState } from "react";
import { PostContext } from './context/postsContext';
import { ProfileContext } from './context/profileContext';


function PostField() {
  const classes = useStyles();
  const [chars, setChars] = useState<number>(0);
  const [twat, setTwat] = useState<any>();
  const [isDisabled, setIsDisabled] = useState(false);
  const {posts,makeNewPost} = useContext(PostContext)
  
  function handleCharacters(value: string) {
    setChars(value.length);
    
    setTwat(value);
  }

  return (
    <Box>
      <Box className={classes.twatWrapperStyle}>
        <TextField
          multiline
          rows={6}
          variant="outlined"
          color="primary"
          className={classes.twatFieldStyle}
          onChange={(event) => handleCharacters(event.target.value)}
          disabled={isDisabled}
          inputProps={{ maxLength: 280, className: classes.inputColor }}
          label="What's happening?"
        />
        <Box className={classes.twatInfoWrapper}>
          <Typography>{chars}/280</Typography>
          <Button
            variant="contained"
            onClick={() => {
              makeNewPost(twat);
            }}
            color="secondary"
          >
            Twat
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  rootStyle: {},
  twatWrapperStyle: {
    width: "30rem",
    height: "10rem",
    margin: "10rem",
  },
  twatFieldStyle: {
    width: "30rem",
    borderColor: "#D9D9D9",
  },
  inputColor: {
    color: "#D9D9D9",
  },
  twatInfoWrapper: {
    display: "flex",
    justifyContent: "space-between",
    margin: "0.5rem",
  },
}));

export default PostField;
