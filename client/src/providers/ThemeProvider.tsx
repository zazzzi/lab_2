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
      fontSize: 18,
      fontStyle: "italic",
    },
  },
});
