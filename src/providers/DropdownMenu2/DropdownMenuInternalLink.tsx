import type { MenuItemOwnProps } from "@mui/material/MenuItem";
import type { ComponentProps, MouseEventHandler, ReactNode, Ref } from "react";

import MenuItem from "@mui/material/MenuItem";

import { InternalLink } from "src/components";
import { useDropdownMenu } from "src/providers/DropdownMenu2/DropdownMenu2";

export interface DropdownMenuInternalLinkProps extends MenuItemOwnProps {
  ref?: Ref<HTMLAnchorElement>;
  to: ComponentProps<typeof InternalLink>["to"];
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  children: ReactNode;
}

function DropdownMenuInternalLink({
  to,
  ref,
  children,
  onClick,
  ...menuItemProps
}: DropdownMenuInternalLinkProps) {
  const { closeMenu } = useDropdownMenu();

  return (
    <MenuItem
      component={InternalLink}
      to={to}
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

export default DropdownMenuInternalLink;
