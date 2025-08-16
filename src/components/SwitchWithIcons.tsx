import type { CommonProps } from "@mui/material/OverridableComponent";
import type { SwitchProps } from "@mui/material/Switch";
import type { ComponentType, CSSProperties } from "react";

import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";

export interface SwitchWithIconsProps extends Omit<SwitchProps, "icon" | "checkedIcon"> {
  checkedIcon: ComponentType<{ style?: CSSProperties }>;
  checkedIconStyles?: CommonProps["style"];
  uncheckedIcon: ComponentType<{ style?: CSSProperties }>;
  uncheckedIconStyles?: CommonProps["style"];
}

const StyledSwitch = styled(Switch)(() => {
  return {
    padding: 8,
    "& .MuiSwitch-track": {
      borderRadius: 11,
      "&::before, &::after": {
        content: '""',
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        fontSize: 16,
        width: 28,
        height: 28,
      },
    },
  };
});

function SwitchWithIcons({
  checkedIcon: CheckedIcon,
  checkedIconStyles,
  uncheckedIcon: UncheckedIcon,
  uncheckedIconStyles,
  ...switchProps
}: SwitchWithIconsProps) {
  const boxSx = {
    borderRadius: "50%",
    borderColor: "white",
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0.25,
  };
  const defaultIconStyles = { color: "black", maxWidth: 16.5, maxHeight: 16.5 };
  return (
    <StyledSwitch
      checkedIcon={
        <Box sx={boxSx}>
          <CheckedIcon style={{ ...defaultIconStyles, ...checkedIconStyles }} />
        </Box>
      }
      icon={
        <Box sx={boxSx}>
          <UncheckedIcon style={{ ...defaultIconStyles, ...uncheckedIconStyles }} />
        </Box>
      }
      {...switchProps}
    />
  );
}

export default SwitchWithIcons;
