import type { MenuItemOwnProps } from "@mui/material/MenuItem";
import type {
  ComponentProps,
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
  ReactNode,
} from "react";

import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

import { useDropdownMenu } from "src/providers/DropdownMenu2/DropdownMenu2";

export type DropdownMenuItemProps<RootComponent extends ElementType = typeof Button> = {
  component?: RootComponent;
  children?: ReactNode;
  ref?: ComponentPropsWithRef<RootComponent>["ref"];
  onClick?: ComponentProps<RootComponent>["onClick"];
} & Omit<ComponentPropsWithoutRef<RootComponent>, "children" | "ref"> &
  MenuItemOwnProps;

function DropdownMenuItem<RootComponent extends ElementType>({
  component,
  children,
  ref,
  onClick,
  ...menuItemProps
}: DropdownMenuItemProps<RootComponent>) {
  const { closeMenu } = useDropdownMenu();
  const itemComponent = component ?? Button;

  return (
    <MenuItem
      component={itemComponent}
      ref={ref}
      {...menuItemProps}
      onClick={(event) => {
        if (!event.defaultPrevented) {
          closeMenu();
        }
        if (onClick) {
          onClick(event);
        }
      }}
    >
      {children}
    </MenuItem>
  );
}

export default DropdownMenuItem;
