import type { LinkProps } from "@mui/material/Link";
import type { ReactNode } from "react";

import Link from "@mui/material/Link";

export interface ExternalLinkProps extends Omit<LinkProps, "to"> {
  href: string;
  children: ReactNode;
}

function ExternalLink({
  href,
  children,
  target = "_blank",
  rel = "noopener noreferrer",
  ...linkProps
}: ExternalLinkProps) {
  return (
    <Link component={"a"} href={href} target={target} rel={rel} {...linkProps}>
      {children}
    </Link>
  );
}

export default ExternalLink;
