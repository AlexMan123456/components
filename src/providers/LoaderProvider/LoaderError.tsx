import type { ReactNode } from "react";

import Alert from "@mui/material/Alert";
import { useRef } from "react";

import { useLoader } from "src/providers/LoaderProvider/LoaderProvider";

export interface LoaderErrorBaseProps {
  /** The component to show if an error has been thrown. */
  children?: ReactNode | ((error: unknown) => ReactNode);
  /** An option to log the error to the console. */
  logError?: boolean;
}

export interface LoaderErrorPropsWithUndefinedOrNull extends LoaderErrorBaseProps {
  /** The component to show if no error was thrown but data is undefined */
  undefinedComponent?: ReactNode;
  /** The component to show if no error was thrown but data is null */
  nullComponent?: ReactNode;
  nullableComponent?: never;
}

export interface LoaderErrorPropsWithNullable extends LoaderErrorBaseProps {
  undefinedComponent?: never;
  nullComponent?: never;
  /** The component to show if no error was thrown but data is undefined or null */
  nullableComponent?: ReactNode;
}

export type LoaderErrorProps = LoaderErrorPropsWithUndefinedOrNull | LoaderErrorPropsWithNullable;

/**
 * The component responsible for showing any errors provided by LoaderProvider.
 * @param root0 - The props to be passed to LoaderError.
 * @param root0.children - The component to show if an error has been thrown.
 * @param root0.undefinedComponent - The component to show if no error was thrown but the data is undefined.
 * @param root0.nullComponent - The component to show if no error was thrown but the data is null.
 * @param root0.nullableComponent - The component to show if no error was thrown but the data is nullable (undefined or null).
 * @param root0.logError - An option to log the error to the console.
 */
function LoaderError({
  children,
  undefinedComponent,
  nullComponent,
  nullableComponent,
  logError: propsLogError,
}: LoaderErrorProps) {
  const {
    isLoading,
    data,
    error,
    errorComponent: contextErrorComponent,
    logError: contextLogError,
  } = useLoader();
  const logError = propsLogError ?? contextLogError;
  const warnedOnce = useRef(false);

  const errorComponent = children ?? contextErrorComponent;

  if (error) {
    if (logError && !warnedOnce.current) {
      console.error(error);
      warnedOnce.current = true;
    }
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

  if (!isLoading && (data === null || data === undefined)) {
    if (nullableComponent) {
      if (logError && !warnedOnce.current) {
        console.error("Data is nullable after loading.");
        warnedOnce.current = true;
      }
      return <>{nullableComponent}</>;
    }

    if (data === undefined) {
      if (logError && !warnedOnce.current) {
        console.error(
          "Data is undefined after loading. This could either be an issue with the query or you have not passed in the data to LoaderProvider. Please double-check that you have provided data.",
        );
        warnedOnce.current = true;
      }

      if (undefinedComponent) {
        return <>{undefinedComponent}</>;
      }
    }

    if (data === null) {
      if (logError && !warnedOnce.current) {
        console.error("Data is null after loading.");
        warnedOnce.current = true;
      }

      if (nullComponent) {
        return <>{nullComponent}</>;
      }
    }

    return <Alert severity="error">Failed to load data. Please try again later.</Alert>;
  }

  return <></>;
}

export default LoaderError;
