import type { MenuItemOwnProps } from "@mui/material/MenuItem";
import type { ComponentProps, MouseEventHandler, ReactNode, Ref } from "react";

import MenuItem from "@mui/material/MenuItem";

import { ExternalLink } from "src/components";
import { useDropdownMenu } from "src/providers/DropdownMenu2/DropdownMenu2";

export interface DropdownMenuExternalLinkProps extends MenuItemOwnProps {
  ref?: Ref<HTMLAnchorElement>;
  href: ComponentProps<typeof ExternalLink>["href"];
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  children: ReactNode;
}

function DropdownMenuExternalLink({
  ref,
  href,
  children,
  onClick,
  ...menuItemProps
}: DropdownMenuExternalLinkProps) {
  const { closeMenu } = useDropdownMenu();

  return (
    <MenuItem
      component={ExternalLink}
      href={href}
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

export default DropdownMenuExternalLink;
