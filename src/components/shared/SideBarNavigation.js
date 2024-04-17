/* eslint-disable react-hooks/exhaustive-deps */
import { Tab, Tabs, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { theme } from "../../styles";
import { Popover } from "./Popover";

export const CustomTabs = styled(Tabs)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  border: `1px solid ${theme?.palette?.primary?.main}`,
  borderTop: "none",
  paddingTop: 10,
  paddingBottom: "auto",
  minWidth: "280px",
  maxWidth: "350px",
  ".MuiTabs-flexContainer": {
    overflowY: "auto",
    maxHeight: "100%",
    scrollbarWidth: "thin",
    scrollbarColor: `${theme?.palette?.scrollbarColor?.thumb} ${theme?.palette?.scrollbarColor?.track}`,
  },
  ".MuiTabs-indicator": {
    backgroundColor: theme.palette?.primary?.main,
  },
}));

export const CustomTab = styled(Tab)(({ theme }) => ({
  margin: "5px auto",
  padding: "auto",
  border: `1px solid ${theme?.palette?.primary?.main}`,
  width: "88%",
  height: 40,
  fontSize: 15,
  paddingTop: 12,
  textAlign: "left",
  alignItems: "flex-start",
  borderRadius: 3,
  color: theme?.palette?.commonColor?.black,
  "&.Mui-selected": {
    color: theme?.palette?.primary?.contrastText,
    backgroundColor: theme?.palette?.primary?.main,
  },
}));

const popoverStyle = {
  marginLeft: 18,
};

const popoverItemStyle = {
  minWidth: 200,
  height: 50,
  display: "flex",
  alignItems: "center",
  padding: "0.3rem 0.8rem",
  borderBottom: `1px solid ${theme.palette?.commonColor?.grey}`,
  cursor: "pointer",
};

export const SideBarNavigation = ({ menuList = [] }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeMenu, setActiveMenu] = useState(menuList[0]);
  const [value, setValue] = useState(menuList[0]?.value);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const currentPage = pathname.split("/")[1];

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (menu) => (event) => {
    menu?.navigateTo && !menu?.options?.length && navigate(menu?.navigateTo);
    if (menu?.options?.length) {
      setAnchorEl(event.currentTarget);
      setActiveMenu(menu);
    }
  };

  const handleTab = (_, value) => {
    if (!pathname.includes(value)) return;
    setValue(value);
  };

  useEffect(() => {
    if (!menuList?.length) return;
    const currentMenu = menuList.find((menu) => menu?.value === currentPage);
    setValue(currentMenu?.value || false);
  }, [pathname, activeMenu, menuList]); // eslint-disable-line

  return (
    <CustomTabs
      orientation="vertical"
      value={value || false}
      onChange={handleTab}
    >
      {menuList.map((menu) => (
        <CustomTab
          label={menu?.label}
          id={menu?.value}
          value={menu?.value}
          key={menu?.label}
          onClick={handleMenuClick(menu)}
        />
      ))}
      {anchorEl && (
        <Popover
          popoverStyle={popoverStyle}
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          menuItems={activeMenu?.options}
          popoverItemStyle={popoverItemStyle}
          onClose={handleClosePopover}
        />
      )}
    </CustomTabs>
  );
};
