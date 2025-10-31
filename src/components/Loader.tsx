import type { LoaderDataProps, LoaderProviderProps } from "src/providers";

import CircularProgress from "@mui/material/CircularProgress";

import { LoaderError, LoaderProvider } from "src/providers";
import LoaderData from "src/providers/LoaderProvider/LoaderData";

export type LoaderProps<T> = Omit<LoaderProviderProps<T>, "children"> &
  Omit<LoaderDataProps<T>, "showOnError">;

/** An in-line component that deals with state management when fetching data from an API.
 * This may be used over LoaderProvider if you don't require as much control over the placement of the error message and data display.
 */
function Loader<T>({
  children,
  onUndefined,
  onNull,
  onNullable,
  loadingComponent = <CircularProgress />,
  ...loaderProviderProps
}: LoaderProps<T>) {
  return (
    <LoaderProvider<T> loadingComponent={loadingComponent} {...loaderProviderProps}>
      <LoaderError />
      {/* @ts-expect-error: We need to pass all three to LoaderData for the wrapper to work. It is ok as Loader will then do its own checks to enforce mutual exclusivity, and LoaderData knows how to deal with it anyway. */}
      <LoaderData<T> onUndefined={onUndefined} onNull={onNull} onNullable={onNullable}>
        {children}
      </LoaderData>
    </LoaderProvider>
  );
}

export default Loader;
