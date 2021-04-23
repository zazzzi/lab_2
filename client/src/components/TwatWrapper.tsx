import { Box, makeStyles } from "@material-ui/core";
import { useContext } from "react";
import { PostContext } from "./context/postsContext";
import Twat from "./Twat";

function TwatWrapper() {
  const classes = useStyles();

  const { posts } = useContext(PostContext);
  return (
    <Box className={classes.rootStyle}>
      <Box>
        {posts
          .map((p: any, i) => (
            <Box key={i} className={classes.twatContainer}>
              <Twat post={p} />
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
}));

export default TwatWrapper;
