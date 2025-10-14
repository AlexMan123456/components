import type { ReactNode } from "react";

import { useLoader } from "src/providers/LoaderProvider";

export interface LoaderContentProps {
  children: ReactNode;
  loadingComponent?: ReactNode;
  showOnError?: boolean;
}

function LoaderContent({ children, loadingComponent, showOnError }: LoaderContentProps) {
  const { isLoading, loadingComponent: defaultLoadingComponent, error } = useLoader();

  if (isLoading) {
    return <>{loadingComponent ?? defaultLoadingComponent}</>;
  }

  if (error && !showOnError) {
    return <></>;
  }

  return <>{children}</>;
}

export default LoaderContent;
