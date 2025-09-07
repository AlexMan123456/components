import type { Dispatch, SetStateAction } from "react";
import type { FileInputProps } from "src/components/FileInput";

import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import FileInput from "src/components/FileInput";

export interface FileInputListProps extends Omit<FileInputProps, "onFileInput"> {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
}

function FileInputList({ files, setFiles, ...fileInputProps }: FileInputListProps) {
  function onFileInput(newFiles: File[]) {
    setFiles((oldFiles) => {
      return [...oldFiles, ...newFiles];
    });
  }

  const newFileInputProps = { ...fileInputProps, onFileInput };
  if (newFileInputProps?.multiple === undefined) {
    newFileInputProps.multiple = true;
  }

  return (
    <Box>
      <FileInput {...newFileInputProps} />
      <List>
        {files.map((file) => {
          return (
            <ListItem
              key={file.name}
              secondaryAction={
                <IconButton
                  aria-label="Delete"
                  edge="end"
                  onClick={() => {
                    setFiles((oldFiles) => {
                      return oldFiles.filter((fileToDelete) => {
                        return fileToDelete !== file;
                      });
                    });
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={file.name} />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}

export default FileInputList;
