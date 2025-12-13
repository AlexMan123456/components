import type { OptionalOnCondition } from "@alextheman/utility";
import type { ReactNode } from "react";
import type { ContextHookOptions } from "src/types";

import CircularProgress from "@mui/material/CircularProgress";
import { createContext, useContext } from "react";

export interface LoaderProviderBaseProps<DataType> {
  /** The current loading status (true if loading, false if not) */
  isLoading: boolean;
  /** The data being loaded. */
  data?: DataType;
  /** A parser for the data. */
  dataParser?: (data: unknown) => NonNullable<DataType>;
  /** The component to show when the data is being fetched. */
  loadingComponent?: ReactNode;
}

export interface LoaderProviderPropsWithNoError<
  DataType,
> extends LoaderProviderBaseProps<DataType> {
  error?: never;
  errorComponent?: never;
  logError?: never;
}

export interface LoaderProviderPropsWithError<DataType> extends LoaderProviderBaseProps<DataType> {
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

export function useLoader<DataType, Strict extends boolean = true>({
  strict = true as Strict,
}: ContextHookOptions<Strict> = {}): OptionalOnCondition<Strict, LoaderContextValue<DataType>> {
  const context = useContext(LoaderContext);
  if (strict && !context) {
    throw new Error("LOADER_PROVIDER_NOT_FOUND");
  }
  return context as OptionalOnCondition<Strict, LoaderContextValue<DataType>>;
}

/**
 * A provider for a context that deals with state management when fetching data from an API.
 * This may be used over Loader if you require more control over the placement of the error message and data display.
 * @template DataType - The type of data being loaded.
 * @param root0 - Props to pass to LoaderProvider.
 * @param root0.children - The components that may receive access to the LoaderContext value.
 * @param root0.loadingComponent - The component to show when the data is being fetched.
 * @param root0.isLoading - The current loading status (true if loading, false if not)
 * @param root0.error - The error given if the request gave an error.
 * @param root0.errorComponent - The component to show if an error has been thrown. Note that this may not be provided unless the error prop has also been provided.
 * @param root0.logError - An option to log the error to the console. Note that this may not be provided unless the error prop has also been provided.
 */
function LoaderProvider<DataType>({
  children,
  loadingComponent = <CircularProgress />,
  ...contextProps
}: LoaderProviderProps<DataType>) {
  return (
    <LoaderContext.Provider value={{ loadingComponent, ...contextProps }}>
      {children}
    </LoaderContext.Provider>
  );
}

export default LoaderProvider;
