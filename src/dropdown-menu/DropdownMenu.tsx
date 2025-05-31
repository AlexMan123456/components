import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { ReactNode, useState } from "react";

export interface DropdownMenuProps {
  children: ReactNode;
  isOpenIcon?: ReactNode;
  isClosedIcon?: ReactNode;
}

function DropdownMenu({
  children,
  isOpenIcon = <ArrowDropUp />,
  isClosedIcon = <ArrowDropDown />,
}: DropdownMenuProps) {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
  const isDropdownOpen = !!anchorElement;

  return (
    <Box>
      <Button
        onClick={(event) => {
          setAnchorElement(event.currentTarget);
        }}
      >
        {isDropdownOpen ? isOpenIcon : isClosedIcon}
      </Button>
      <Menu
        anchorEl={anchorElement}
        open={isDropdownOpen}
        onClose={() => {
          setAnchorElement(null);
        }}
      >
        {children}
      </Menu>
    </Box>
  );
}

export default DropdownMenu;
