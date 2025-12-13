import type { LoaderDataProps, LoaderProviderProps } from "src/providers";
import type { LoaderErrorProps } from "src/providers/LoaderProvider/LoaderError";

import CircularProgress from "@mui/material/CircularProgress";

import { LoaderError } from "src/providers";
import LoaderProvider from "src/providers/LoaderProvider";
import LoaderData from "src/providers/LoaderProvider/LoaderData";

export type LoaderProps<DataType> = Omit<LoaderProviderProps<DataType>, "children" | "logError"> &
  Omit<LoaderErrorProps, "errorComponent" | "children"> &
  Omit<LoaderDataProps<DataType>, "showOnError" | "onUndefined" | "onNull" | "onNullable">;

/**
 * An in-line component that deals with state management when fetching data from an API.
 * This may be used over LoaderProvider if you don't require as much control over the placement of the error message and data display.
 * @template DataType - The type of data being loaded.
 * @param root0 - Props to pass to Loader.
 * @param root0.children - The elements to show after data has been loaded.
 * @param root0.errorComponent - The component to show if an error has been thrown. Note that this may not be provided unless the error prop has also been provided.
 * @param root0.undefinedComponent - The component to show if no error was thrown but the data is undefined.
 * @param root0.nullComponent - The component to show if no error was thrown but the data is null.
 * @param root0.nullableComponent - The component to show if no error was thrown but the data is nullable (undefined or null).
 * @param root0.loadingComponent - The component to show when the data is being fetched.
 * @param root0.logError - An option to log the error to the console.
 */
function Loader<DataType>({
  children,
  errorComponent,
  undefinedComponent,
  nullComponent,
  nullableComponent,
  logError,
  loadingComponent = <CircularProgress />,
  ...loaderProviderProps
}: LoaderProps<DataType>) {
  return (
    <LoaderProvider<DataType> loadingComponent={loadingComponent} {...loaderProviderProps}>
      {/* @ts-expect-error: We need to pass all four to LoaderError for the wrapper to work. It is ok as Loader will then do its own checks to enforce mutual exclusivity, and LoaderError knows how to deal with it anyway. */}
      <LoaderError
        undefinedComponent={undefinedComponent}
        nullComponent={nullComponent}
        nullableComponent={nullableComponent}
        logError={logError}
      >
        {errorComponent}
      </LoaderError>
      <LoaderData<DataType>>{children}</LoaderData>
    </LoaderProvider>
  );
}

export default Loader;
