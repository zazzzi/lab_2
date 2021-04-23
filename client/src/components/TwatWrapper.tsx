
import { Box, makeStyles, Typography } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useContext } from 'react';
import { PostContext, Post } from './context/postsContext';

function TwatWrapper() {
  const classes = useStyles();
  const {posts, deletePost, likePost} = useContext(PostContext)
  console.log(posts)
  return (
    <Box className={classes.rootStyle}>
      {posts
        .map((p: any, i) => (
          <Box key={i}>
            <img />
            <Typography>{p.author}</Typography>

            <Typography>{p.content}</Typography>
            <ThumbUpIcon 
              color="action" 
              onClick={() => {
                likePost(p._id)
              }} 
            />
            <Typography>{p.likes}</Typography>
            <MoreHorizIcon 
              color="action"
              onClick={() => {
                deletePost(p._id)
              }} 
            />
          </Box>
        ))
        .reverse()}
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  rootStyle: {
    height: "200rem",
    width: "20rem",
    background: "grey",
  },
  headerWrapper: {},
}));

export default TwatWrapper;

