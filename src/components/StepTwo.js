import React, { useEffect, useState } from "react";
import { parse } from "papaparse";
import useOnclickOutside from "react-cool-onclickoutside";
//mui
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CheckIcon from "@material-ui/icons/Check";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import ErrorIcon from "@material-ui/icons/Error";
import MuiLink from "@material-ui/core/Link";
import useStyles from "../stepStyles";

const StepTwo = ({
  input,
  setInput,
  contacts,
  filename,
  newFields,
  setNewFields,
  handleNext,
  handleBack,
  setNewContact,
  keys,
  setContacts,
  setFilename,
  setKeys,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState({});
  const [search, setSearch] = useState("");
  const [openAdd, setOpenAdd] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [autoPilotField, setAutoPilotField] = useState([
    "Name",
    "Email",
    "Phone number",
    "Date",
    "_id",
  ]);
  const [filteredField, setFilteredField] = useState([]);
  const ref = useOnclickOutside(() => handleClose());

  useEffect(() => {
    setLoading(true);
    //Ajax call
    // setAutoPilotField(response)
    setLoading(false);
  }, [setAutoPilotField]);

  useEffect(() => {
    setFilteredField(
      autoPilotField?.filter((field) =>
        field.toLowerCase().includes(search?.toLowerCase() || "")
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
    if (Object.keys(newFields).length === keys.length) {
      const newContact = contacts.map((contact) =>
        renameKeys(newFields, contact)
      );
      setNewContact(newContact);
      handleNext();
    } else {
      setError(true);
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

  const truncate = function (fullStr, strLen, separator) {
    if (fullStr.length <= strLen) return fullStr;

    separator = separator || "...";

    var sepLen = separator.length,
      charsToShow = strLen - sepLen,
      frontChars = Math.ceil(charsToShow / 2),
      backChars = Math.floor(charsToShow / 2);

    return (
      fullStr.substr(0, frontChars) +
      separator +
      fullStr.substr(fullStr.length - backChars)
    );
  };

  const openFile = () => {
    document.getElementById("file").click();
  };

  const handleFileChange = (e) => {
    setFilename(e.target.files[0].name);
    e.target.files[0].text().then((text) => {
      const result = parse(text, { header: true });
      if (result.data.length > 0) {
        setContacts(result.data);
        setKeys(Object.keys(result.data[0]));
      }
    });
  };

  return (
    <div>
      <div className={classes.stepperSpacer} />
      {!loading && (
        <>
          <input
            type="file"
            hidden={true}
            id="file"
            onChange={handleFileChange}
            accept="text/csv"
          />
          <div style={{ margin: "8px 24px" }}>
            <Typography variant="h6">
              Found {contacts.length} conacts in:
            </Typography>
          </div>
          <div className={classes.fileHead}>
            <div className={classes.file}>
              <div>
                <CheckIcon />
              </div>
              <Typography variant="body1">{truncate(filename, 16)}</Typography>
            </div>
            <div>
              <MuiLink onClick={openFile} style={{ cursor: "pointer" }}>
                <Typography variant="body2">Upload different file</Typography>
              </MuiLink>
            </div>
          </div>
          <div className={classes.table}>
            <Grid container>
              <Grid item>
                <div className={classes.fields}>
                  <div className={classes.keys}>
                    <Typography variant="body1" className={classes.thead}>
                      Spreadsheet Field
                    </Typography>
                  </div>
                  <div
                    className={classes.input}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Typography variant="body1" className={classes.thead}>
                      Autopilot Field
                    </Typography>
                  </div>
                </div>
                {keys.map((key, i) => (
                  <div className={classes.fields} key={i}>
                    <div className={classes.keys}>
                      <Typography variant="body1">{key}</Typography>
                      <ArrowRightAltIcon />
                    </div>
                    <div className={classes.input}>
                      {openAdd[key] ? (
                        <div className={classes.addCustomField}>
                          <InputBase
                            autoComplete="off"
                            fullWidth
                            type="text"
                            name={`add${key}`}
                            value={input[`add${key}`]}
                            placeholder="Custom field"
                            onBlur={() => {
                              if (input[`add${key}`]) {
                                setSearch("");
                                setNewFields((prevState) => ({
                                  ...prevState,
                                  [key]: input[`add${key}`],
                                }));
                                setAutoPilotField((prevState) => [
                                  ...prevState,
                                  input[`add${key}`],
                                ]);
                              }
                            }}
                            onChange={handleAddCustomFieldChange}
                            endAdornment={
                              <IconButton
                                onClick={() => setOpen({ [key]: true })}
                              >
                                <RemoveCircleIcon
                                  onClick={() => handleRemoveAdd(key)}
                                />
                              </IconButton>
                            }
                          />
                        </div>
                      ) : (
                        <InputBase
                          type="text"
                          name={key}
                          value={input[key]}
                          onFocus={() => setOpen({ [key]: true })}
                          onChange={handleChange}
                          placeholder="Select field"
                          autoComplete="off"
                          fullWidth
                          onBlur={() => {
                            setSearch("");
                            if (!(autoPilotField.indexOf(input[key]) > -1)) {
                              setInput((prevState) => ({
                                ...prevState,
                                [key]: "",
                              }));
                            }
                          }}
                          endAdornment={
                            <IconButton
                              onClick={() => setOpen({ [key]: true })}
                            >
                              <UnfoldMoreIcon />
                            </IconButton>
                          }
                        />
                      )}
                      {open[key] && (
                        <Paper
                          elevation={3}
                          className={classes.dropdown}
                          ref={ref}
                        >
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
                            {filteredField.map((field, i) => (
                              <ListItem
                                button
                                divider
                                onClick={() => handleSelect(key, field)}
                                key={i}
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
                <div className={classes.btns}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    onClick={confirmFields}
                    color="secondary"
                  >
                    Continue
                  </Button>
                </div>
              </Grid>
            </Grid>
          </div>
        </>
      )}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        classes={{
          root: classes.snackbarError,
        }}
        open={error}
        autoHideDuration={3000}
        onClose={() => setError(false)}
        message={
          <div style={{ display: "flex", alignItems: "center" }}>
            <ErrorIcon />
            <Typography variant="body1" style={{ marginLeft: 16 }}>
              Please fill all the field to continue.
            </Typography>
          </div>
        }
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => setError(false)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      ></Snackbar>
    </div>
  );
};

export default StepTwo;
