import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Fragment, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

interface MenuItem {
  category: string;
  options: {
    label: string;
    to: string;
  }[];
}

export interface NavigationDrawerProps {
  title: string;
  drawerWidth?: number;
  navItems: MenuItem[];
  children: ReactNode;
}

function NavigationDrawer({
  title,
  drawerWidth = 240,
  navItems,
  children,
}: NavigationDrawerProps) {
  const location = useLocation();
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => {
            return theme.zIndex.drawer + 1;
          },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          paddingLeft: "10px",
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Divider />
        <br />
        {navItems.map((item: MenuItem, index) => {
          return (
            <Fragment key={`${item.category}-${index}`}>
              <Typography variant="h5" paddingLeft={1}>
                {item.category}
              </Typography>
              <List>
                {item.options.map((option, index) => {
                  return (
                    <ListItemButton
                      key={`${option}-${index}`}
                      component={Link}
                      to={option.to}
                      selected={location.pathname === option.to}
                    >
                      {option.label}
                    </ListItemButton>
                  );
                })}
              </List>
            </Fragment>
          );
        })}
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

export default NavigationDrawer;
