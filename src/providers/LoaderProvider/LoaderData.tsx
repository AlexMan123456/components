import type { ReactNode } from "react";

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
}

export interface LoaderDataPropsOnNullable<T> extends LoaderDataBaseProps<T> {
  onUndefined?: never;
  onNull?: never;
  /** A function to run if the data is undefined or null, and not loading. This may either return React components or nothing.
   * @deprecated Please use the nullableComponent prop on LoaderError instead */
  onNullable: () => ReactNode | void;
}

export interface LoaderDataPropsOnUndefinedOrNull<T> extends LoaderDataBaseProps<T> {
  /** A function to run if the data is undefined and not loading. This may either return React components or nothing.
   * @deprecated Please use the nullableComponent prop on LoaderError instead */
  onUndefined?: () => ReactNode | void;
  /** A function to run if the data is null and not loading. This may either return React components or nothing.
   * @deprecated Please use the nullableComponent prop on LoaderError instead */
  onNull?: () => ReactNode | void;
  onNullable?: never;
}

export type LoaderDataProps<T> = LoaderDataPropsOnUndefinedOrNull<T> | LoaderDataPropsOnNullable<T>;

/** The component responsible for showing the data provided by LoaderProvider. */
function LoaderData<T>({
  children,
  dataParser: loaderDataParser,
  loadingComponent,
  onNullable,
  onUndefined,
  onNull,
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
    if (onNullable) {
      const result = onNullable();
      return result ?? <></>;
    }

    if (data === undefined && onUndefined) {
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
