import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import Box from "@mui/material/Box";
import type { ButtonOwnProps } from "@mui/material/Button";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

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
    // Needed in case the global isDropdownOpen differs from what anchorElement says it should currently be.
    const isOpen = !!anchorElement;
    if (isOpen && onOpen) {
      onOpen();
    } else if (!isOpen && onClose) {
      onClose();
    }
  }, [anchorElement]);

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
