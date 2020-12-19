import React, { useState } from "react";
//mui
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import ErrorIcon from "@material-ui/icons/Error";
import SuccessIcon from "@material-ui/icons/CheckCircleOutline";
import useStyles from "../stepStyles";

const StepFour = ({ newContact, handleBack }) => {
  const classes = useStyles();
  const [value, setValue] = useState("update_empty");
  const [loading, setLoading] = useState(false);
  const [importError, setImportError] = useState("");
  const [importSuccess, setImportSuccess] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleConfirm = () => {
    setLoading(true);
    //JSON newContact
    if (value === "update_empty") {
      //Update them with the data in the spreadsheet, but only for fields that are empty
      // if (res.status === 200) {
      //   setImportSuccess(res.message);
      // } else {
      //   setImportError(res.message);
      // }
    } else if (value === "update_value") {
      //Update them with the data in the spreadsheet, including fields that already have a value.
      // if (res.status === 200) {
      //   setImportSuccess(res.message);
      // } else {
      //   setImportError(res.message);
      // }
    } else if (value === "dont_update") {
      //Don't modify them.
      // if (res.status === 200) {
      //   setImportSuccess(res.message);
      // } else {
      //   setImportError(res.message);
      // }
    } else {
      setLoading(false);
    }
    setLoading(false);
  };

  const handleClose = () => {
    setImportError("");
    setImportSuccess("");
  };

  return (
    <div>
      <div className={classes.stepperSpacer} />
      <Grid container>
        <Grid item>
          <FormControl
            component="fieldset"
            classes={{ root: classes.formRadios }}
          >
            <FormLabel component="legend">
              If an existing contact is in the spreadsheet:
            </FormLabel>
            <RadioGroup
              name="duplicateOptions"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="update_empty"
                control={<Radio color="primary" />}
                label="Update them with the data in the spreadsheet, but only for fields that are empty (recommended)."
              />
              <FormControlLabel
                value="update_value"
                control={<Radio color="primary" />}
                label="Update them with the data in the spreadsheet, including fields that already have a value."
              />
              <FormControlLabel
                value="dont_update"
                control={<Radio color="primary" />}
                label="Don't modify them."
              />
            </RadioGroup>
          </FormControl>
          <div className={classes.btns} style={{ margin: "16px 24px" }}>
            <Button
              onClick={handleBack}
              variant="outlined"
              color="primary"
              disabled={loading}
            >
              Back
            </Button>
            <Button
              onClick={handleConfirm}
              variant="contained"
              color="secondary"
              disabled={loading}
            >
              import {newContact.length} contacts
            </Button>
          </div>
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        classes={{
          root: importError ? classes.snackbarError : classes.snackbarSucess,
        }}
        open={!!importError || !!importSuccess}
        autoHideDuration={3000}
        onClose={handleClose}
        message={
          <div style={{ display: "flex", alignItems: "center" }}>
            {importError ? <ErrorIcon /> : <SuccessIcon />}
            <Typography variant="body1" style={{ marginLeft: 16 }}>
              {importError ? importError : importSuccess}
            </Typography>
          </div>
        }
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      ></Snackbar>
    </div>
  );
};

export default StepFour;
