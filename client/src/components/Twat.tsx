import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useContext, useState } from "react";
import { makeStyles, Typography, Avatar, Box } from "@material-ui/core";
import { PostContext, Post } from "./context/postsContext";
import catProfile from "../assets/images/Cat-Profile.png";

interface Props {
  post: Post;
}

function Twat(props: Props) {
  const [likes, setLikes] = useState(props.post.likes);
  const classes = useStyles();
  const { posts, deletePost, likePost } = useContext(PostContext);
  console.log(props.post);

  return (
    <Box className={classes.rootStyle}>
      <Box className={classes.twatContainer}>
        <Box className={classes.avatarContainer}>
          <Avatar src={catProfile} className={classes.avatarLarge}></Avatar>
        </Box>
        <Box className={classes.topBar}>
          <Box className={classes.name}>
            <Box m={0.5}>
              <Typography color="primary">{props.post.name}</Typography>
            </Box>
            <Box m={0.5}>
              <Typography variant="body2">@{props.post.author}</Typography>
            </Box>
            <Box m={0.5}>
              <Typography variant="body2">•</Typography>
            </Box>
            <Box m={0.5}>
              <Typography variant="body2">{props.post.date}</Typography>
            </Box>
          </Box>
          <Box className={classes.moreIcon}>
            <MoreHorizIcon
              color="primary"
              onClick={() => {
                deletePost(props.post._id);
              }}
            />
          </Box>
        </Box>

        <Box className={classes.twatContent}>
          <Typography color="primary">{props.post.content}</Typography>
        </Box>
        <Box className={classes.likeIcon}>
          <ThumbUpIcon
            color="primary"
            onClick={() => {
              likePost(props.post._id);
            }}
          />
          <Typography color="primary" className="twatContent">
            {likes}
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
