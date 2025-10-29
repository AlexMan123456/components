import type { DisallowUndefined } from "@alextheman/utility";
import type { ReactNode } from "react";

import { useRef } from "react";

import { useLoader } from "src/providers/LoaderProvider";

export interface LoaderDataProps<T> {
  /** The elements to show after data has been loaded.
   * This is best provided as a function with a data argument that guarantees the data will not be undefined by the time you receive it here.
   */
  children: ReactNode | ((data: DisallowUndefined<T>) => ReactNode);
  /** A parser for the data. */
  dataParser?: (data: unknown) => T;
  /** The component to show when the data is being fetched. */
  loadingComponent?: ReactNode;
  /** A function to run if the data is undefined and not loading. This may either return React components or nothing. */
  onUndefined?: () => ReactNode | void;
  /** An option to show the children of this component if an error has been thrown. */
  showOnError?: boolean;
}

/** The component responsible for showing the data provided by LoaderProvider. */
function LoaderData<T>({
  children,
  dataParser: loaderDataParser,
  loadingComponent,
  onUndefined,
  showOnError,
}: LoaderDataProps<T>) {
  const {
    isLoading,
    data,
    dataParser: contextDataParser,
    loadingComponent: contextLoadingComponent,
    error,
  } = useLoader<T>();
  const warnedOnce = useRef(false);

  const dataParser = loaderDataParser ?? contextDataParser;

  if (isLoading) {
    return <>{loadingComponent ?? contextLoadingComponent}</>;
  }

  if (error && !showOnError) {
    return <></>;
  }

  // No need to also check for isLoading === true here, since this was covered earlier
  if (data === undefined) {
    if (!warnedOnce.current) {
      console.warn(
        "Data is undefined after loading. This could either be an issue with the query or you have not passed in the data to LoaderProvider. Please double-check that you have provided data.",
      );
      warnedOnce.current = true;
    }

    if (onUndefined) {
      const result = onUndefined();
      return result ?? <></>;
    }
    return <></>;
  }

  if (dataParser) {
    return typeof children === "function" ? (
      <>{children(dataParser(data) as DisallowUndefined<T>)}</>
    ) : (
      <>{children}</>
    );
  }

  return typeof children === "function" ? (
    <>{children(data as DisallowUndefined<T>)}</>
  ) : (
    <>{children}</>
  );
}

export default LoaderData;
