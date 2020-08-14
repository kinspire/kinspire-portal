import { createMuiTheme } from "@material-ui/core";

export const portalTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#FFFFFF",
    },
    secondary: { main: "#262626" },
  },
  typography: {
    fontFamily: "Rajdhani",
    fontSize: 20,
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
        fontSize: 65,
        textAlign: "center",
        paddingBottom: "3%",
        color: "#FFFFFF",
        fontWeight: 600,
      },
      h3: {
        fontSize: 50,
        color: "#FFFFFF",
        borderBottom: "1px solid #FFFFFF",
        marginBottom: "3%",
      },
      h4: {
        fontSize: 38,
        fontWeight: 800,
        letterSpacing: "1px",
        padding: "3% 0%",
        textAlign: "center",
      },
      h5: {
        fontSize: 30,
        fontWeight: 500,
        letterSpacing: "1px",
        padding: "3% 0%",
      },
      h6: {
        fontSize: 14,
        color: "#908e8d",
      },
    },
    MuiButton: {
      root: {
        boxShadow: "2px 2px 8px -5px #888888",
        borderRadius: "4px",
        margin: "3% 0%",
      },
      text: {
        padding: "4px 30px",
        fontSize: 22,
        letterSpacing: "1px",
        color: "white",
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
