import { Box, makeStyles } from "@material-ui/core";
import { useContext, useState } from "react";
import { PostContext } from "./context/postsContext";
import Twat from "./Twat";
import { Session } from "../App";

interface Props{
  session: Session;
}

function TwatWrapper(props: Props) {
  const classes = useStyles();
  const { posts } = useContext(PostContext);

  console.log(props.session)

  return (
    <Box className={classes.rootStyle}>
      <Box>
        {posts
          .map((p: any, i) => (
            <Box key={i} className={classes.twatContainer}>
              <Twat 
                session={props.session}
                post={p} 
              />
            </Box>
          ))
          .reverse()}
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  rootStyle: {
    width: "30rem",
    background: "black",
    height: "100%",
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
}));

export default TwatWrapper;
