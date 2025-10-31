import type { ReactNode } from "react";

import { useRef } from "react";

import { useLoader } from "src/providers/LoaderProvider";

export interface LoaderDataBaseProps<T> {
  /** The elements to show after data has been loaded.
   * This is best provided as a function with a data argument that guarantees the data will not be undefined by the time you receive it here.
   */
  children: ReactNode | ((data: NonNullable<T>) => ReactNode);
  /** A parser for the data. */
  dataParser?: (data: unknown) => NonNullable<T>;
  /** The component to show when the data is being fetched. */
  loadingComponent?: ReactNode;
  /** An option to show the children of this component if an error has been thrown. */
  showOnError?: boolean;
}

export interface LoaderDataPropsOnNullable<T> extends LoaderDataBaseProps<T> {
  onUndefined?: never;
  onNull?: never;
  /** A function to run if the data is undefined or null, and not loading. This may either return React components or nothing. */
  onNullable: () => ReactNode | void;
}

export interface LoaderDataPropsOnUndefinedOrNull<T> extends LoaderDataBaseProps<T> {
  /** A function to run if the data is undefined and not loading. This may either return React components or nothing. */
  onUndefined?: () => ReactNode | void;
  /** A function to run if the data is null and not loading. This may either return React components or nothing. */
  onNull?: () => ReactNode | void;
  onNullable?: never;
}

export type LoaderDataProps<T> = LoaderDataPropsOnUndefinedOrNull<T> | LoaderDataPropsOnNullable<T>;

const UNDEFINED_MESSAGE =
  "Data is undefined after loading. This could either be an issue with the query or you have not passed in the data to LoaderProvider. Please double-check that you have provided data.";

/** The component responsible for showing the data provided by LoaderProvider. */
function LoaderData<T>({
  children,
  dataParser: loaderDataParser,
  loadingComponent,
  onNullable,
  onUndefined,
  onNull,
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
  if (!data) {
    if (onNullable) {
      if (data === undefined && !warnedOnce.current) {
        console.warn(UNDEFINED_MESSAGE);
        warnedOnce.current = true;
      }
      const result = onNullable();
      return result ?? <></>;
    }

    if (data === undefined && onUndefined) {
      if (!warnedOnce.current) {
        console.warn(UNDEFINED_MESSAGE);
        warnedOnce.current = true;
      }
      const result = onUndefined();
      return result ?? <></>;
    }

    if (data === null && onNull) {
      const result = onNull();
      return result ?? <></>;
    }
    return <></>;
  }

  if (dataParser) {
    return typeof children === "function" ? <>{children(dataParser(data))}</> : <>{children}</>;
  }

  return typeof children === "function" ? <>{children(data)}</> : <>{children}</>;
}

export default LoaderData;
