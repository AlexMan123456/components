import type { JSX, ReactNode } from "react";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { Link } from "react-router-dom";

export interface NavItemBottom {
  value: string;
  label: string;
  icon?: JSX.Element;
  to: string;
}

export interface NavigationBottomProps {
  children: ReactNode;
  navItems: NavItemBottom[];
}

function NavigationBottom({ children, navItems }: NavigationBottomProps) {
  const [value, setValue] = useState<string>("");
  return (
    <>
      <Box sx={{ paddingBottom: 7 }}>{children}</Box>
      <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(_, value) => {
            setValue(value);
          }}
        >
          {navItems.map((item) => {
            return <BottomNavigationAction key={item.value} {...item} component={Link} />;
          })}
        </BottomNavigation>
      </Paper>
    </>
  );
}

export default NavigationBottom;
