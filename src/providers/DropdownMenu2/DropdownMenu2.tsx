import type { OptionalOnCondition } from "@alextheman/utility";
import type { ButtonOwnProps } from "@mui/material/Button";
import type { ElementType, MouseEvent as ReactMouseEvent, ReactNode } from "react";
import type { ContextHookOptions } from "src/types";

import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import ArrowDropUp from "@mui/icons-material/ArrowDropUp";
import MUIButton from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { createContext, useContext, useMemo, useState } from "react";

export interface DropdownMenuContextValue {
  closeMenu: () => void;
  isDropdownOpen: boolean;
}

const DropdownMenuContext = createContext<DropdownMenuContextValue | undefined>(undefined);

export function useDropdownMenu<Strict extends boolean = true>({
  strict = true as Strict,
}: ContextHookOptions<Strict> = {}): OptionalOnCondition<Strict, DropdownMenuContextValue> {
  const context = useContext(DropdownMenuContext);
  if (strict && !context) {
    throw new Error("DROPDOWN_MENU_NOT_FOUND");
  }
  return context as OptionalOnCondition<Strict, DropdownMenuContextValue>;
}

export interface DropdownMenu2Props {
  children: ReactNode;
  button?: ElementType;
  buttonProps?: Omit<ButtonOwnProps, "endIcon"> & {
    onClick?: (event: ReactMouseEvent<HTMLElement>) => void;
  };
  openIcon?: ReactNode;
  closedIcon?: ReactNode;
}

function DropdownMenu2({
  children,
  button: Button = MUIButton,
  buttonProps,
  openIcon = <ArrowDropUp />,
  closedIcon = <ArrowDropDown />,
}: DropdownMenu2Props) {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);

  const isDropdownOpen = useMemo(() => {
    return !!anchorElement;
  }, [anchorElement]);

  function closeMenu() {
    setAnchorElement(null);
  }

  return (
    <DropdownMenuContext.Provider value={{ closeMenu, isDropdownOpen }}>
      <Button
        aria-controls={isDropdownOpen ? "dropdown-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={isDropdownOpen}
        endIcon={isDropdownOpen ? openIcon : closedIcon}
        {...buttonProps}
        onClick={(event: ReactMouseEvent<HTMLElement>) => {
          if (!event.defaultPrevented) {
            setAnchorElement(event.currentTarget);
          }
          if (buttonProps?.onClick) {
            buttonProps?.onClick(event);
          }
        }}
      />
      <Menu anchorEl={anchorElement} open={isDropdownOpen} onClose={closeMenu}>
        {children}
      </Menu>
    </DropdownMenuContext.Provider>
  );
}

export default DropdownMenu2;
