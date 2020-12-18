import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const StepThree = ({ newContact, handleNext, handleBack, classes }) => {
  return (
    <div>
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
        <Button variant="contained" onClick={handleBack}>
          Back
        </Button>
        <Button variant="contained" onClick={handleNext}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default StepThree;
