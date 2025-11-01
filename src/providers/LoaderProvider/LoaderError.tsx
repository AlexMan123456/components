import type { ReactNode } from "react";

import Alert from "@mui/material/Alert";
import { useRef } from "react";

import { useLoader } from "src/providers/LoaderProvider";

export interface LoaderErrorBaseProps {
  /** The component to show if an error has been thrown. */
  errorComponent?: ReactNode | ((error: unknown) => ReactNode);
}

export interface LoaderErrorPropsWithUndefinedOrNull extends LoaderErrorBaseProps {
  /** The component to show if no error was thrown but data is undefined */
  undefinedComponent?: ReactNode;
  /** The component to show if no error was thrown but data is null */
  nullComponent?: ReactNode;
  /** The component to show if no error was thrown but data is undefined or null */
  nullableComponent?: never;
}

export interface LoaderErrorPropsWithNullable extends LoaderErrorBaseProps {
  undefinedComponent?: never;
  nullComponent?: never;
  nullableComponent?: ReactNode;
}

export type LoaderErrorProps = LoaderErrorPropsWithUndefinedOrNull | LoaderErrorPropsWithNullable;

const UNDEFINED_MESSAGE =
  "Data is undefined after loading. This could either be an issue with the query or you have not passed in the data to LoaderProvider. Please double-check that you have provided data.";

/** The component responsible for showing any errors provided by LoaderProvider. */
function LoaderError({
  errorComponent: propsErrorComponent,
  undefinedComponent,
  nullComponent,
  nullableComponent,
}: LoaderErrorProps) {
  const { data, error, errorComponent: contextErrorComponent } = useLoader();
  const warnedOnce = useRef(false);

  const errorComponent = propsErrorComponent ?? contextErrorComponent;

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

  if (data === null || data === undefined) {
    if (nullableComponent) {
      return <>{nullableComponent}</>;
    }

    if (data === undefined && undefinedComponent) {
      if (!warnedOnce.current) {
        console.warn(UNDEFINED_MESSAGE);
        warnedOnce.current = true;
      }
      return <>{undefinedComponent}</>;
    }

    if (data === null && nullComponent) {
      return <>{nullComponent}</>;
    }

    return <Alert severity="error">Failed to load data. Please try again later.</Alert>;
  }

  return <></>;
}

export default LoaderError;
