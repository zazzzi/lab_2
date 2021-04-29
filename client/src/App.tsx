import { Box, makeStyles, ThemeProvider } from "@material-ui/core";
import { useEffect, useState } from "react";
import PostProvider from "./components/context/postsContext";
import ProfileProvider from "./components/context/profileContext";
import Header from "./components/Header";
import PostField from "./components/PostField";
import TwatWrapper from "./components/TwatWrapper";
import Profile from "./components/Profile";
import { theme } from "./providers/ThemeProvider";
import { Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
export interface Session {
  length: number;
  userName: string;
  id: string;
  name: string;
  role: string;
}

function App() {
  const classes = useStyles();
  const [session, setSession] = useState<any>([] as Session[]);

  useEffect(() => {
    const loadSession = async () => {
      const response = await fetch(`api/authenticated`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      })
      const result = await response.json();
      setSession(result)
    };
    loadSession();
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Route exact path="/">
          <Box className={classes.rootStyle}>
            <ProfileProvider session={session}>
              <Header session={session} />
            </ProfileProvider>
            <PostProvider session={session}>
              <PostField />
              <TwatWrapper session={session}/>
            </PostProvider>
          </Box>
        </Route>

        <Route path="/profile">
          <Box className={classes.rootStyle}>
            <ProfileProvider session={session}>
              <Header session={session} />
            </ProfileProvider>
            <PostProvider session={session}>
              <Profile session={session} />
            </PostProvider>
          </Box>
        </Route>
      </ThemeProvider>
    </BrowserRouter>
  );
}

const useStyles = makeStyles(() => ({
  rootStyle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "black",
  },
}));
export default App;
