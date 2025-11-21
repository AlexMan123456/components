import type { LoaderDataProps, LoaderProviderProps } from "src/providers";
import type { LoaderErrorProps } from "src/providers/LoaderProvider/LoaderError";

import CircularProgress from "@mui/material/CircularProgress";

import { LoaderError, LoaderProvider } from "src/providers";
import LoaderData from "src/providers/LoaderProvider/LoaderData";

export type LoaderProps<T> = Omit<LoaderProviderProps<T>, "children"> &
  Omit<LoaderErrorProps, "errorComponent"> &
  Omit<LoaderDataProps<T>, "showOnError" | "onUndefined" | "onNull" | "onNullable">;

/** An in-line component that deals with state management when fetching data from an API.
 * This may be used over LoaderProvider if you don't require as much control over the placement of the error message and data display.
 */
function Loader<T>({
  children,
  errorComponent,
  undefinedComponent,
  nullComponent,
  nullableComponent,
  loadingComponent = <CircularProgress />,
  ...loaderProviderProps
}: LoaderProps<T>) {
  return (
    <LoaderProvider<T> loadingComponent={loadingComponent} {...loaderProviderProps}>
      {/* @ts-expect-error: We need to pass all four to LoaderError for the wrapper to work. It is ok as Loader will then do its own checks to enforce mutual exclusivity, and LoaderError knows how to deal with it anyway. */}
      <LoaderError
        undefinedComponent={undefinedComponent}
        nullComponent={nullComponent}
        nullableComponent={nullableComponent}
      >
        {errorComponent}
      </LoaderError>
      <LoaderData<T>>{children}</LoaderData>
    </LoaderProvider>
  );
}

export default Loader;
