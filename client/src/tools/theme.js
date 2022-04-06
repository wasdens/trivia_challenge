import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#773637',
    },
    secondary: {
      main: '#dc7879',
    },
    background: {
      default: '#161616',
      paper: '#000000',
    },
    error: {
      main: '#6d1d17',
    },
    warning: {
      main: '#dc9e39',
    },
    info: {
      main: '#6bb9f9',
    },
    success: {
      main: '#269c2a',
    },
    divider: 'rgba(239,234,234,0.52)',
    
  },
});

export default theme