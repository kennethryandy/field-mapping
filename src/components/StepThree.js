import React from "react";
//mui
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import useStyles from "../stepStyles";

const StepThree = ({ newContact, handleNext, handleBack }) => {
  const classes = useStyles();
  return (
    <div style={{ marginLeft: 24 }}>
      <div className={classes.stepperSpacer} />
      <Grid container>
        <Grid item>
          <Typography variant="h6">Field Mapping Preview</Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Below is the first contact in your spreadsheet.
          </Typography>
          {Object.keys(newContact[0]).map(function (keyName, keyIndex) {
            return (
              <Typography variant="body1" key={keyIndex}>
                {keyName} : {newContact[0][keyName]}
              </Typography>
            );
          })}
          <pre>{JSON.stringify(newContact, null, 2)}</pre>
          <div className={classes.btns}>
            <Button variant="outlined" onClick={handleBack} color="primary">
              Back
            </Button>
            <Button variant="contained" onClick={handleNext} color="secondary">
              Continue
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default StepThree;
