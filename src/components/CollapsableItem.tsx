import type { CollapseProps } from "@mui/material/Collapse";
import type { SxProps } from "@mui/material/styles";
import type { ElementType, ReactNode } from "react";

import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import ArrowDropUp from "@mui/icons-material/ArrowDropUp";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Collapse from "@mui/material/Collapse";
import { useEffect, useState } from "react";

export interface CollapsableItemProps {
  /** Whether the item should initially be open or not. */
  isInitiallyOpen?: boolean;
  /** A callback function to execute when the item is open. */
  onOpen?: () => void;
  /** A callback function to execute when the item is closed. */
  onClose?: () => void;
  /** The components to render when the item is open. */
  children: ReactNode;
  /** Styling for the button. */
  buttonStyles?: SxProps;
  /** The children to pass to the button. */
  buttonContents: ReactNode;
  /** The specific button component to use. */
  buttonComponent?: ElementType;
  /** The icon to show next to the button when open. */
  openIcon?: ReactNode;
  /** The icon to show next to the button when closed. */
  closedIcon?: ReactNode;
  /** Props to pass to collapse. */
  collapseProps?: Omit<CollapseProps, "in">;
  /**
   * Whether or not to use the default button styling.
   *
   * Defaults to `true` if `buttonComponent` is `ButtonBase`,
   * otherwise defaults to `false`.
   */
  useDefaultStyling?: boolean;
}

/**
 * Shows a display area that can be opened to show the children components, or hidden away.
 *
 * @param props - Props to pass to CollapsableItem
 */
function CollapsableItem({
  isInitiallyOpen,
  onOpen,
  onClose,
  children,
  buttonStyles,
  buttonContents,
  buttonComponent: ButtonComponent = ButtonBase,
  collapseProps,
  openIcon = <ArrowDropUp />,
  closedIcon = <ArrowDropDown />,
  useDefaultStyling = ButtonComponent === ButtonBase ? true : false,
}: CollapsableItemProps) {
  const [isItemOpen, setIsItemOpen] = useState<boolean>(!!isInitiallyOpen);

  useEffect(() => {
    if (isItemOpen && onOpen) {
      onOpen();
    } else if (!isItemOpen && onClose) {
      onClose();
    }
  }, [isItemOpen]);

  return (
    <Box>
      <ButtonComponent
        onClick={() => {
          setIsItemOpen((previouslyOpen) => {
            return !previouslyOpen;
          });
        }}
        sx={
          useDefaultStyling
            ? {
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingY: 1.5,
                paddingX: 2,
                textAlign: "center",
                "&:hover":
                  ButtonComponent === ButtonBase ? { backgroundColor: "action.hover" } : null,
                ...buttonStyles,
              }
            : buttonStyles
        }
        aria-expanded={isItemOpen}
      >
        {buttonContents}
        {isItemOpen ? openIcon : closedIcon}
      </ButtonComponent>
      <Collapse in={isItemOpen} {...collapseProps}>
        {children}
      </Collapse>
    </Box>
  );
}

export default CollapsableItem;
