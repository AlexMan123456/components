import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createContext, useMemo, useState, type ReactNode } from "react";

const ModeContext = createContext({
  toggleMode: () => {},
  mode: "dark",
});

interface ModeProviderProps {
  children: ReactNode;
}

function ModeProvider({ children }: ModeProviderProps) {
  const [mode, setMode] = useState<"light" | "dark">("dark");

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
