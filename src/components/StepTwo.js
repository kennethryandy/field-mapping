import { useState } from "react";
//mui
import CheckIcon from "@material-ui/icons/Check";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  fields: {
    display: "flex",
  },
  thead: {
    fontWeight: "bold",
  },
  table: {
    margin: theme.spacing(2),
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
    margin: theme.spacing(2),
    height: 60,
    display: "flex",
    alignItems: "center",
    border: "1px solid #33eb91",
    maxWidth: 160,
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
  },
  addList: {
    backgroundColor: "#33eb91",
  },
}));

const StepTwo = ({ contacts, filename, autoPilotField, setAutoPilotField }) => {
  const classes = useStyles();
  const [open, setOpen] = useState({});
  const keys = Object.keys(contacts[0]);

  return (
    <div>
      <div className={classes.fileHead}>
        <div className={classes.file}>
          <div>
            <CheckIcon />
          </div>
          <Typography variant="body1">{filename}</Typography>
        </div>
        <div style={{ marginLeft: 16 }}>
          <Typography variant="body2">Upload different file</Typography>
        </div>
      </div>
      <div className={classes.table}>
        <div className={classes.fields}>
          <div className={classes.keys}>
            <Typography variant="body1" className={classes.thead}>
              Spreadsheet Field
            </Typography>
          </div>
          <div className={classes.input}>
            <Typography variant="body1" className={classes.thead}>
              Autopilot Field
            </Typography>
          </div>
        </div>
        {keys.map((key) => (
          <div className={classes.fields}>
            <div className={classes.keys}>
              <Typography variant="body1">{key}</Typography>
            </div>
            <div className={classes.input}>
              <input
                type="text"
                name={key}
                onFocus={() => setOpen({ [key]: true })}
                onBlur={() => setOpen({ [key]: false })}
              />
              {open[key] && (
                <Paper elevation={3} className={classes.paper}>
                  <List dense>
                    <ListItem button divider className={classes.addList}>
                      <ListItemIcon>
                        <AddCircleIcon />
                      </ListItemIcon>
                      <ListItemText primary="Add Custom Field" />
                    </ListItem>
                    {autoPilotField.map((fields) => (
                      <ListItem button divider>
                        <ListItemText primary={fields} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepTwo;
