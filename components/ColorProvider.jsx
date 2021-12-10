import { ThemeProvider, createTheme } from "@mui/material/styles";

const themeOptions = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#00164a",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

const ColorProvider = ({ children }) => {
  return (
    <>
      <ThemeProvider theme={themeOptions}>{children}</ThemeProvider>
    </>
  );
};

export default ColorProvider;
