import IconButton from "@mui/material/IconButton";
import { useColorScheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { DarkMode, LightMode } from "@mui/icons-material";

function DarkModeToggle() {
  const { mode, setMode } = useColorScheme();
  const isDarkByDefault = mode === "dark";
  const [isDarkMode, setIsDarkMode] = useState(isDarkByDefault);

  useEffect(() => {
    setMode(isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <IconButton
      sx={{ marginLeft: "auto" }}
      onClick={() => {
        setIsDarkMode((darkMode) => {
          return !darkMode;
        });
      }}
      aria-label={`Enable ${isDarkMode ? "light" : "dark"} mode`}
    >
      {mode === "dark" ? <LightMode /> : <DarkMode />}
    </IconButton>
  );
}

export default DarkModeToggle;
