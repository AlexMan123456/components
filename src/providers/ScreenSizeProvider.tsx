import type { ReactNode } from "react";

import { createContext, useContext, useEffect, useState } from "react";

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

/**
 * @deprecated Direct use of ScreenSizeContext is deprecated. Please use useScreenSize hook instead.
 */
export const ScreenSizeContext = createContext<ScreenSizeContextValue>({
  windowWidth: 0,
  windowHeight: 0,
  isLargeScreen: false,
});

export function useScreenSize() {
  return useContext(ScreenSizeContext);
}

function ScreenSizeProvider({ children, largeScreenWidth, largeScreenHeight }: ScreenSizeProps) {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);

  function largeScreenCondition(
    width: number,
    height: number,
    largeScreenWidth: number = 669,
    largeScreenHeight: number = 600,
  ): boolean {
    return width > largeScreenWidth && height > largeScreenHeight;
  }

  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(
    largeScreenCondition(
      window.innerWidth,
      window.innerHeight,
      largeScreenWidth,
      largeScreenHeight,
    ),
  );

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

  useEffect(() => {
    setIsLargeScreen(
      largeScreenCondition(windowWidth, windowHeight, largeScreenWidth, largeScreenHeight),
    );
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
