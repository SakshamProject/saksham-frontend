/* eslint-disable react-hooks/exhaustive-deps */
import { Tab, Tabs, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Popover } from "./Popover";

const CustomTabs = styled(Tabs)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  border: "1px solid",
  borderColor: theme?.palette?.borderColor?.main,
  borderTop: "none",
  paddingTop: 10,
  paddingBottom: "auto",
  width: "clamp(280px, 20vw, 350px)",
}));

const CustomTab = styled(Tab)(({ theme }) => ({
  margin: "5px auto",
  padding: "auto",
  border: "1px solid",
  borderColor: theme?.palette?.primary?.main,
  width: "88%",
  height: 40,
  fontSize: 15,
  paddingTop: 12,
  borderRadius: 3,
  textAlign: "left",
  alignItems: "flex-start",
  fontFamily: "Roboto, Helvetica, Arial, sans-serif",
  color: theme?.palette?.primary?.main,
  "&.Mui-selected": {
    color: theme?.palette?.textColor?.main,
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
  borderBottom: "1px solid #eeeeee",
  cursor: "pointer",
};

export const SideBarNavigation = ({ menuList = [] }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeMenu, setActiveMenu] = useState(menuList[0]);
  const [value, setValue] = useState(menuList[0]?.value);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const currentPage = pathname.split("/")[2];

  const handleClosePopover = () => setAnchorEl(null);

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
  }, [pathname, activeMenu, menuList]);

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
