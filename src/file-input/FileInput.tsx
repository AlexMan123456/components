import { Button, styled } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { ChangeEvent } from "react";

export interface FileInputProps {
  onChange: (files: File[]) => void;
  accept?: string[];
  label?: string;
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function FileInput({
  onChange,
  accept = [
    "application/pdf",
    "image/png",
    "image/jpeg",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
  label = "Upload File",
}: FileInputProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const filesArray = Array.from(event.target.files ?? new FileList());
    for (const file of filesArray) {
      if (!accept.includes(file.type)) {
        throw new Error("UNSUPPORTED_FILE_TYPE");
      }
    }
    onChange(filesArray);
  }
  return (
    <Button
      component="label"
      role={undefined}
      variant="outlined"
      tabIndex={-1}
      startIcon={<CloudUpload />}
    >
      {label}
      <VisuallyHiddenInput type="file" onChange={handleChange} multiple />
    </Button>
  );
}

export default FileInput;
