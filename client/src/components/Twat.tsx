import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useContext, useEffect, useState } from "react";
import {
  makeStyles,
  Typography,
  Avatar,
  Box,
  Tooltip,
  Badge,
  Zoom,
} from "@material-ui/core";
import { PostContext, Post } from "./context/postsContext";
import catProfile from "../assets/images/Cat-Profile.png";
import moment from "moment";

interface Props {
  post: Post;
}

function Twat(props: Props) {
  const [likes, setLikes] = useState(props.post.likes);
  const [liked, updateLikes] = useState(false);
  const classes = useStyles();
  const { posts, deletePost, likePost, unlikePost } = useContext(PostContext);

  useEffect(() => {
    setLikes(likes => likes + (liked ? 1 : -1));
  }, [liked]);

  const today = moment();
  const timeOfPost = props.post.date;
  const momentObj = moment(timeOfPost);
  let timeShort = "m";
  let diff = today.diff(momentObj, "minutes");
  if (diff >= 60) {
    diff = today.diff(momentObj, "hours");
    timeShort = "h";
  }
  if (diff >= 1440) {
    diff = today.diff(momentObj, "days");
    timeShort = "d";
  }

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
              <Tooltip title={timeOfPost} arrow TransitionComponent={Zoom}>
                <Typography variant="body2">
                  {diff}
                  {timeShort}
                </Typography>
              </Tooltip>
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
          <Badge
            max={999}
            overlap="circle"
            badgeContent={likes}
            color="secondary"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <ThumbUpIcon
              color="primary"
              onClick={() => {
                updateLikes(liked => !liked)
                likePost(props.post._id)
              }}
            />
          </Badge>
        </Box>
      </Box>
    </Box>
  );
}

// function hoverDate(props: Props) {
//   const today = moment();
//   const timeOfPost = props.post.date;
//   const momentObj = moment(timeOfPost);
//   let timeShort = "m";
//   let diff = today.diff(momentObj, "minutes");
//   if (diff > 59) {
//     diff = today.diff(momentObj, "hours");
//     timeShort = "h";
//   }
// }

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
