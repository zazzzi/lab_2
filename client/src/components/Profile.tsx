import { Box, makeStyles, Typography } from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useContext } from "react";
import { PostContext, Post } from "./context/postsContext";
import Twat from "./Twat";
import PostField from "./PostField";

// function Profile() {
//   const classes = useStyles();

//   const { posts } = useContext(PostContext);
//   return (
//     <>
//       <Box>
//         <PostField />
//       </Box>
//       <Box className={classes.rootStyle}>
//         <Box>
//           {posts
//             .map((p: any, i) => (
//               <Box key={i} className={classes.twatContainer}>
//                 {/* <Twat post={p} /> */}
//               </Box>
//             ))
//             .reverse()}
//         </Box>
//       </Box>
//     </>
//   );
// }

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

// export default Profile;