import DarkMode from "@mui/icons-material/DarkMode";
import LightMode from "@mui/icons-material/LightMode";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import { useMode } from "src/providers";

function DarkModeToggle() {
  const { mode, toggleMode } = useMode();

  return (
    <Tooltip title={`Enable ${mode === "dark" ? "light" : "dark"} mode`}>
      <IconButton
        sx={{ marginLeft: "auto" }}
        onClick={toggleMode}
        aria-label={`Enable ${mode === "dark" ? "light" : "dark"} mode`}
      >
        {mode === "dark" ? <LightMode /> : <DarkMode />}
      </IconButton>
    </Tooltip>
  );
}

export default DarkModeToggle;
