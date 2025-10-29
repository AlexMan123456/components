import type { DisallowUndefined } from "@alextheman/utility";
import type { ReactNode } from "react";
import type { LoaderProviderProps } from "src/providers";

import CircularProgress from "@mui/material/CircularProgress";

import { LoaderError, LoaderProvider } from "src/providers";
import LoaderData from "src/providers/LoaderProvider/LoaderData";

export type LoaderProps<T> = Omit<LoaderProviderProps<T>, "children"> & {
  /** The elements to show after data has been loaded.
   * This is best provided as a function with a data argument that guarantees the data will not be undefined by the time you receive it here.
   */
  children: ReactNode | ((data: DisallowUndefined<T>) => ReactNode);
  /** A function to run if the data is undefined and not loading. This may either return React components or nothing. */
  onUndefined?: () => ReactNode | void;
};

/** An in-line component that deals with state management when fetching data from an API.
 * This may be used over LoaderProvider if you don't require as much control over the placement of the error message and data display.
 */
function Loader<T>({
  children,
  onUndefined,
  loadingComponent = <CircularProgress />,
  ...loaderProviderProps
}: LoaderProps<T>) {
  return (
    <LoaderProvider<T> loadingComponent={loadingComponent} {...loaderProviderProps}>
      <LoaderError />
      <LoaderData<T> onUndefined={onUndefined}>{children}</LoaderData>
    </LoaderProvider>
  );
}

export default Loader;
