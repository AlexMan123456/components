import type { ReactNode } from "react";

import { useLoader } from "src/providers/LoaderProvider/LoaderProvider";

export interface LoaderDataProps<T> {
  /**
   * The elements to show after data has been loaded.
   * This is best provided as a function with a data argument that guarantees the data will not be undefined by the time you receive it here.
   */
  children: ReactNode | ((data: NonNullable<T>) => ReactNode);
  /** A parser for the data. */
  dataParser?: (data: unknown) => NonNullable<T>;
  /** The component to show when the data is being fetched. */
  loadingComponent?: ReactNode;
}

/**
 * The component responsible for showing the data provided by LoaderProvider.
 *
 * @template DataType - The type of data being loaded.
 *
 * @param props - Props to pass to LoaderData.
 * @param props.children - The elements to show after data has been loaded.
 * This is best provided as a function with a data argument that guarantees the data will not be undefined by the time you receive it here.
 * @param props.dataParser - A parser for the data.
 * @param props.loadingComponent - The component to show when the data is being fetched.
 */
function LoaderData<DataType>({
  children,
  dataParser: loaderDataParser,
  loadingComponent,
}: LoaderDataProps<DataType>) {
  const {
    isLoading,
    data,
    dataParser: contextDataParser,
    loadingComponent: contextLoadingComponent,
    error,
  } = useLoader<DataType>();
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
