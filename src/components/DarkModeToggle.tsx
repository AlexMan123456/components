import IconButton from "@mui/material/IconButton";
import { useContext } from "react";
import { DarkMode, LightMode } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import { ModeContext } from "src/contexts/ModeContext";

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
