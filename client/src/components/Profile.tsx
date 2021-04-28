import { Box, makeStyles, Typography} from "@material-ui/core";
import { useContext} from "react";
import { PostContext} from "./context/postsContext";
import Twat from "./Twat";
import { Session } from "../App";
import { Post } from "./context/postsContext";

interface Props {
  session: Session;
}

function Profile(props: Props) {
  const classes = useStyles();
  const { posts } = useContext(PostContext);

  return (
    <Box className={classes.rootStyle}>
      <Box>
        {posts
          .map((p: Post, i: number) =>
            p.author === props.session.userName ? (
              <Box key={i} className={classes.twatContainer}>
                <Twat 
                  session={props.session}
                  post={p} 
                />
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

const useStyles = makeStyles(() => ({
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

export default Profile;
