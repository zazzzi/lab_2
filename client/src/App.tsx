import { Box, makeStyles, ThemeProvider } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import PostProvider from "./components/context/postsContext";
import ProfileProvider from "./components/context/profileContext"
import Header from "./components/Header";
import PostField from "./components/PostField";
import TwatWrapper from "./components/TwatWrapper";
import { theme } from "./providers/ThemeProvider";

export interface Session {
  userName: string;
  id: string;
  name: string;
  role: string;
}

function App() {
  const classes = useStyles();
  const [session, setSession] = useState<any>([] as Session[])

  useEffect(() => {
    const loadSession = async () => {
      const decodedString = await JSON.parse(atob(getCookie('session')));
      setSession(decodedString)
    }
    loadSession()
  }, [])
  
  function getCookie(cname: string) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.rootStyle}>
        <ProfileProvider>
          <Header />
        </ProfileProvider>
          <PostProvider session={session}>
            <PostField />
            <TwatWrapper />
          </PostProvider>
      </Box>
    </ThemeProvider>
  );
}

const useStyles = makeStyles((theme) => ({
  rootStyle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "black",
  },
}));
export default App;
