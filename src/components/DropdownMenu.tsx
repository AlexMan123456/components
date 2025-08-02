import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import Box from "@mui/material/Box";
import type { ButtonOwnProps } from "@mui/material/Button";
import MUIButton from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import type { ElementType, ReactNode, MouseEvent as ReactMouseEvent } from "react";
import { useEffect, useState } from "react";

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
  const isDropdownOpen = !!anchorElement;

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
      <Button {...buttonProps}>{buttonChildren}</Button>
      <Menu
        id="dropdown-menu"
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
