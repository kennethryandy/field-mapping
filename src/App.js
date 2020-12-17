import { useState } from "react";
//mui
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
//components
import StepOne from "./components/StepOne";
import StepTwo from "./components/StepTwo";
import StepThree from "./components/StepThree";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
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
  return ["Upload Spreadsheet", "Map Fields", "Confirm Mappings"];
}

export default function App() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [contacts, setContacts] = useState([]);
  const [newFields, setNewFields] = useState({});
  const [filename, setFilename] = useState("");
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

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
            setContacts={setContacts}
            filename={filename}
            setNewFields={setNewFields}
            newFields={newFields}
            handleNext={handleNext}
          />
        );
      case 2:
        return <StepThree contacts={contacts} />;
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
              "Confirm you've correctly mapped your fields. Below is the first contact in your spreadsheet.";
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
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
          </div>
        ) : (
          getStepContent(activeStep)
        )}
      </div>
    </div>
  );
}
