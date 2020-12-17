import { useCallback } from "react";
import { parse } from "papaparse";
import { useDropzone } from "react-dropzone";
//mui
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import UploadIcon from "@material-ui/icons/CloudUpload";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    "& h5": {
      fontWeight: "bold",
    },
  },
  iconRoot: {
    fontSize: "5rem",
  },
  btn: {
    marginTop: "1.2rem",
    textTransform: "capitalize",
  },
}));

const StepOne = ({ setContacts, handleNext, setFilename }) => {
  const classes = useStyles();

  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach(async (file) => {
        const text = await file.text();
        const result = parse(text, { header: true });
        setFilename(file.name);
        setContacts(result.data);
        if (result.data.length > 0) {
          handleNext();
        }
      });
    },
    [setFilename, setContacts, handleNext]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".csv, application/vnd.ms-excel, text/csv",
  });

  const openFile = () => {
    document.getElementById("fileUpload").click();
  };

  return (
    <div className={classes.root}>
      <div {...getRootProps()}>
        <input {...getInputProps()} id="fileUpload" />
        <UploadIcon classes={{ root: classes.iconRoot }} />
      </div>
      <Typography variant="h5">Upload Spreadsheet</Typography>
      <Typography variant="body2" color="textSecondary">
        CSV, XLS, XLSX or ODS
      </Typography>
      <Button
        size="large"
        variant="contained"
        className={classes.btn}
        onClick={openFile}
      >
        Select file
      </Button>
    </div>
  );
};

export default StepOne;
