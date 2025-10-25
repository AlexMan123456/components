import type { DisallowUndefined } from "@alextheman/utility";
import type { ReactNode } from "react";

import { useRef } from "react";

import { useLoader } from "src/providers/LoaderProvider";

export interface LoaderDataProps<T> {
  children: ReactNode | ((data: DisallowUndefined<T>) => ReactNode);
  loadingComponent?: ReactNode;
  onUndefined?: () => ReactNode | void;
  showOnError?: boolean;
}

function LoaderData<T>({
  children,
  loadingComponent,
  onUndefined,
  showOnError,
}: LoaderDataProps<T>) {
  const { isLoading, data, loadingComponent: defaultLoadingComponent, error } = useLoader<T>();
  const warnedOnce = useRef(false);

  if (isLoading) {
    return <>{loadingComponent ?? defaultLoadingComponent}</>;
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

  return typeof children === "function" ? (
    <>{children(data as DisallowUndefined<T>)}</>
  ) : (
    <>{children}</>
  );
}

export default LoaderData;
