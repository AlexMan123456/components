import type { OptionalOnCondition } from "@alextheman/utility";
import type { ReactNode } from "react";
import type { ContextHookOptions } from "src/types";

import CircularProgress from "@mui/material/CircularProgress";
import { createContext, useContext } from "react";

export interface LoaderProviderBaseProps<T> {
  /** The current loading status (true if loading, false if not) */
  isLoading: boolean;
  /** The data being loaded. */
  data?: T;
  /** A parser for the data. */
  dataParser?: (data: unknown) => NonNullable<T>;
  /** The component to show when the data is being fetched. */
  loadingComponent?: ReactNode;
}

export interface LoaderProviderPropsWithNoError<T> extends LoaderProviderBaseProps<T> {
  error?: never;
  errorComponent?: never;
  logError?: never;
}

export interface LoaderProviderPropsWithError<T> extends LoaderProviderBaseProps<T> {
  /** The error given if the request gave an error. */
  error: unknown;
  /** The component to show if an error has been thrown. Note that this may not be provided unless the error prop has also been provided. */
  errorComponent?: ReactNode | ((error: unknown) => ReactNode);
  /** Whether you want to log the error to the console or not. */
  logError?: boolean;
}

export type LoaderContextValue<T> =
  | LoaderProviderPropsWithNoError<T>
  | LoaderProviderPropsWithError<T>;
export type LoaderProviderProps<T> = LoaderContextValue<T> & { children: ReactNode };

const LoaderContext = createContext<LoaderContextValue<unknown> | undefined>(undefined);

export function useLoader<T, Strict extends boolean = true>({
  strict = true as Strict,
}: ContextHookOptions<Strict> = {}): OptionalOnCondition<Strict, LoaderContextValue<T>> {
  const context = useContext(LoaderContext);
  if (strict && !context) {
    throw new Error("LOADER_PROVIDER_NOT_FOUND");
  }
  return context as OptionalOnCondition<Strict, LoaderContextValue<T>>;
}

/** A provider for a context that deals with state management when fetching data from an API.
 * This may be used over Loader if you require more control over the placement of the error message and data display.
 */
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
