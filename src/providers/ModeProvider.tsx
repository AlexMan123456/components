import type { ReactNode } from "react";

import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createContext, useContext, useMemo, useState } from "react";

/**
 * @deprecated Direct use of ModeContext is deprecated. Please use useMode hook instead.
 */
export const ModeContext = createContext({
  toggleMode: () => {},
  mode: "dark",
});

export function useMode() {
  return useContext(ModeContext);
}

export type Mode = "light" | "dark";

export interface ModeProviderProps {
  children: ReactNode;
  mode?: Mode;
}

function ModeProvider({ children, mode: modeProp = "dark" }: ModeProviderProps) {
  const [mode, setMode] = useState<Mode>(modeProp);

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode,
      },
    });
  }, [mode]);

  return (
    <ModeContext.Provider
      value={{
        mode,
        toggleMode: () => {
          setMode((prev) => {
            return prev === "light" ? "dark" : "light";
          });
        },
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ModeContext.Provider>
  );
}

export default ModeProvider;
