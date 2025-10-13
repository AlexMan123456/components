import type { ReactNode } from "react";

import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

interface BaseProps {
  isLoading: boolean;
  children: ReactNode;
  loadingComponent?: ReactNode;
}

interface PropsWithNoError extends BaseProps {
  error?: never;
  errorComponent?: never;
}

interface PropsWithError extends BaseProps {
  error: unknown;
  errorComponent?: ReactNode | ((error: unknown) => ReactNode);
}

export type LoaderProps = PropsWithNoError | PropsWithError;

function Loader({
  isLoading,
  children,
  loadingComponent = <CircularProgress />,
  error,
  errorComponent,
}: LoaderProps) {
  if (isLoading) {
    return <>{loadingComponent}</>;
  }

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

  return <>{children}</>;
}

export default Loader;
