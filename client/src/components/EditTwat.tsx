import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import { PostContext } from "./context/postsContext";

interface IProps {
  twatID: string;
  handleClose: () => void;
  twatContent: string;
}

function EditTwat(props: IProps) {
  const classes = useStyles();
  const [twat, setTwat] = useState<any>();
  const [chars, setChars] = useState<number>(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const { posts, editPost } = useContext(PostContext);

  function handleCharacters(value: string) {
    setChars(value.length);
    setTwat(value);
  }

  return (
    <Box className={classes.modal}>
      <Box className={classes.modalContent}>
        <Typography color={"secondary"}>Edit Twat</Typography>
        <TextField
          multiline
          rows={6}
          variant="outlined"
          color="secondary"
          className={classes.twatFieldStyle}
          onChange={(event) => handleCharacters(event.target.value)}
          disabled={isDisabled}
          defaultValue={props.twatContent}
          inputProps={{ maxLength: 280, className: classes.inputColor }}
          label="What's happening?"
        />
        <Button
          onClick={() => {
            editPost(twat, props.twatID);
            props.handleClose();
          }}
        >
          Submit Changes
        </Button>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  rootStyle: {
    height: "10rem",
    width: "20rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    position: "absolute",
    flexDirection: "column",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  twatFieldStyle: {
    width: "30rem",
    borderColor: "#D9D9D9",
  },
  inputColor: {
    color: "#000",
  },
}));
export default EditTwat;
