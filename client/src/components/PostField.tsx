import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";

function PostField() {
  const classes = useStyles();
  const [chars, setChars] = useState<number>(0);
  const [twat, setTwat] = useState<string>();
  const [isDisabled, setIsDisabled] = useState(false);

  function handleCharacters(value: string) {
    setChars(value.length);
    setTwat(value);
  }

  async function handleTwat() {
    const placeholder = {
      author: "lol",
      content: twat,
      likes: 0,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(placeholder),
    };
    await fetch("http://localhost:6969/api/posts", requestOptions);
  }

  return (
    <Box>
      <Box className={classes.twatWrapperStyle}>
        <TextField
          multiline
          rows={6}
          variant="outlined"
          className={classes.twatFieldStyle}
          onChange={(event) => handleCharacters(event.target.value)}
          disabled={isDisabled}
          inputProps={{ maxLength: 280 }}
          label="What's happening?"
        />
        <Box className={classes.twatInfoWrapper}>
          <Typography>{chars}/280</Typography>
          <Button onClick={() => handleTwat()} variant="contained">
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
  },
  twatInfoWrapper: {
    display: "flex",
    justifyContent: "space-between",
    margin: "0.5rem",
  },
}));

export default PostField;
