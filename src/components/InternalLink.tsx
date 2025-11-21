import type { LinkProps } from "@mui/material/Link";
import type { ReactNode, Ref } from "react";

import MUILink from "@mui/material/Link";
import { Link as ReactDOMLink } from "react-router-dom";

export interface InternalLinkProps extends Omit<LinkProps, "href"> {
  to: `/${string}` | `~/${string}` | (string & {});
  href?: never;
  children: ReactNode;
  ref?: Ref<HTMLAnchorElement>;
}

function InternalLink({ to, children, ref, ...linkProps }: InternalLinkProps) {
  return (
    <MUILink component={ReactDOMLink} to={to} ref={ref} {...linkProps}>
      {children}
    </MUILink>
  );
}

export default InternalLink;
