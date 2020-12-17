import { useState } from "react";
//mui
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
//components
import StepOne from "./components/StepOne";
import StepTwo from "./components/StepTwo";
import StepThree from "./components/StepThree";
import StepFour from "./components/StepFour";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "space-between",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));
function getSteps() {
  return [
    "Upload Spreadsheet",
    "Map Fields",
    "Confirm Mappings",
    "Select Duplicate Strategy",
  ];
}

export default function App() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [contacts, setContacts] = useState([]);
  const [newFields, setNewFields] = useState({});
  const [filename, setFilename] = useState("");
  const [newContact, setNewContact] = useState([]);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <StepOne
            setContacts={setContacts}
            handleNext={handleNext}
            setFilename={setFilename}
          />
        );
      case 1:
        return (
          <StepTwo
            contacts={contacts}
            filename={filename}
            setNewFields={setNewFields}
            newFields={newFields}
            handleNext={handleNext}
            setNewContact={setNewContact}
          />
        );
      case 2:
        return <StepThree newContact={newContact} />;
      case 3:
        return <StepFour newContact={newContact} />;
      default:
        return "Unknown step";
    }
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (index === 0) {
            labelProps.optional = "File must be CSV, XLS, XLSX or ODS";
          }
          if (index === 1) {
            labelProps.optional =
              "Map the fields in your spreadsheet to Autopilot's Fields.";
          }
          if (index === 2) {
            labelProps.optional =
              "Confirm you've correctly mapped your fields.";
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>
                <strong>Step {index + 1}:</strong> {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep !== 0 && (
        <Button variant="contained" onClick={handleBack}>
          Back
        </Button>
      )}
      <div>
        {activeStep === steps.length ? (
          <div>//When reach last steps</div>
        ) : (
          getStepContent(activeStep)
        )}
      </div>
    </div>
  );
}
