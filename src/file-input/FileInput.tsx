import { Button, styled } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { ChangeEvent } from "react";

export interface FileInputProps {
  onChange: (files: File[]) => void;
  accept?: string[];
  label?: string;
  multiple?: boolean;
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
  multiple = false,
}: FileInputProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const filesArray = Array.from(event.target.files ?? new FileList());
    onChange(filesArray);
  }
  return (
    <Button
      component="label"
      role={undefined}
      variant="outlined"
      startIcon={<CloudUpload />}
    >
      {label}
      <VisuallyHiddenInput
        type="file"
        onChange={handleChange}
        multiple={multiple}
        accept={accept.join(",")}
      />
    </Button>
  );
}

export default FileInput;
