import type { ButtonOwnProps } from "@mui/material/Button";
import type { SxProps, Theme } from "@mui/material/styles";
import type { ReactNode } from "react";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useEffect, useMemo, useState } from "react";

export enum FileType {
  PDF = ".pdf",
  PNG = ".png",
  JPEG = ".jpeg",
  JPG = ".jpg",
  XLSX = ".xlsx",
  DOCX = ".docx",
  MP3 = ".mp3",
  MP4 = ".mp4",
  WAV = ".wav",
}

export interface FileInputProps {
  onChange: (allowedFiles: File[]) => void;
  onReject?: (forbiddenFiles: File[], defaultErrorMessage: string) => void;
  accept?: (FileType | string)[];
  label?: string;
  multiple?: boolean;
  variant?: ButtonOwnProps["variant"];
  disabled?: boolean;
  useDropzone?: boolean;
  buttonSx?: SxProps<Theme>;
  startIcon?: ReactNode;
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

const Dropzone = styled("div")<{ $dragging: boolean }>(({ theme, $dragging }) => {
  return {
    border: "2px dashed",
    borderColor: $dragging ? theme.palette.primary.main : "#ccc",
    backgroundColor: $dragging ? theme.palette.action.hover : "transparent",
    borderRadius: 8,
    padding: "1.5rem",
    textAlign: "center",
    transition: "border-color 0.2s",
    cursor: "pointer",
  };
});

interface FileInputButtonProps {
  variant: ButtonOwnProps["variant"];
  label: string;
  handleFiles: (filesArray: File[]) => void;
  multiple?: boolean;
  accept: string;
  disabled?: boolean;
  startIcon?: ReactNode;
  sx?: SxProps<Theme>;
}

function FileInputButton({
  variant,
  label,
  handleFiles,
  multiple,
  accept,
  disabled,
  startIcon,
  sx,
}: FileInputButtonProps) {
  return (
    <Button
      component="label"
      aria-label="File upload button"
      variant={variant}
      startIcon={startIcon}
      disabled={disabled}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          document.getElementById("file-input")?.click();
        }
      }}
      sx={sx}
    >
      {label}
      <VisuallyHiddenInput
        id="file-input"
        type="file"
        onChange={(event) => {
          const input = event.target;
          handleFiles(Array.from(input.files ?? []));
          input.value = "";
        }}
        multiple={multiple}
        accept={accept}
        disabled={disabled}
      />
    </Button>
  );
}

function FileInput({
  onChange,
  onReject,
  accept = Object.values(FileType),
  label = "Upload File",
  multiple,
  variant = "contained",
  disabled,
  useDropzone = true,
  startIcon = <CloudUploadIcon />,
  buttonSx,
}: FileInputProps) {
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const fileExtensionsToFileMimes: Record<string, string[]> = {
    ".pdf": ["application/pdf"],
    ".png": ["image/png"],
    ".jpeg": ["image/jpeg", "image/jpg"],
    ".jpg": ["image/jpeg", "image/jpg"],
    ".xlsx": ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
    ".docx": ["application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
    ".mp3": ["audio/mp3", "audio/mpeg"],
    ".mp4": ["video/mp4"],
    ".wav": ["audio/wav"],
  };

  const supportedFileExtensions = Object.keys(fileExtensionsToFileMimes);
  const supportedFileMimes = Object.values(fileExtensionsToFileMimes).flat(1);

  const memoisedAccept = useMemo(() => {
    return [...accept].sort();
  }, [JSON.stringify(accept)]);

  const {
    allowedFileMimes,
    allowedUnsupportedFileMimes,
    allowedUnsupportedFileExtensions,
    invalidFileTypes,
  } = useMemo(() => {
    const invalidFileTypes: string[] = [];
    const allowedFileMimes: string[] = [];
    const allowedUnsupportedFileMimes: string[] = [];
    const allowedUnsupportedFileExtensions: string[] = [];
    for (const incomingFileType of memoisedAccept) {
      const normalisedFileType = incomingFileType.toLowerCase();
      if (fileExtensionsToFileMimes[normalisedFileType]) {
        allowedFileMimes.push(...fileExtensionsToFileMimes[normalisedFileType]);
      } else if (
        !supportedFileMimes.includes(normalisedFileType) &&
        !supportedFileExtensions.includes(normalisedFileType)
      ) {
        if (normalisedFileType.includes("/")) {
          allowedFileMimes.push(normalisedFileType);
          allowedUnsupportedFileMimes.push(normalisedFileType);
        } else if (normalisedFileType[0] === "." && !normalisedFileType.slice(1).includes(".")) {
          allowedUnsupportedFileExtensions.push(normalisedFileType);
        } else {
          invalidFileTypes.push(normalisedFileType);
        }
      }
    }
    return {
      allowedFileMimes,
      allowedUnsupportedFileMimes,
      allowedUnsupportedFileExtensions,
      invalidFileTypes,
    };
  }, [memoisedAccept]);

  useEffect(() => {
    for (const invalidFileType of invalidFileTypes) {
      console.error(`ERROR: ${invalidFileType} is not a valid file extension or MIME type.`);
    }
    for (const unsupportedFileType of [
      ...allowedUnsupportedFileMimes,
      ...allowedUnsupportedFileExtensions,
    ]) {
      console.warn(`WARNING: The file type ${unsupportedFileType} is not natively supported.`);
    }
  }, [allowedUnsupportedFileMimes, allowedUnsupportedFileExtensions, invalidFileTypes]);

  function handleFiles(filesArray: File[]) {
    const allowedFiles = [];
    const forbiddenFiles = [];

    for (const file of filesArray) {
      const fileExtension = `.${file.name.split(".")[file.name.split(".").length - 1]}`;
      if (allowedFileMimes.includes(file.type)) {
        allowedFiles.push(file);
      } else if (
        allowedUnsupportedFileMimes.includes(file.type) ||
        allowedUnsupportedFileExtensions.includes(fileExtension)
      ) {
        allowedFiles.push(file);
      } else {
        forbiddenFiles.push(file);
      }
    }
    if (forbiddenFiles.length !== 0) {
      const defaultErrorMessage = [
        "The following files did not match the expected format and will therefore not be accepted:",
        ...forbiddenFiles.map((file) => {
          return `    - ${file.name}`;
        }),
      ].join("\n");
      if (onReject) {
        onReject(forbiddenFiles, defaultErrorMessage);
      } else {
        alert(defaultErrorMessage);
      }
    }
    onChange(allowedFiles);
  }

  const fileInputButtonProps = {
    variant,
    label,
    handleFiles,
    multiple,
    accept: memoisedAccept.join(","),
    disabled,
    startIcon,
    sx: buttonSx,
  };

  return useDropzone ? (
    <Dropzone
      $dragging={isDragging}
      onDragOver={(event) => {
        event.preventDefault();
        if (disabled) {
          return;
        }
        setIsDragging(true);
      }}
      onDragLeave={(event) => {
        event.preventDefault();
        setIsDragging(false);
      }}
      onDrop={(event) => {
        event.preventDefault();
        setIsDragging(false);
        if (disabled) {
          return;
        }
        const filesArray = Array.from(event.dataTransfer.files ?? []);
        handleFiles(filesArray);
      }}
    >
      <FileInputButton {...fileInputButtonProps} />
    </Dropzone>
  ) : (
    <FileInputButton {...fileInputButtonProps} />
  );
}

export default FileInput;
