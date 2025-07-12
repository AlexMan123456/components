import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import ArrowDropUp from "@mui/icons-material/ArrowDropUp";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Collapse, { CollapseProps } from "@mui/material/Collapse";
import { type SxProps } from "@mui/material/styles";
import { type ElementType, useEffect, useState, type ReactNode } from "react";

export interface CollapsableItemProps {
  isInitiallyOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  children: ReactNode;
  buttonStyles?: SxProps;
  buttonContents: ReactNode;
  buttonComponent?: ElementType;
  openIcon?: ReactNode;
  closedIcon?: ReactNode;
  collapseProps?: Omit<CollapseProps, "in">;
  useDefaultStyling?: boolean;
}

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
                  ButtonComponent === ButtonBase
                    ? { backgroundColor: "action.hover" }
                    : null,
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
