import { createTheme } from '@material-ui/core/styles';
// import createBreakpoints from '@material-ui/core/styles/createBreakpoints';

// const breakpoints = createBreakpoints({});

const theme = createTheme({
  palette: {
    primary: {
      main: '#303E4E',
      dark: '#303E4E',
    },
    secondary: {
      main: '#303E4E',
      dark: '#303E4E',
    },
    error: {
      main: '#f05452',
    },
    warning: {
      main: '#FC9300',
    },
    info: {
      main: '#3BB2FC',
    },
    success: {
      main: '#18A871',
    },
  },

  spacing: (factor) => [0, '0.5rem', '1rem', '1.5rem', '2rem', '3rem'][factor],

  typography: {
    fontFamily: ['Inter', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"'].join(','),
  },
});

export default theme;
