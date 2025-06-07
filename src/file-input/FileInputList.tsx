import Box from "@mui/material/Box";
import { Dispatch, SetStateAction } from "react";
import FileInput from "./FileInput";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemText from "@mui/material/ListItemText";

interface FileInputListProps {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
  accept?: string[];
}

function FileInputList({ files, setFiles, accept }: FileInputListProps) {
  function onChange(newFiles: File[]) {
    setFiles((oldFiles) => {
      return [...oldFiles, ...newFiles];
    });
  }

  return (
    <Box>
      <FileInput onChange={onChange} accept={accept} multiple={true} />
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
