import { DarkMode, LightMode } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useContext } from "react";

import { ModeContext } from "src/providers/ModeProvider";

function DarkModeToggle() {
  const { mode, toggleMode } = useContext(ModeContext);

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
