import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#8bc34a',
      light: '#bef67a',
      dark: ' #5a9216',
      contrastText: '#000000',
    },
    secondary: {
      main: '#00bcd4',
      light: '#62eeff',
      dark: '#008ba3',
      contrastText: '#000000',
    },
  },
});

export default theme;
