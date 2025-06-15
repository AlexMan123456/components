import {
  styled,
  useTheme,
  type Theme,
  type CSSObject,
} from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, {
  type AppBarProps as MuiAppBarProps,
} from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Fragment, useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { truncate } from "@alextheman/utility";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

interface MenuItem {
  category: string;
  options: {
    label: string;
    to: string;
    icon?: ReactNode;
  }[];
}

export interface NavigationDrawerProps {
  title: string;
  navItems: MenuItem[];
  headerElements?: ReactNode;
  children: ReactNode;
}

function NavigationDrawer({
  title,
  navItems,
  children,
  headerElements,
}: NavigationDrawerProps) {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const location = useLocation();

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: "none" },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {title}
          </Typography>
          {headerElements}
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {navItems.map((item) => {
          return (
            <Fragment key={item.category}>
              <List>
                <Typography
                  variant={open ? "h5" : "h6"}
                  paddingLeft={open ? 2 : 1}
                >
                  {open ? item.category : truncate(item.category, 4)}
                </Typography>
                {item.options.map((option) => {
                  return (
                    <ListItem
                      key={option.to}
                      disablePadding
                      sx={{ display: "block" }}
                    >
                      <ListItemButton
                        sx={[
                          {
                            minHeight: 48,
                            px: 2.5,
                          },
                          open
                            ? {
                                justifyContent: "initial",
                              }
                            : {
                                justifyContent: "center",
                              },
                        ]}
                        component={Link}
                        to={option.to}
                        selected={location.pathname === option.to}
                      >
                        <ListItemIcon
                          sx={[
                            {
                              minWidth: 0,
                              justifyContent: "center",
                            },
                            open
                              ? {
                                  mr: 3,
                                }
                              : {
                                  mr: "auto",
                                },
                          ]}
                        >
                          {option.icon ? (
                            option.icon
                          ) : !open ? (
                            <Typography>{truncate(option.label, 4)}</Typography>
                          ) : null}
                        </ListItemIcon>
                        <ListItemText
                          primary={option.label}
                          sx={[
                            open
                              ? {
                                  opacity: 1,
                                }
                              : {
                                  opacity: 0,
                                },
                          ]}
                        />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
              <Divider />
            </Fragment>
          );
        })}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}

export default NavigationDrawer;
