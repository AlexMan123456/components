import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Button, { ButtonOwnProps } from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { ReactNode, useState } from "react";

export interface DropdownMenuProps {
  children: ReactNode | ((closeMenu: () => void) => ReactNode);
  label?: string;
  variant?: ButtonOwnProps["variant"];
  isOpenIcon?: ReactNode;
  isClosedIcon?: ReactNode;
}

function DropdownMenu({
  children,
  label = "Menu",
  variant = "contained",
  isOpenIcon = <ArrowDropUp />,
  isClosedIcon = <ArrowDropDown />,
}: DropdownMenuProps) {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
  const isDropdownOpen = !!anchorElement;

  return (
    <Box>
      <Button
        endIcon={isDropdownOpen ? isOpenIcon : isClosedIcon}
        onClick={(event) => {
          setAnchorElement(event.currentTarget);
        }}
        variant={variant}
      >
        {label}
      </Button>
      <Menu
        anchorEl={anchorElement}
        open={isDropdownOpen}
        onClose={() => {
          setAnchorElement(null);
        }}
      >
        {typeof children === "function"
          ? children(() => {
              setAnchorElement(null);
            })
          : children}
      </Menu>
    </Box>
  );
}

export default DropdownMenu;
