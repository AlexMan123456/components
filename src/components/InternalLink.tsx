import type { LinkProps } from "@mui/material/Link";
import type { ReactNode } from "react";

import MUILink from "@mui/material/Link";
import { Link as ReactDOMLink } from "react-router-dom";

export interface InternalLinkProps extends Omit<LinkProps, "href"> {
  to: `/${string}` | `~/${string}`;
  href?: never;
  children: ReactNode;
}

function InternalLink({ to, children, ...linkProps }: InternalLinkProps) {
  return (
    <MUILink component={ReactDOMLink} to={to} {...linkProps}>
      {children}
    </MUILink>
  );
}

export default InternalLink;
