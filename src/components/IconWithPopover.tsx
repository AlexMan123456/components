import Box from "@mui/material/Box";
import { type OverridableComponent } from "@mui/material/OverridableComponent";
import Popover from "@mui/material/Popover";
import { SvgIconTypeMap } from "@mui/material/SvgIcon";
import {
  type ElementType,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
  useId,
  useState,
} from "react";

export interface IconWithPopoverProps {
  icon:
    | (OverridableComponent<SvgIconTypeMap<unknown, "svg">> & {
        muiName: string;
      })
    | ElementType;
  onOpen?: () => void;
  onClose?: () => void;
  iconProps?: SvgIconTypeMap<unknown, "svg">["props"];
  children: ReactNode;
}

function IconWithPopover({
  icon: Icon,
  onOpen,
  onClose,
  iconProps,
  children,
}: IconWithPopoverProps) {
  const [anchorElement, setAnchorElement] = useState<Element | null>(null);
  const isPopoverOpen = !!anchorElement;
  const popoverId = useId();

  function handleOpen(event: ReactMouseEvent<SVGSVGElement, MouseEvent>) {
    setAnchorElement(event.currentTarget);
    if (onOpen) {
      onOpen();
    }
  }

  function handleClose() {
    setAnchorElement(null);
    if (onClose) {
      onClose();
    }
  }

  return (
    <Box>
      <Icon
        aria-owns={isPopoverOpen ? popoverId : undefined}
        aria-haspopup="true"
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        {...iconProps}
      />
      <Popover
        id={popoverId}
        sx={{ pointerEvents: "none" }}
        open={isPopoverOpen}
        anchorEl={anchorElement}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handleClose}
        disableRestoreFocus
      >
        {children}
      </Popover>
    </Box>
  );
}

export default IconWithPopover;
