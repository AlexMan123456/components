import type { OptionalOnCondition } from "@alextheman/utility";
import type { AlertColor } from "@mui/material/Alert";
import type { ReactNode } from "react";
import type { ContextHookOptions } from "src/types";

import { wait } from "@alextheman/utility";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { createContext, useContext, useState } from "react";

export interface SnackbarProviderProps {
  children: ReactNode;
  autoHideDuration?: number;
}

export interface SnackbarContextValue {
  addSnackbar: (message: string, severity?: AlertColor, duration?: number) => void;
}

const SnackbarContext = createContext<SnackbarContextValue | undefined>(undefined);

export function useSnackbar<Strict extends boolean = true>({
  strict = true as Strict,
}: ContextHookOptions<Strict> = {}): OptionalOnCondition<Strict, SnackbarContextValue> {
  const context = useContext(SnackbarContext);
  if (strict && !context) {
    throw new Error("SNACKBAR_PROVIDER_NOT_FOUND");
  }
  return context as OptionalOnCondition<Strict, SnackbarContextValue>;
}

function SnackbarProvider({ children, autoHideDuration = 5000 }: SnackbarProviderProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [autoHideDurationState, setAutoHideDurationState] = useState<number>(autoHideDuration);
  const [message, setMessage] = useState<string>("");
  const [severity, setSeverity] = useState<AlertColor>("info");

  function addSnackbar(message: string, severity?: AlertColor, duration?: number) {
    setOpen(true);
    setAutoHideDurationState(duration ?? autoHideDuration);
    setSeverity(severity ?? "info");
    setMessage(message);
  }

  async function handleClose() {
    setOpen(false);
    // Wait for 0.2 seconds to ensure that the message is only cleared after the snackbar is fully closed.
    // This prevents potential weird flickering that may occur if they happen synchronously.
    await wait(0.2);
    setMessage("");
  }

  return (
    <SnackbarContext.Provider value={{ addSnackbar }}>
      <Snackbar open={open} autoHideDuration={autoHideDurationState} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
      {children}
    </SnackbarContext.Provider>
  );
}

export default SnackbarProvider;
