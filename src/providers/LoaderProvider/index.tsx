import LoaderProvider from "src/providers/LoaderProvider/LoaderProvider";

export { default as LoaderData } from "src/providers/LoaderProvider/LoaderData";
export { default as LoaderError } from "src/providers/LoaderProvider/LoaderError";

export type { LoaderDataProps } from "src/providers/LoaderProvider/LoaderData";
export type {
  LoaderErrorBaseProps,
  LoaderErrorPropsWithNullable,
  LoaderErrorPropsWithUndefinedOrNull,
  LoaderErrorProps,
} from "src/providers/LoaderProvider/LoaderError";
export type {
  LoaderProviderProps,
  LoaderProviderBaseProps,
  LoaderProviderPropsWithError,
  LoaderProviderPropsWithNoError,
} from "src/providers/LoaderProvider/LoaderProvider";

export default LoaderProvider;
