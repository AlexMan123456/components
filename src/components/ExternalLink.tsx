import type { LinkProps } from "@mui/material/Link";
import type { ReactNode } from "react";

import MUILink from "@mui/material/Link";

export interface ExternalLinkProps extends Omit<LinkProps, "to" | "target" | "rel"> {
  href: `https://${string}` | `http://${string}`;
  to?: never;
  children: ReactNode;
}

function ExternalLink({ href, children, ...linkProps }: ExternalLinkProps) {
  return (
    <MUILink component={"a"} href={href} target="_blank" rel="noopener noreferrer" {...linkProps}>
      {children}
    </MUILink>
  );
}

export default ExternalLink;
