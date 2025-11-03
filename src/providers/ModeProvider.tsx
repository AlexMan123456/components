import type { OptionalOnCondition } from "@alextheman/utility";
import type { ReactNode } from "react";
import type { ContextHookOptions } from "src/types";

import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createContext, useContext, useMemo, useState } from "react";

export type Mode = "light" | "dark";

export interface ModeContextValue {
  toggleMode: () => void;
  mode: Mode;
}

const ModeContext = createContext<ModeContextValue>({
  toggleMode: () => {},
  mode: "dark",
});

export function useMode<Strict extends boolean = true>({
  strict = true as Strict,
}: ContextHookOptions<Strict> = {}): OptionalOnCondition<Strict, ModeContextValue> {
  const context = useContext(ModeContext);
  if (strict && !context) {
    throw new Error("MODE_PROVIDER_NOT_FOUND");
  }
  return context;
}

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
