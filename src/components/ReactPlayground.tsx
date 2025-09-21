import type { SxProps, Theme } from "@mui/material/styles";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { stripIndent } from "common-tags";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";

import { useMode } from "src/providers";

export interface ReactPlaygroundProps {
  code: string;
  scope?: Record<string, unknown>;
  previewStyles?: SxProps<Theme>;
  noInline?: boolean;
  enableTypeScript?: boolean;
  language?: string;
}

function ReactPlayground({
  code,
  scope,
  previewStyles,
  noInline,
  enableTypeScript,
  language,
}: ReactPlaygroundProps) {
  const { mode } = useMode();
  const defaultPreviewStyles: SxProps<Theme> = {
    backgroundColor: mode === "dark" ? "black" : "white",
    border: 0.3,
    borderRadius: 1,
    padding: 2,
    borderColor: "darkgray",
  };
  const allPreviewStyles = previewStyles
    ? { ...defaultPreviewStyles, ...previewStyles }
    : { ...defaultPreviewStyles };
  return (
    <Box sx={{ borderRadius: 1, border: 0.5, padding: 2 }}>
      <LiveProvider
        code={stripIndent(code)}
        scope={scope}
        noInline={noInline}
        enableTypeScript={enableTypeScript}
        language={language}
      >
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
