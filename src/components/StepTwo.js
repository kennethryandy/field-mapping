import { useEffect, useState } from "react";
import useOnclickOutside from "react-cool-onclickoutside";
//mui
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CheckIcon from "@material-ui/icons/Check";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
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
}));

const StepTwo = ({
  contacts,
  filename,
  newFields,
  setNewFields,
  handleNext,
  setNewContact,
}) => {
  const classes = useStyles();
  const [input, setInput] = useState({});
  const [keys] = useState(Object.keys(contacts[0]));
  const [open, setOpen] = useState({});
  const [search, setSearch] = useState("");
  const [openAdd, setOpenAdd] = useState({});
  const [autoPilotField, setAutoPilotField] = useState([
    "Name",
    "Phone",
    "Email",
    "Phone number",
    "Date",
  ]);
  const [filteredField, setFilteredField] = useState([]);
  const ref = useOnclickOutside(() => handleClose());

  useEffect(() => {
    setFilteredField(
      autoPilotField?.filter((field) =>
        field.toLowerCase().includes(search?.toLowerCase())
      )
    );
  }, [search, autoPilotField]);

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    setSearch(e.target.value);
  };

  const handleSelect = (key, field) => {
    setNewFields((prevState) => ({
      ...prevState,
      [key]: field,
    }));
    setInput((prevState) => ({
      ...prevState,
      [key]: field,
    }));
    handleClose();
  };

  const handleOpenAdd = (key) => {
    setOpenAdd((prevState) => ({ ...prevState, [key]: true }));
    setInput((prevState) => ({ ...prevState, [key]: "" }));
    setOpen({});
  };

  const confirmFields = () => {
    console.log(newFields, contacts[0]);
    if (Object.keys(newFields).length === keys.length) {
      const newContact = contacts.map((contact) =>
        renameKeys(newFields, contact)
      );
      setNewContact(newContact);
      handleNext();
    }
  };

  const renameKeys = (keysMap, obj) =>
    Object.keys(obj).reduce((acc, key) => {
      return {
        ...acc,
        ...{ [keysMap[key] || key]: obj[key] },
      };
    }, {});

  const handleClose = () => {
    setOpen({});
  };

  const handleAddCustomFieldChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRemoveAdd = (key) => {
    setOpenAdd((prevState) => ({
      ...prevState,
      [key]: false,
    }));
    const updatedObj = delete newFields[key];
    setNewFields(updatedObj);
  };

  return (
    <div>
      <div style={{ margin: "0px 16px" }}>
        <Typography variant="h6">
          Found {contacts.length} conacts in:
        </Typography>
      </div>
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
        {keys.map((key, i) => (
          <div className={classes.fields} key={i}>
            <div className={classes.keys}>
              <Typography variant="body1">{key}</Typography>
            </div>
            <div className={classes.input}>
              {openAdd[key] ? (
                <div className={classes.addCustomField}>
                  <input
                    type="text"
                    name={`add${key}`}
                    value={input[`add${key}`]}
                    placeholder="Custom field"
                    onBlur={() => {
                      setNewFields((prevState) => ({
                        ...prevState,
                        [key]: input[`add${key}`],
                      }));
                      setAutoPilotField((prevState) => [
                        ...prevState,
                        input[`add${key}`],
                      ]);
                    }}
                    onChange={handleAddCustomFieldChange}
                  />
                  <RemoveCircleIcon onClick={() => handleRemoveAdd(key)} />
                </div>
              ) : (
                <input
                  type="text"
                  name={key}
                  value={input[key]}
                  onFocus={() => setOpen({ [key]: true })}
                  onChange={handleChange}
                  placeholder="Select field"
                  autoComplete="off"
                  onBlur={() => {
                    setSearch("");
                    if (!(autoPilotField.indexOf(input[key]) > -1)) {
                      setInput((prevState) => ({ ...prevState, [key]: "" }));
                    }
                  }}
                />
              )}
              {open[key] && (
                <Paper elevation={3} className={classes.paper} ref={ref}>
                  <List dense>
                    <ListItem
                      button
                      divider
                      className={classes.addList}
                      onClick={() => handleOpenAdd(key)}
                    >
                      <ListItemIcon>
                        <AddCircleIcon />
                      </ListItemIcon>
                      <ListItemText primary="Add Custom Field" />
                    </ListItem>
                    {filteredField.map((field) => (
                      <ListItem
                        button
                        divider
                        onClick={() => handleSelect(key, field)}
                      >
                        <ListItemText primary={field} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              )}
            </div>
          </div>
        ))}
      </div>
      <Button variant="contained" onClick={confirmFields}>
        Continue
      </Button>
    </div>
  );
};

export default StepTwo;
