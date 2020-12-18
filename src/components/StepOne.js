import React, { useCallback } from "react";
import { parse } from "papaparse";
import { useDropzone } from "react-dropzone";
//mui
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import UploadIcon from "@material-ui/icons/CloudUpload";
import useStyles from "../stepStyles";

const StepOne = ({ setContacts, handleNext, setFilename, setKeys }) => {
  const classes = useStyles();
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length === 1) {
        acceptedFiles.forEach(async (file) => {
          const text = await file.text();
          const result = parse(text, { header: true });
          if (result.data.length > 0) {
            setFilename(file.name);
            setContacts(result.data);
            setKeys(Object.keys(result.data[0]));
            handleNext();
          }
        });
      } else {
        return;
      }
    },
    [setFilename, setContacts, handleNext, setKeys]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".csv, application/vnd.ms-excel, text/csv",
  });

  const openFile = () => {
    document.getElementById("fileUpload").click();
  };

  return (
    <div className={classes.fileInputWrapper}>
      <div {...getRootProps()}>
        <input {...getInputProps()} id="fileUpload" />
        <UploadIcon color="primary" classes={{ root: classes.iconRoot }} />
      </div>
      <Typography variant="h5">Upload Spreadsheet</Typography>
      <Typography variant="body2" color="textSecondary">
        CSV, XLS, XLSX or ODS
      </Typography>
      <Button
        size="large"
        variant="contained"
        style={{ marginTop: 16 }}
        onClick={openFile}
        color="secondary"
      >
        Select file
      </Button>
    </div>
  );
};

export default StepOne;
