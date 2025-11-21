import type { LinkProps } from "@mui/material/Link";
import type { ReactNode, Ref } from "react";

import MUILink from "@mui/material/Link";

export interface ExternalLinkProps extends Omit<LinkProps, "to" | "target" | "rel"> {
  href: `https://${string}` | `http://${string}` | (string & {});
  to?: never;
  children: ReactNode;
  ref?: Ref<HTMLAnchorElement>;
}

function ExternalLink({ href, children, ref, ...linkProps }: ExternalLinkProps) {
  return (
    <MUILink
      component="a"
      href={href}
      ref={ref}
      target="_blank"
      rel="noopener noreferrer"
      {...linkProps}
    >
      {children}
    </MUILink>
  );
}

export default ExternalLink;
