import { createMuiTheme } from "@material-ui/core/styles";
import "fontsource-roboto/500.css";
import "fontsource-roboto/";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#D9D9D9",
    },
    secondary: {
      main: "#F13C20",
    },
  },
  typography: {
    fontFamily: ['"Roboto"'].join(","),
    h6: {
      fontSize: 14,
    },
    h5: {
      fontSize: "2rem",
      fontWeight: 500,
    },
    body1: {
      fontSize: "1.2rem",
      color: "#D9D9D9",
    },
    body2: {
      fontsize: "1rem",
      color: "#6E767D",
    },
  },
});
