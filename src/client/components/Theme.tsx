import { createMuiTheme, withTheme } from "@material-ui/core";

export const portalTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#FFFFFF",
    },
    secondary: { main: "#262626" },
  },
  typography: {
    fontFamily: "Rajdhani",
    fontSize: 15,
  },
  overrides: {
    MuiTypography: {
      root: {
        textOverflow: "ellipsis",
        overflowWrap: "break-word",
      },
      h1: {
        fontSize: 75,
        color: "#FFFFFF",
        textAlign: "center",
        paddingBottom: "3%",
      },
      h2: {
        fontSize: 60,
        textAlign: "center",
        paddingBottom: "3%",
        color: "#FFFFFF",
        fontWeight: 600,
      },
      h3: {
        fontSize: 40,
        color: "#FFFFFF",
        borderBottom: "1px solid #FFFFFF",
        marginBottom: "3%",
      },
      h4: {
        fontSize: 25,
        fontWeight: 600,
        letterSpacing: "1px",
        padding: "3% 0%",
      },
    },
    MuiLink: {
      root: {
        fontFamily: "Rajdhani",
        color: "#FFFFFF",
      },
    },
    MuiButton: {
      root: {
        boxShadow: "2px 2px 8px -5px #888888",
        borderRadius: "4px",
      },
      text: {
        padding: "4px 30px",
        fontSize: 25,
        letterSpacing: "1px",
      },
    },
    MuiTextField: {
      root: {
        backgroundColor: "white",
        width: "100%",
      },
    },
  },
});
