import type { SxProps, Theme } from "@mui/material/styles";
import type { ComponentProps } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { stripIndent } from "common-tags";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";

import { useMode } from "src/providers";

export interface ReactPlaygroundProps extends ComponentProps<typeof LiveProvider> {
  previewStyles?: SxProps<Theme>;
}

function ReactPlayground({ code, previewStyles, ...liveProviderProps }: ReactPlaygroundProps) {
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
      <LiveProvider {...liveProviderProps} code={stripIndent(code ?? "")}>
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
