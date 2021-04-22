import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
        main: '#D79922'
    },
    secondary: {
        main: '#F13C20',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      'Roboto',
      '"Segoe UI"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h6: {
      fontSize: 14,
    },
    h5: {
      fontSize: 18,

    },
    body1: {
      fontSize: 18,
      fontStyle: 'italic',
    }
  },
});