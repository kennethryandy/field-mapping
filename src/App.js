import React, { useState } from "react";
//mui
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import useStyles, { theme } from "./styles";
import { ThemeProvider } from "@material-ui/core/styles";
//components
import StepOne from "./components/StepOne";
import StepTwo from "./components/StepTwo";
import StepThree from "./components/StepThree";
import StepFour from "./components/StepFour";

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
  const [keys, setKeys] = useState([]);
  const [input, setInput] = useState({});
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
            setFilename={setFilename}
            setKeys={setKeys}
            handleNext={handleNext}
            classes={classes}
          />
        );
      case 1:
        return (
          <StepTwo
            contacts={contacts}
            setContacts={setContacts}
            setFilename={setFilename}
            setKeys={setKeys}
            filename={filename}
            setNewFields={setNewFields}
            newFields={newFields}
            handleNext={handleNext}
            handleBack={handleBack}
            setNewContact={setNewContact}
            input={input}
            setInput={setInput}
            keys={keys}
          />
        );
      case 2:
        return (
          <StepThree
            newContact={newContact}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        );
      case 3:
        return <StepFour newContact={newContact} handleBack={handleBack} />;
      default:
        return "Unknown step";
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Paper elevation={3} className={classes.stepperPaper}>
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
        </Paper>
        <div style={{ height: "100%" }}>
          {activeStep === steps.length ? (
            //When reach last steps
            <div>Finish</div>
          ) : (
            getStepContent(activeStep)
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}
