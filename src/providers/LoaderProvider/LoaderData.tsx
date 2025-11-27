import type { ReactNode } from "react";

import { useLoader } from "src/providers/LoaderProvider";

export interface LoaderDataProps<T> {
  /** The elements to show after data has been loaded.
   * This is best provided as a function with a data argument that guarantees the data will not be undefined by the time you receive it here.
   */
  children: ReactNode | ((data: NonNullable<T>) => ReactNode);
  /** A parser for the data. */
  dataParser?: (data: unknown) => NonNullable<T>;
  /** The component to show when the data is being fetched. */
  loadingComponent?: ReactNode;
}

/** The component responsible for showing the data provided by LoaderProvider. */
function LoaderData<T>({
  children,
  dataParser: loaderDataParser,
  loadingComponent,
}: LoaderDataProps<T>) {
  const {
    isLoading,
    data,
    dataParser: contextDataParser,
    loadingComponent: contextLoadingComponent,
    error,
  } = useLoader<T>();
  const dataParser = loaderDataParser ?? contextDataParser;

  if (isLoading) {
    return <>{loadingComponent ?? contextLoadingComponent}</>;
  }

  if (error) {
    return <></>;
  }

  // No need to also check for isLoading === true here, since this was covered earlier
  if (data === null || data === undefined) {
    return <></>;
  }

  if (dataParser) {
    return typeof children === "function" ? <>{children(dataParser(data))}</> : <>{children}</>;
  }

  return typeof children === "function" ? <>{children(data)}</> : <>{children}</>;
}

export default LoaderData;
