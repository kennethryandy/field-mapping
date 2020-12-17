import { useState } from "react";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const StepFour = ({ newContact }) => {
  const [value, setValue] = useState("update_empty");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleConfirm = () => {
    //JSON newContact
    if (value === "update_empty") {
      //Update them with the data in the spreadsheet, but only for fields that are empty
    } else if (value === "update_value") {
      //Update them with the data in the spreadsheet, including fields that already have a value.
    } else if (value === "dont_update") {
      //Don't modify them.
    } else {
      return;
    }
  };

  return (
    <div>
      <FormControl component="fieldset">
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
            control={<Radio />}
            label="Update them with the data in the spreadsheet, but only for fields that are empty (recommended)."
          />
          <FormControlLabel
            value="update_value"
            control={<Radio />}
            label="Update them with the data in the spreadsheet, including fields that already have a value."
          />
          <FormControlLabel
            value="dont_update"
            control={<Radio />}
            label="Don't modify them."
          />
        </RadioGroup>
      </FormControl>
      <div>
        <Button onClick={handleConfirm} variant="contained">
          import {newContact.length} contacts
        </Button>
      </div>
    </div>
  );
};

export default StepFour;
