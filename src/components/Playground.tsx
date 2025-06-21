import Box from "@mui/material/Box";
import { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { stripIndent } from "common-tags";
import { useContext } from "react";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";
import { ModeContext } from "src/contexts";

export interface PlaygroundProps {
  code: string;
  scope: Record<string, unknown>;
  previewStyles?: SxProps<Theme>;
  editorStyles?: SxProps<Theme>;
}

function Playground({
  code,
  scope,
  previewStyles,
  editorStyles,
}: PlaygroundProps) {
  const { mode } = useContext(ModeContext);
  const defaultPreviewStyles: SxProps<Theme> = {
    backgroundColor: mode === "dark" ? "black" : "white",
    border: 0.3,
    borderRadius: 1,
    paddingX: 2,
    borderColor: "darkgray",
  };
  const defaultEditorStyles: SxProps<Theme> = {
    border: 0.3,
    borderRadius: 0.3,
    borderColor: "darkgray",
  };
  const allPreviewStyles = previewStyles
    ? { ...defaultPreviewStyles, ...previewStyles }
    : { ...defaultPreviewStyles };
  const allEditorStyles = editorStyles
    ? { ...defaultEditorStyles, ...editorStyles }
    : { ...defaultEditorStyles };
  return (
    <Box sx={{ borderRadius: 1, border: 0.5, padding: 2 }}>
      <LiveProvider code={stripIndent(code)} scope={scope}>
        <Typography variant="h5">Result</Typography>
        <Box sx={allPreviewStyles}>
          <LivePreview />
        </Box>
        <LiveError />
        <br />
        <Typography variant="h5">Code</Typography>
        <Box sx={allEditorStyles}>
          <LiveEditor />
        </Box>
      </LiveProvider>
    </Box>
  );
}

export default Playground;
