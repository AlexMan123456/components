import ListItemButton, {
  type ListItemButtonProps,
} from "@mui/material/ListItemButton";
import { type ReactNode } from "react";
import InternalLink from "src/components/InternalLink";

export interface ListItemInternalLinkProps
  extends Omit<ListItemButtonProps, "href"> {
  children: ReactNode;
}

function ListItemInternalLink({
  children,
  ...listItemButtonProps
}: ListItemInternalLinkProps) {
  return (
    <ListItemButton component={InternalLink} {...listItemButtonProps}>
      {children}
    </ListItemButton>
  );
}

export default ListItemInternalLink;
