import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";

export const ThemeModeProvider = ({ children, theme }) => {
  const darkTheme = useSelector(state => state.nav.dialogs.settings.fields.darkTheme);
  const mode = darkTheme === 'on' ? 'dark' : 'light';
  theme = createTheme({
    ...theme,
    palette: {
      mode
    }
  })
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}