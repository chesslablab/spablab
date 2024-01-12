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
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: 'transparent',
          },
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
