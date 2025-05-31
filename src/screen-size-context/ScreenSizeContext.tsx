import { createContext, ReactNode, useEffect, useState } from "react";

interface ScreenSizeProps {
  children: ReactNode;
  largeScreenWidth?: number;
  largeScreenHeight?: number;
}

interface ScreenSizeContextValue {
  isLargeScreen: boolean;
  windowWidth: number;
  windowHeight: number;
}

function largeScreenCondition(
  width: number,
  height: number,
  largeScreenWidth: number = 669,
  largeScreenHeight: number = 650,
): boolean {
  return width > largeScreenWidth && height > largeScreenHeight;
}

const ScreenSizeContext = createContext<ScreenSizeContextValue>({
  windowWidth: window.innerWidth,
  windowHeight: window.innerHeight,
  isLargeScreen: largeScreenCondition(window.innerWidth, window.innerHeight),
});

function ScreenSizeProvider({
  children,
  largeScreenWidth,
  largeScreenHeight,
}: ScreenSizeProps) {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);
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
      largeScreenCondition(
        windowWidth,
        windowHeight,
        largeScreenWidth,
        largeScreenHeight,
      ),
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

export { ScreenSizeContext, ScreenSizeProvider };
