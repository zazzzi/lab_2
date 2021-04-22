import { Box, makeStyles, Typography } from '@material-ui/core';
import { responseInterceptor } from 'http-proxy-middleware';
import React, { useEffect, useState } from 'react';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

function TwatWrapper() {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const url = "http://localhost:6969/api/posts"
  const array = ["hello", "hi", "wuddup"]

  useEffect( () => {
    const loadPosts = async () => {
      const response = await fetch(url)
      const posts = await response.json();
      setPosts(posts)
    }
    loadPosts()
  }, [])

  return (
       <Box className={classes.rootStyle}>
         {posts.map((p:any, i) => (
          <Box key={i}>
            <img/>
            <Typography>{p.author}</Typography>
            <Typography>{p.content}</Typography>
            <ThumbUpIcon color="action"/>
            <Typography>{p.likes}</Typography>
            <MoreHorizIcon color="action"/>
          </Box>
        ))}
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