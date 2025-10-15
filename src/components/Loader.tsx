import type { DisallowUndefined } from "@alextheman/utility";
import type { ReactNode } from "react";
import type { LoaderProviderProps } from "src/providers";

import CircularProgress from "@mui/material/CircularProgress";

import { LoaderError, LoaderProvider } from "src/providers";
import LoaderData from "src/providers/LoaderProvider/LoaderData";

export type LoaderProps<T> = Omit<LoaderProviderProps<T>, "children"> & {
  children: ReactNode | ((data: DisallowUndefined<T>) => ReactNode);
  onUndefined?: () => ReactNode | void;
};

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
