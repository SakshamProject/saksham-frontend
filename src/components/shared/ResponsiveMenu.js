import { ExpandLess, ExpandMore, Logout } from "@mui/icons-material";
import {
  Box,
  Collapse,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";
import propTypes from "prop-types";
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getSideMenus } from "../../constants/menus";
import useResponsive from "../../hooks/useResponsive";
import { ROUTE_PATHS } from "../../routes/routePaths";
import { StyledIconButton } from "../../styles";
import { DividerLine } from "./DividerLine";
import { UserDetails } from "./UserDetails";
import { UserProfile } from "./UserProfile";
import { WithCondition } from "./WithCondition";

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  position: "relative",
  "& .MuiDrawer-paper": {
    width: "40%",
  },
  [theme.breakpoints.down("sm")]: {
    "& .MuiDrawer-paper": {
      width: "70%",
    },
  },
}));

const DrawerProfileContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  rowGap: "8px",
  margin: "24px 0 16px 0",
}));

const LogoutContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%",
  padding: "24px 0 24px 16px",
  background: theme.palette?.commonColor?.white,
  borderTop: `1px solid ${theme.palette?.primary?.main}`,
}));

export const ResponsiveMenu = ({ redirect, drawerOpen, setDrawerOpen }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [listOpen, setListOpen] = useState(-1);
  const currentPage = pathname.split("/")[1];
  const userInfo = useSelector((state) => state?.userInfo);
  const { theme } = useResponsive();

  const getListItem = (menus, inset = false) =>
    menus?.map((menu, position) => {
      if (menu?.options) {
        return (
          <Fragment key={menu?.key + position}>
            <ListItem
              onClick={() =>
                setListOpen((prev) => (prev === position ? -1 : position))
              }
              sx={{
                ...(currentPage === menu?.value && {
                  background: theme.palette?.primary?.main,
                  color: theme.palette?.primary?.contrastText,
                }),
              }}
            >
              <WithCondition isValid={menu?.icon}>
                <ListItemIcon
                  sx={{
                    ...(currentPage === menu?.value && {
                      color: theme.palette?.primary?.contrastText,
                    }),
                  }}
                >
                  {menu?.icon}
                </ListItemIcon>
              </WithCondition>
              <ListItemText primary={menu?.label || menu?.name} />
              {listOpen === position ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={listOpen === position} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {getListItem(menu?.options, true)}
              </List>
            </Collapse>
          </Fragment>
        );
      } else {
        return (
          <ListItem
            onClick={() => {
              navigate(menu?.navigateTo);
              setDrawerOpen(false);
            }}
            key={menu?.key + position}
            sx={{
              ...(currentPage === menu?.value && {
                background: theme.palette?.primary?.main,
                color: theme.palette?.primary?.contrastText,
              }),
            }}
          >
            <WithCondition isValid={menu?.icon}>
              <ListItemIcon
                sx={{
                  ...(currentPage === menu?.value && {
                    color: theme.palette?.primary?.contrastText,
                  }),
                }}
              >
                {menu?.icon}
              </ListItemIcon>
            </WithCondition>
            <ListItemText inset={inset} primary={menu?.label || menu?.name} />
          </ListItem>
        );
      }
    });

  return (
    <StyledDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
      <DrawerProfileContainer>
        <UserProfile userInfo={userInfo} placement={"right"} />

        <Box sx={{ textAlign: "center" }}>
          <UserDetails
            userInfo={userInfo}
            color={theme.palette?.commonColor?.black}
          />
        </Box>
      </DrawerProfileContainer>

      <DividerLine
        gap={"0px"}
        minHeight={"1px"}
        color={theme.palette?.primary?.main}
      />

      <Box sx={{ overflow: "auto", marginBottom: "72px" }}>
        <List component="nav">
          {getListItem(getSideMenus({ role: userInfo?.role, isMobile: true }))}
        </List>

        <LogoutContainer onClick={() => redirect(ROUTE_PATHS?.LOGIN)}>
          <StyledIconButton sx={{ padding: 0, marginRight: "32px" }}>
            <Logout />
          </StyledIconButton>
          Logout
        </LogoutContainer>
      </Box>
    </StyledDrawer>
  );
};

UserDetails.propTypes = {
  redirect: propTypes.func,
  drawerOpen: propTypes.bool,
  setDrawerOpen: propTypes.func,
};
