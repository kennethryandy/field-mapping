import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  fileInputWrapper: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    "& h5": {
      fontWeight: "bold",
    },
  },
  iconRoot: {
    fontSize: "5rem",
  },
  btn: {
    marginTop: "1.2rem",
    textTransform: "capitalize",
  },
  fields: {
    display: "flex",
  },
  thead: {
    fontWeight: "bold",
  },
  table: {
    margin: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
  },
  keys: {
    width: 240,
    padding: "12px 8px",
    border: "1px solid grey",
  },
  input: {
    width: 240,
    padding: "12px 8px",
    border: "1px solid grey",
    "& input": {
      width: "100%",
      padding: "6px 0px",
    },
    position: "relative",
  },
  fileHead: {
    display: "flex",
    alignItems: "center",
  },
  file: {
    margin: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
    height: 60,
    display: "flex",
    alignItems: "center",
    border: "1px solid #33eb91",
    // maxWidth: 160,
    "& div": {
      backgroundColor: "#33eb91",
      height: "100%",
      "& svg": {
        height: "100%",
        margin: `0px ${theme.spacing(2)}px`,
        color: "#fff",
        fontSize: "1.8rem",
      },
    },
    "& p": {
      margin: `0px ${theme.spacing(2)}px`,
    },
  },
  paper: {
    zIndex: 999,
    position: "absolute",
    width: "95%",
    maxHeight: 200,
    overflowY: "scroll",
  },
  addList: {
    backgroundColor: "#33eb91",
  },
  addCustomField: {
    display: "flex",
    alignItems: "center",
    "& svg": {
      cursor: "pointer",
    },
  },
  btns: {
    margin: theme.spacing(1),
    "& button": {
      margin: `0px ${theme.spacing(2)}px`,
    },
  },
  formRadios: {
    margin: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
  },
}));
