import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";

import { useContext, useState } from "react";
import { PostContext } from "./context/postsContext";

function PostField() {
  const classes = useStyles();
  const [chars, setChars] = useState<number>(0);
  const [twat, setTwat] = useState<any>();
  const [isDisabled] = useState(false);
  const { makeNewPost } = useContext(PostContext);

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
          autoFocus
          // variant="outlined"
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

const useStyles = makeStyles(() => ({
  rootStyle: {},
  twatWrapperStyle: {
    width: "30rem",
    height: "10rem",
    margin: "5rem",
    border: "2px solid white",
    borderRadius:"9px",
    padding:"0.5rem 1rem"
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
    margin: "1.25rem 0.5rem 0.5rem 0.5rem",
  },
}));

export default PostField;
