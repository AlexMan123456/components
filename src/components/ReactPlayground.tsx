import Box from "@mui/material/Box";
import { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { stripIndent } from "common-tags";
import { useContext } from "react";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";
import { ModeContext } from "src/contexts";

export interface ReactPlaygroundProps {
  code: string;
  scope?: Record<string, unknown>;
  previewStyles?: SxProps<Theme>;
  noInline?: boolean;
}

function ReactPlayground({
  code,
  scope,
  previewStyles,
  noInline,
}: ReactPlaygroundProps) {
  const { mode } = useContext(ModeContext);
  const defaultPreviewStyles: SxProps<Theme> = {
    backgroundColor: mode === "dark" ? "black" : "white",
    border: 0.3,
    borderRadius: 1,
    paddingX: 2,
    borderColor: "darkgray",
  };
  const allPreviewStyles = previewStyles
    ? { ...defaultPreviewStyles, ...previewStyles }
    : { ...defaultPreviewStyles };
  return (
    <Box sx={{ borderRadius: 1, border: 0.5, padding: 2 }}>
      <LiveProvider code={stripIndent(code)} scope={scope} noInline={noInline}>
        <Typography variant="h5">Code</Typography>
        <Box
          sx={{
            border: 0.3,
            borderRadius: 0.3,
            borderColor: "darkgray",
          }}
        >
          <LiveEditor />
        </Box>
        <br />
        <Typography variant="h5">Result</Typography>
        <Box sx={allPreviewStyles}>
          <LivePreview />
          <LiveError />
        </Box>
      </LiveProvider>
    </Box>
  );
}

export default ReactPlayground;
