import lightGreen from 'material-ui/colors/lightGreen';
import amber from 'material-ui/colors/amber';
import indigo from 'material-ui/colors/indigo';

export default {
  palette: {
    primary: {
      light: indigo[200],
      main: indigo[700],
      dark: indigo[900],
      contrastText: '#fff',
    },
    secondary: {
      light: amber[300],
      main: amber[500],
      dark: amber[700],
      contrastText: '#000',
    },
    success: {
      light: lightGreen[300],
      main: lightGreen[500],
      dark: lightGreen[700],
      contrastText: '#fff',
    },
    warning: {
      light: amber[300],
      main: amber[500],
      dark: amber[700],
      contrastText: '#fff',
    },
  },
};
