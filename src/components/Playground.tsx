import { stripIndent } from "common-tags";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";

export interface PlaygroundProps {
  code: string;
  scope: Record<string, unknown>;
}

function Playground({ code, scope }: PlaygroundProps) {
  return (
    <LiveProvider code={stripIndent(code)} scope={scope}>
      <LivePreview />
      <LiveError />
      <br />
      <LiveEditor />
    </LiveProvider>
  );
}

export default Playground;
