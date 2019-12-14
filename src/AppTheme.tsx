import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import React from "react";

const defaultTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#000",
    },
    secondary: {
      main: "#000",
    },
  },
  typography: {
    fontFamily: "Rajdhani",
    fontSize: 24,
  },
  overrides: {
    MuiTypography: {
      root: {
        textOverflow: "ellipsis",
        // overflow: "hidden",
      },
    },
  },
});

export default ({ children }: React.PropsWithChildren<{}>) => (
  <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>
);
