import type { ReactNode } from "react";

import CircularProgress from "@mui/material/CircularProgress";
import { createContext, useContext } from "react";

export interface LoaderProviderBaseProps<T> {
  isLoading: boolean;
  data?: T;
  loadingComponent?: ReactNode;
}

export interface LoaderProviderPropsWithNoError<T> extends LoaderProviderBaseProps<T> {
  error?: never;
  errorComponent?: never;
}

export interface LoaderProviderPropsWithError<T> extends LoaderProviderBaseProps<T> {
  error: unknown;
  errorComponent?: ReactNode | ((error: unknown) => ReactNode);
}

export type LoaderContextValue<T> =
  | LoaderProviderPropsWithNoError<T>
  | LoaderProviderPropsWithError<T>;
export type LoaderProviderProps<T> = LoaderContextValue<T> & { children: ReactNode };

const LoaderContext = createContext<LoaderContextValue<unknown> | undefined>(undefined);
export function useLoader<T>(): LoaderContextValue<T> {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error("LOADER_CONTEXT_NOT_SET");
  }
  return context as LoaderContextValue<T>;
}

function LoaderProvider<T>({
  children,
  loadingComponent = <CircularProgress />,
  ...contextProps
}: LoaderProviderProps<T>) {
  return (
    <LoaderContext.Provider value={{ loadingComponent, ...contextProps }}>
      {children}
    </LoaderContext.Provider>
  );
}

export default LoaderProvider;
