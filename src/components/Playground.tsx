import Typography from "@mui/material/Typography";
import { stripIndent } from "common-tags";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";

export interface PlaygroundProps {
  code: string;
  scope: Record<string, unknown>;
}

function Playground({ code, scope }: PlaygroundProps) {
  return (
    <LiveProvider code={stripIndent(code)} scope={scope}>
      <Typography variant="h5">Result</Typography>
      <LivePreview />
      <LiveError />
      <br />
      <Typography variant="h5">Code</Typography>
      <LiveEditor />
    </LiveProvider>
  );
}

export default Playground;
