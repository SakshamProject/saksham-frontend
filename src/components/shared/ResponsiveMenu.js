import { ExpandLess, ExpandMore, Logout } from "@mui/icons-material";
import { Collapse, List, ListItemIcon, ListItemText } from "@mui/material";
import propTypes from "prop-types";
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getSideMenus } from "../../constants/menus";
import useResponsive from "../../hooks/useResponsive";
import { ROUTE_PATHS } from "../../routes/routePaths";
import { StyledIconButton } from "../../styles";
import {
  DrawerProfileContainer,
  ListWrapper,
  LogoutContainer,
  StyledDrawer,
  StyledListItem,
  UserDetailsWrapper,
} from "../../styles/responsiveMenu";
import { DividerLine } from "./DividerLine";
import { UserDetails } from "./UserDetails";
import { UserProfile } from "./UserProfile";
import { WithCondition } from "./WithCondition";

export const ResponsiveMenu = ({ redirect, drawerOpen, setDrawerOpen }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [listOpen, setListOpen] = useState(-1);
  const currentPage = pathname.split("/")[1];
  const userInfo = useSelector((state) => state?.userInfo);
  const { theme } = useResponsive();

  const handleListClick = ({ position, menu, isCollapse }) => {
    if (isCollapse) {
      setListOpen((prev) => (prev === position ? -1 : position));
    } else {
      navigate(menu?.navigateTo);
      setDrawerOpen(false);
      setListOpen(-1);
    }
  };

  const getListItem = (menus, inset = false) =>
    menus?.map((menu, position) => {
      if (menu?.options) {
        return (
          <Fragment key={menu?.key + position}>
            <StyledListItem
              onClick={() => handleListClick({ position, isCollapse: true })}
              page={menu?.value}
              currentpage={currentPage}
            >
              <WithCondition isValid={!!menu?.icon}>
                <ListItemIcon>{menu?.icon}</ListItemIcon>
              </WithCondition>
              <ListItemText primary={menu?.label || menu?.name} />
              {listOpen === position ? <ExpandLess /> : <ExpandMore />}
            </StyledListItem>
            <Collapse in={listOpen === position} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {getListItem(menu?.options, true)}
              </List>
            </Collapse>
          </Fragment>
        );
      } else {
        return (
          <StyledListItem
            onClick={() => handleListClick({ menu })}
            key={menu?.key + position}
            page={menu?.value}
            currentpage={currentPage}
          >
            <WithCondition isValid={!!menu?.icon}>
              <ListItemIcon>{menu?.icon}</ListItemIcon>
            </WithCondition>
            <ListItemText inset={inset} primary={menu?.label || menu?.name} />
          </StyledListItem>
        );
      }
    });

  return (
    <StyledDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
      <DrawerProfileContainer>
        <UserProfile userInfo={userInfo} placement={"right"} />

        <UserDetailsWrapper>
          <UserDetails
            userInfo={userInfo}
            color={theme.palette?.commonColor?.black}
          />
        </UserDetailsWrapper>
      </DrawerProfileContainer>

      <DividerLine
        gap={"0px"}
        minHeight={"1px"}
        color={theme.palette?.primary?.main}
      />

      <ListWrapper>
        <List component="nav">
          {getListItem(getSideMenus({ role: userInfo?.role, isMobile: true }))}
        </List>

        <LogoutContainer onClick={() => redirect(ROUTE_PATHS?.LOGIN)}>
          <StyledIconButton sx={{ padding: 0, marginRight: "32px" }}>
            <Logout />
          </StyledIconButton>
          <span style={{ cursor: "pointer" }}>Logout</span>
        </LogoutContainer>
      </ListWrapper>
    </StyledDrawer>
  );
};

ResponsiveMenu.propTypes = {
  redirect: propTypes.func,
  drawerOpen: propTypes.bool,
  setDrawerOpen: propTypes.func,
};
