import type { OptionalOnCondition } from "@alextheman/utility";
import type { ReactNode } from "react";

import type { ContextHookOptions } from "src/types";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export interface ScreenSizeProps {
  children: ReactNode;
  largeScreenWidth?: number;
  largeScreenHeight?: number;
}

export interface ScreenSizeContextValue {
  isLargeScreen: boolean;
  windowWidth: number;
  windowHeight: number;
}

const ScreenSizeContext = createContext<ScreenSizeContextValue>({
  windowWidth: 0,
  windowHeight: 0,
  isLargeScreen: false,
});

export function useScreenSize<Strict extends boolean = true>({
  strict = true as Strict,
}: ContextHookOptions<Strict> = {}): OptionalOnCondition<Strict, ScreenSizeContextValue> {
  const context = useContext(ScreenSizeContext);
  if (strict && !context) {
    throw new Error("SCREEN_SIZE_PROVIDER_NOT_FOUND");
  }
  return context;
}

function ScreenSizeProvider({
  children,
  largeScreenWidth = 669,
  largeScreenHeight = 660,
}: ScreenSizeProps) {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);

  useEffect(() => {
    function setDimensions() {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    }
    setDimensions();
    window.addEventListener("resize", setDimensions);
    return () => {
      window.removeEventListener("resize", setDimensions);
    };
  }, []);

  const isLargeScreen = useMemo(() => {
    return windowWidth > largeScreenWidth && windowHeight > largeScreenHeight;
  }, [windowWidth, windowHeight, largeScreenWidth, largeScreenHeight]);

  return (
    <ScreenSizeContext.Provider
      value={{
        isLargeScreen,
        windowWidth,
        windowHeight,
      }}
    >
      {children}
    </ScreenSizeContext.Provider>
  );
}

export default ScreenSizeProvider;
