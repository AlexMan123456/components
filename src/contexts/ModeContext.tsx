import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { type ReactNode, createContext, useMemo, useState } from "react";

const ModeContext = createContext({
  toggleMode: () => {},
  mode: "dark",
});

type Mode = "light" | "dark";

interface ModeProviderProps {
  children: ReactNode;
  mode?: Mode;
}

function ModeProvider({
  children,
  mode: modeProp = "dark",
}: ModeProviderProps) {
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
          setMode((prev) => (prev === "light" ? "dark" : "light"));
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

export { ModeContext, ModeProvider };
