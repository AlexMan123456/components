import type { ButtonOwnProps } from "@mui/material/Button";
import type { ElementType, MouseEvent as ReactMouseEvent, ReactNode } from "react";

import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import Box from "@mui/material/Box";
import MUIButton from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { useEffect, useMemo, useState } from "react";

export interface DropdownMenuProps {
  children: ReactNode | ((closeMenu: () => void) => ReactNode);
  buttonChildren?: ReactNode;
  button?: ElementType;
  // Omit endIcon because the built-in isOpenIcon and isClosedIcon gives more control.
  // onClick is also omitted because that controls anchorElement, and the onOpen/onClose functions can be used instead.
  buttonProps?: Omit<ButtonOwnProps, "onClick" | "endIcon">;
  isOpenIcon?: ReactNode;
  isClosedIcon?: ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
}

function DropdownMenu({
  children,
  button: Button = MUIButton,
  buttonChildren = "Menu",
  buttonProps: incomingButtonProps,
  isOpenIcon = <ArrowDropUp />,
  isClosedIcon = <ArrowDropDown />,
  onOpen,
  onClose,
}: DropdownMenuProps) {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
  const isDropdownOpen = useMemo(() => {
    return !!anchorElement;
  }, [anchorElement]);

  const buttonProps: Record<string, unknown> = {
    ...incomingButtonProps,
    onClick: (event: ReactMouseEvent<HTMLElement>) => {
      setAnchorElement(event.currentTarget);
    },
    "aria-controls": isDropdownOpen ? "dropdown-menu" : undefined,
    "aria-haspopup": "true",
    "aria-expanded": isDropdownOpen,
  };

  if (Button === MUIButton) {
    buttonProps.endIcon = isDropdownOpen ? isOpenIcon : isClosedIcon;
  }

  useEffect(() => {
    if (isDropdownOpen && onOpen) {
      onOpen();
    } else if (!isDropdownOpen && onClose) {
      onClose();
    }
  }, [isDropdownOpen, onOpen, onClose]);

  return (
    <Box>
      <Button {...buttonProps}>{buttonChildren}</Button>
      <Menu
        id="dropdown-menu"
        anchorEl={anchorElement}
        open={isDropdownOpen}
        onClose={() => {
          setAnchorElement(null);
        }}
      >
        {typeof children === "function" ? (
          <Box>
            {children(() => {
              setAnchorElement(null);
            })}
          </Box>
        ) : (
          children
        )}
      </Menu>
    </Box>
  );
}

export default DropdownMenu;
