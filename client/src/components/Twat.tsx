import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useContext } from "react";
import { PostContext, Post } from "./context/postsContext";
import { makeStyles, Typography, Avatar, Box } from "@material-ui/core";

function Twat() {
  const classes = useStyles();
  const { posts, deletePost } = useContext(PostContext);

  return (
    <Box className={classes.rootStyle}>
      <Box className={classes.twatContainer}>
        <Box className={classes.avatarContainer}>
          <Avatar className={classes.avatarLarge}>Z</Avatar>
        </Box>
        <Box className={classes.topBar}>
          <Box className={classes.name}>
            <Typography color="primary">Seb</Typography>
            <Typography variant="body2">@zazzi</Typography>
            <Typography variant="body2">•</Typography>
            <Typography variant="body2">4h</Typography>
          </Box>
          <Box className={classes.moreIcon}>
            <MoreHorizIcon
              color="primary"
              onClick={() => {
                //   deletePost(p._id);
              }}
            />
          </Box>
        </Box>

        <Box className={classes.twatContent}>
          <Typography color="primary">
            Lorem ipsum dolor sit amet consectetur, adipisicing consectetur
            dolor sit amet consecteturamet
          </Typography>
        </Box>
        <Box className={classes.likeIcon}>
          <ThumbUpIcon color="primary" />
          <Typography color="primary" className="twatContent">
            3k
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  rootStyle: {
    width: "36rem",
    background: "black",
  },
  twatContainer: {
    width: "100%",
    height: "100%",
  },

  twatContent: {
    position: "relative",
    bottom: "3rem",
    maxWidth: "70%",
    margin: "auto",
    left: "1rem",
  },
  likeIcon: {
    position: "relative",
    bottom: "1rem",
    left: "6.5rem",
    display: "flex",
    justifyContent: "space-between",
    width: "3rem",
  },
  moreIcon: {
    position: "relative",
    right: "1rem",
  },
  avatarContainer: {
    position: "relative",
    top: "1rem",
    left: "1rem",
  },
  avatarLarge: {
    width: "4rem",
    height: "4rem",
  },
  name: {
    position: "relative",
    left: "6rem",
    width: "10rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  topBar: {
    position: "relative",
    bottom: "3.2rem",
    display: "flex",
    justifyContent: "space-between",
  },
}));

export default Twat;
