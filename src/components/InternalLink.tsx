import type { LinkProps } from "@mui/material/Link";
import type { ReactNode } from "react";

import Link from "@mui/material/Link";
import { Link as ReactDOMLink } from "react-router-dom";

export interface InternalLinkProps extends Omit<LinkProps, "href"> {
  to: string;
  children: ReactNode;
}

function InternalLink({ to, children, ...linkProps }: InternalLinkProps) {
  return (
    <Link component={ReactDOMLink} to={to} {...linkProps}>
      {children}
    </Link>
  );
}

export default InternalLink;
