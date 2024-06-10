import { ExpandLess, ExpandMore, Logout } from "@mui/icons-material";
import { Collapse, List, ListItemText } from "@mui/material";
import propTypes from "prop-types";
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getSideMenus } from "../../constants/menus";
import useResponsive from "../../hooks/useResponsive";
import { ROUTE_PATHS } from "../../routes/routePaths";
import {
  DrawerProfileContainer,
  ListWrapper,
  LogoutButton,
  LogoutContainer,
  LogoutTypo,
  StyledDrawer,
  StyledListIcon,
  StyledListItem,
  UserDetailsWrapper,
} from "../../styles/responsiveMenu";
import { DividerLine } from "./DividerLine";
import { UserDetails } from "./UserDetails";
import { UserProfile } from "./UserProfile";
import { WithCondition } from "./WithCondition";

export const CommonIcon = ({ menu, page, currentpage }) => {
  return (
    <WithCondition isValid={!!menu?.icon}>
      <StyledListIcon page={page} currentpage={currentpage}>
        {menu?.icon}
      </StyledListIcon>
    </WithCondition>
  );
};

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
              <CommonIcon
                menu={menu}
                page={menu?.value}
                currentpage={currentPage}
              />

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
            <CommonIcon
              menu={menu}
              page={menu?.value}
              currentpage={currentPage}
            />

            <ListItemText inset={inset} primary={menu?.label || menu?.name} />
          </StyledListItem>
        );
      }
    });

  return (
    <StyledDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
      <DrawerProfileContainer>
        <UserProfile userInfo={userInfo} style={{ cursor: "default" }} />

        <UserDetailsWrapper>
          <UserDetails
            userInfo={userInfo}
            color={theme.palette?.commonColor?.black}
            style={{ cursor: "default" }}
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

        <LogoutContainer>
          <LogoutButton onClick={() => redirect(ROUTE_PATHS?.LOGIN)}>
            <Logout />
          </LogoutButton>

          <LogoutTypo onClick={() => redirect(ROUTE_PATHS?.LOGIN)}>
            Logout
          </LogoutTypo>
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

CommonIcon.propTypes = {
  menu: propTypes.any,
  page: propTypes.string,
  currentpage: propTypes.string,
};
