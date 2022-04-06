import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#03a3a8',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#8E6386',
      contrastText: '#ffffff',
    },
    background: {
      default: '#000000',
      paper: '#1a1a1a',
    },
    error: {
      main: '#ff0000',
    },
  },
});

export default theme