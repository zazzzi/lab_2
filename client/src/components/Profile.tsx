import { Box, makeStyles, Typography, Modal } from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import React, { useContext, useEffect, useState } from "react";
import { PostContext, Post } from "./context/postsContext";
import Twat from "./Twat";
import { Session } from "../App";

interface Props {
  session: Session;
}

function Profile(props: Props) {
  const classes = useStyles();
  const { posts } = useContext(PostContext);

  return (
    <Box className={classes.rootStyle}>
      <Box>
        {props.session.userName === undefined ? null : (
          <Box mt={5} className={classes.profileTitle}>
            <Typography color="secondary" variant="h5">
              {props.session.userName}'s posts
            </Typography>
          </Box>
        )}
        {posts
          .map((p: any, i: any) =>
            p.author === props.session.userName ? (
              <Box key={i} className={classes.twatContainer}>
                <Twat session={props.session} post={p} />
              </Box>
            ) : null
          )
          .reverse()}

        {props.session.userName === undefined ? (
          <Box className={classes.twatContainer}>
            <Typography color={"primary"} variant={"h5"}>
              Please log in first.
            </Typography>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  rootStyle: {
    width: "30rem",
    background: "black",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  headerWrapper: {},
  twatContainer: {
    marginBottom: "1rem",
    borderBottom: "1px solid #535759",
  },
  twatContent: {
    width: "10%",
  },
  profileTitle: {
    height: "10rem",
    textAlign: "center",
  },
}));

export default Profile;
