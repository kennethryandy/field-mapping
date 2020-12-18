import { makeStyles, createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  palette: {
    secondary: {
      light: "#33eb91",
      main: "#00e676",
      dark: "#00a152",
      contrastText: "#fff",
    },
  },
  mixins: {
    toolbar: { minHeight: 120 },
  },
});

export default makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100vh",
  },
  stepperPaper: {
    position: "fixed",
    width: "100%",
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));
