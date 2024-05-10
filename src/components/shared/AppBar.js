import {
  BarChart,
  Dashboard,
  Menu,
  People,
  ShoppingCart,
} from "@mui/icons-material";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  styled,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "../../assets/avatar.png";
import companyLogo from "../../assets/logo.png";
import useResponsive from "../../hooks/useResponsive";
import { ROUTE_PATHS } from "../../routes/routePaths";
import {
  AppBarLayout,
  AppLogo,
  AppProfile,
  AppProfileDetails,
  CommonAvatar,
  StyledIconButton,
  StyledLogo,
  StyledName,
} from "../../styles";
import { removeAllCookie } from "../../utils/cookie";
import CustomTooltip from "./CustomTooltip";
import { RightMenu } from "./RightMenu";
import { WithCondition } from "./WithCondition";

const CustomTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette?.primary?.contrastText,
  fontSize: 16,
  textTransform: "capitalize",
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    width: "40%",
  },
  [theme.breakpoints.down("sm")]: {
    "& .MuiDrawer-paper": {
      width: "70%",
    },
  },
}));

export const AppBar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const userInfo = useSelector((state) => state?.userInfo);
  const { isTablets } = useResponsive();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleClick = (event) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const redirect = (routePath) => {
    if (routePath === ROUTE_PATHS?.LOGIN) removeAllCookie();
    navigate(routePath);
    handleClose();
  };

  return (
    <AppBarLayout>
      <AppLogo>
        <WithCondition isValid={isTablets}>
          <CustomTooltip title={"Menu"}>
            <StyledIconButton onClick={() => setDrawerOpen(true)}>
              <Menu />
            </StyledIconButton>
          </CustomTooltip>
        </WithCondition>

        <StyledLogo src={companyLogo} alt="company logo" />

        <StyledName>Saksham</StyledName>
      </AppLogo>

      <WithCondition isValid={!isTablets}>
        <AppProfile onClick={handleClick}>
          <AppProfileDetails>
            <CustomTypography>{userInfo?.name || "Anonymous"}</CustomTypography>

            <CustomTypography sx={{ fontSize: "12px" }}>
              {userInfo?.userRole || "Unknown"}
            </CustomTypography>
          </AppProfileDetails>

          <UserProfile userInfo={userInfo} />
        </AppProfile>

        <RightMenu
          anchorEl={anchorEl}
          handleClose={handleClose}
          open={Boolean(anchorEl)}
          redirect={redirect}
        />
      </WithCondition>

      <StyledDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        {/* <Box sx={{ textAlign: "end" }}>
          <StyledIconButton
            disableFocusRipple
            disableRipple
            onClick={() => setDrawerOpen(false)}
          >
            <Close />
          </StyledIconButton>
        </Box> */}

        <Box>
          <UserProfile userInfo={userInfo} />

          <CustomTypography>{userInfo?.name || "Anonymous"}</CustomTypography>

          <CustomTypography sx={{ fontSize: "12px" }}>
            {userInfo?.userRole || "Unknown"}
          </CustomTypography>
        </Box>

        <List component="nav" disablePadding>
          <ListItem>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <ShoppingCart />
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText primary="Customers" />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <BarChart />
            </ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItem>
          {/* <ListItem onClick={() => setOpen(!open)}>
            <ListItemIcon>
              <LibraryBooks />
            </ListItemIcon>
            <ListItemText primary="Nested Pages" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
              <ListItem>
                <ListItemText inset primary="Nested Page 1" />
              </ListItem>
              <ListItem>
                <ListItemText inset primary="Nested Page 2" />
              </ListItem>
            </List>
          </Collapse> */}
        </List>
      </StyledDrawer>
    </AppBarLayout>
  );
};

const UserProfile = ({ userInfo }) => (
  <CustomTooltip title={"profile"} placement={"left"}>
    <CommonAvatar
      src={userInfo?.profileImg || defaultAvatar}
      onError={(e) => (e.target.src = defaultAvatar)}
      alt="profile"
    />
  </CustomTooltip>
);
