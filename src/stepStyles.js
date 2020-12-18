import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  stepperSpacer: theme.mixins.toolbar,
  fileInputWrapper: {
    height: "100%",
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
  fields: {
    backgroundColor: "rgba(51, 235, 145, .09)",
    display: "flex",
  },
  thead: {
    fontWeight: "bold",
  },
  table: {
    margin: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
  },
  keys: {
    display: "flex",
    width: 240,
    padding: "12px 8px",
    border: "1px solid grey",
    alignItems: "center",
    justifyContent: "space-between",
    "& svg": {
      color: "#bdbdbd",
    },
  },
  input: {
    width: 320,
    padding: "0px 8px",
    paddingLeft: 24,
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
  dropdown: {
    zIndex: 999,
    position: "absolute",
    width: "100%",
    left: 0,
    maxHeight: 200,
    overflowY: "scroll",
    "&::-webkit-scrollbar-thumb": {
      background: "#bdbdbd",
      borderRadius: 999,
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#f1f1f1",
    },
    "&::-webkit-scrollbar": {
      width: 8,
    },
  },
  addList: {
    backgroundColor: "#33eb91 !important",
  },
  addCustomField: {
    display: "flex",
    alignItems: "center",
    "& svg": {
      cursor: "pointer",
    },
  },
  btns: {
    margin: `${theme.spacing(2)}px 0px`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  formRadios: {
    margin: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
  },
  snackbarError: {
    "& .MuiSnackbarContent-root": {
      backgroundColor: "#f44336",
    },
  },
  snackbarSucess: {
    "& .MuiSnackbarContent-root": {
      backgroundColor: "#4caf50",
    },
  },
}));
