import React, { FC, useContext } from "react";
import clsx from "clsx";
import {
  makeStyles,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Drawer,
  Hidden,
  useMediaQuery,
  useTheme,
  Tooltip,
} from "@material-ui/core";
import routes from "../../routes";
import style from "../../assets/jss/components/sidebarStyle";
import { DrawerContext } from "../../contexts/DrawerContext";
import { useRouter } from "next/router";
import Link from "next/link";
import { Route } from "../../routes";
import { useUserContext } from "../../contexts/UserContext";

const useStyles = makeStyles(style);

const Sidebar: FC = () => {
  const classes = useStyles();
  const { drawerOpen, closeDrawer } = useContext(DrawerContext);
  const router = useRouter();

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  const { isLoggedIn } = useUserContext();

  const filteredRoutes: Route[] = routes.filter((route) =>
    route.condition ? route.condition(isLoggedIn) : true
  );

  return (
    <Drawer
      variant={isDesktop ? "permanent" : "temporary"}
      anchor="left"
      open={drawerOpen}
      onClose={closeDrawer}
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: drawerOpen || !isDesktop,
        [classes.drawerClose]: !drawerOpen && isDesktop,
      })}
      classes={{
        paper: clsx(classes.drawerPaper, {
          [classes.drawerOpen]: drawerOpen || !isDesktop,
          [classes.drawerClose]: !drawerOpen && isDesktop,
        }),
      }}
    >
      <Hidden xsDown>
        <div className={classes.toolbar} />
      </Hidden>
      <List>
        {filteredRoutes.map((route: Route) => {
          return (
            <Link href={route.pathOnClick || route.path} key={route.name}>
              <a className="linksNoDecoration">
                <Tooltip
                  title={route.name}
                  placement="right"
                  arrow
                  disableHoverListener={drawerOpen}
                >
                  <ListItem
                    className={classes.item}
                    classes={{ selected: classes.selected }}
                    selected={
                      route.path === "/"
                        ? router.pathname === "/"
                        : router.pathname.startsWith(route.path)
                    }
                    button
                  >
                    <ListItemIcon>{route.icon}</ListItemIcon>
                    <ListItemText primary={route.name} />
                  </ListItem>
                </Tooltip>
              </a>
            </Link>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
