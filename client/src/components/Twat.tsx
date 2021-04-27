import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import React, { useContext, useEffect, useState } from "react";
import {
  makeStyles,
  Typography,
  Avatar,
  Box,
  Tooltip,
  Badge,
  Zoom,
  Modal,
  Menu,
  MenuItem,
  Button,
} from "@material-ui/core";
import { PostContext, Post } from "./context/postsContext";
import moment from "moment";
import YouTube from "react-youtube";
import getVideoId from "get-video-id";
import { LinkedCameraRounded } from "@material-ui/icons";
import EditTwat from "./EditTwat";

interface Props {
  post: Post;
}

function Twat(props: Props) {
  const [likes, setLikes] = useState(props.post.likes);
  const [liked, updateLikes] = useState(false);
  const classes = useStyles();
  const { posts, deletePost, likePost } = useContext(PostContext);
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEdit] = useState(false);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setLikes((likes) => likes + (liked ? 1 : -1));
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
  if (diff >= 24) {
    diff = today.diff(momentObj, "days");
    timeShort = "d";
  }

  let postContent = props.post.content;
  const youtubeLink = postContent.includes("https://www.youtube.com/watch?v=");
  const videoID = getVideoId(postContent);

  const opts = {
    height: "190",
    width: "350",
  };
  return (
    <Box className={classes.rootStyle}>
      <Box className={classes.twatContainer}>
        <Box className={classes.avatarContainer}>
          <Avatar className={classes.avatarLarge}>
            {props.post.name.toUpperCase().slice(0, 1)}
          </Avatar>
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
                  {diff <= 0 ? "Just now" : [diff, timeShort]}
                </Typography>
              </Tooltip>
            </Box>
          </Box>
          <Box className={classes.moreIcon}>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreHorizIcon color="primary" />
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  handleClose();

                  handleModalOpen();
                }}
              >
                <Typography color={"secondary"}>Edit</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  deletePost(props.post._id);
                }}
              >
                <Typography color={"secondary"}>Delete</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        {/* Twat editing modal */}
        <Modal
          className={classes.modal}
          open={isModalOpen}
          onClose={handleModalClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <Box>
            <EditTwat twatID={props.post._id} handleClose={handleModalClose} />
          </Box>
        </Modal>

        <Box className={classes.twatContent}>
          {youtubeLink ? (
            <>
              <Box mb={3}>
                <YouTube videoId={videoID.id!.toString()} opts={opts} />
              </Box>
              <Box>
                <Typography color="primary">{props.post.content}</Typography>
              </Box>
            </>
          ) : (
            <Typography color="primary">{props.post.content}</Typography>
          )}
        </Box>
        <Box
          className={classes.likeIcon}
          onClick={() => {
            likePost(props.post._id, liked);
            updateLikes((liked) => !liked);
          }}
        >
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
            <ThumbUpIcon color="primary" />
          </Badge>
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
    backgroundColor: "#1DA1F2",
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
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarBackground: {
    background: "secondary",
  },
}));

export default Twat;
