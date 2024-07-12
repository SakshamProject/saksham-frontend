import { Box, Drawer, ListItem, ListItemIcon, styled } from "@mui/material";
import { scrollbarStyle } from "../styles/scrollbarStyle";
import { StyledIconButton } from "./buttonStyle";

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
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

export const DrawerProfileContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  rowGap: "8px",
  margin: "24px 0 16px 0",
}));

export const LogoutContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%",
  padding: "24px 0 24px 16px",
  background: theme.palette?.commonColor?.white,
  borderTop: `1px solid ${theme.palette?.primary?.main}`,
}));

export const StyledListItem = styled(ListItem)(
  ({ page, currentpage, theme }) => ({
    cursor: "pointer",
    ...(currentpage === page && {
      background: theme.palette?.primary?.main,
      color: theme.palette?.primary?.contrastText,
    }),
    ":hover": {
      background: theme.palette?.primary?.main,
    },
  }),
);

export const ListWrapper = styled(Box)(() => ({
  overflow: "auto",
  marginBottom: "72px",
  ...scrollbarStyle(),
}));

export const UserDetailsWrapper = styled(Box)(() => ({
  textAlign: "center",
}));

export const LogoutButton = styled(StyledIconButton)(() => ({
  padding: 0,
  marginRight: "32px",
}));

export const LogoutTypo = styled("span")(({ theme }) => ({
  cursor: "pointer",
  color: theme?.palette?.commonColor?.lightBlack,
  fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
}));

export const StyledListIcon = styled(ListItemIcon)(
  ({ page, currentpage, theme }) => ({
    ...(currentpage === page && {
      color: theme.palette?.primary?.contrastText,
    }),
  }),
);
