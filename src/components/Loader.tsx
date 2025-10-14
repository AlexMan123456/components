import type { LoaderProviderProps } from "src/providers";

import CircularProgress from "@mui/material/CircularProgress";

import { LoaderContent, LoaderError, LoaderProvider } from "src/providers";

export type LoaderProps = LoaderProviderProps;

function Loader({
  children,
  loadingComponent = <CircularProgress />,
  ...loaderProviderProps
}: LoaderProps) {
  return (
    <LoaderProvider loadingComponent={loadingComponent} {...loaderProviderProps}>
      <LoaderError />
      <LoaderContent>{children}</LoaderContent>
    </LoaderProvider>
  );
}

export default Loader;
