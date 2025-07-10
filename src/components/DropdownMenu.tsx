import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Button, { ButtonOwnProps } from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { ReactNode, useEffect, useState } from "react";

export interface DropdownMenuProps {
  children: ReactNode | ((closeMenu: () => void) => ReactNode);
  label?: string;
  variant?: ButtonOwnProps["variant"];
  isOpenIcon?: ReactNode;
  isClosedIcon?: ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
}

function DropdownMenu({
  children,
  label = "Menu",
  variant = "contained",
  isOpenIcon = <ArrowDropUp />,
  isClosedIcon = <ArrowDropDown />,
  onOpen,
  onClose,
}: DropdownMenuProps) {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
  const isDropdownOpen = !!anchorElement;

  useEffect(() => {
    if (isDropdownOpen && onOpen) {
      onOpen();
    } else if (!isDropdownOpen && onClose) {
      onClose();
    }
  }, [isDropdownOpen]);

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
