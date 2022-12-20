import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
      },
    },
  },
  typography: {
    fontFamily: [
    'Montserrat',
    'Helvetica',
    'Arial',
    'sans-serif',
    ].join(','),
  },
});

export default theme;
