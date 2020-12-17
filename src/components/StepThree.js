import Typography from "@material-ui/core/Typography";

const StepThree = ({ contacts }) => {
  let field = [];
  for (let key in contacts[0]) {
    field.push(
      <Typography variant="body1" key={key}>
        {key} : {contacts[0][key]}
      </Typography>
    );
  }
  return (
    <div>
      <Typography variant="h6">Field Mapping Preview</Typography>
      {field}
    </div>
  );
};

export default StepThree;
