import Alert from "@mui/material/Alert";

import { useLoader } from "src/providers/LoaderProvider";

function LoaderError() {
  const { error, errorComponent } = useLoader();

  if (error) {
    if (typeof errorComponent === "function") {
      return errorComponent(error);
    }
    if (errorComponent) {
      return <>{errorComponent}</>;
    }
    return (
      <Alert severity="error">
        {(error as Error)?.message ?? "An unknown error has occured. Please try again later."}
      </Alert>
    );
  }

  return <></>;
}

export default LoaderError;
