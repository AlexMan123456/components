import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { ReactNode, useState } from "react";

export interface DropdownMenuProps {
  children: ReactNode;
}

function DropdownMenu({ children }: DropdownMenuProps) {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
  const isDropdownOpen = !!anchorElement;

  return (
    <Box>
      <Button
        onClick={(event) => {
          setAnchorElement(event.currentTarget);
        }}
      >
        {isDropdownOpen ? <ArrowDropUp /> : <ArrowDropDown />}
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
