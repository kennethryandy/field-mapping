import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const StepThree = ({ newContact, handleNext }) => {
  let field = [];
  for (let key in newContact[0]) {
    field.push(
      <Typography variant="body1" key={newContact[0][key]}>
        {key} : {newContact[0][key]}
      </Typography>
    );
  }
  return (
    <div>
      <Typography variant="h6">Field Mapping Preview</Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        Below is the first contact in your spreadsheet.
      </Typography>
      {field}
      <pre>{JSON.stringify(newContact, null, 2)}</pre>
      <Button variant="contained" onClick={handleNext}>
        Continue
      </Button>
    </div>
  );
};

export default StepThree;
