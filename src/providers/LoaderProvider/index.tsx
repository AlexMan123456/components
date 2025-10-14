import type { ReactNode } from "react";

import CircularProgress from "@mui/material/CircularProgress";
import { createContext, useContext } from "react";

interface BaseProps {
  isLoading: boolean;
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

export type LoaderContextValue = PropsWithNoError | PropsWithError;
export type LoaderProviderProps = LoaderContextValue & { children: ReactNode };

const LoaderContext = createContext<LoaderContextValue | undefined>(undefined);
export function useLoader() {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error("LOADER_CONTEXT_NOT_SET");
  }
  return context;
}

function LoaderProvider({
  children,
  loadingComponent = <CircularProgress />,
  ...contextProps
}: LoaderProviderProps) {
  return (
    <LoaderContext.Provider value={{ loadingComponent, ...contextProps }}>
      {children}
    </LoaderContext.Provider>
  );
}

export default LoaderProvider;
