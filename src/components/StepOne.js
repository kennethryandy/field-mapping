import { useCallback } from "react";
import { parse } from "papaparse";
import { useDropzone } from "react-dropzone";
//mui
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import UploadIcon from "@material-ui/icons/CloudUpload";

const StepOne = ({ setContacts, handleNext, setFilename, classes }) => {
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
    <div className={classes.fileInputWrapper}>
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
