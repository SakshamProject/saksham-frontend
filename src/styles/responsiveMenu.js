import { Box, Drawer, ListItem, styled } from "@mui/material";
import { scrollbarStyle } from "../../styles/scrollbarStyle";

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
    ...(currentpage === page && {
      background: theme.palette?.primary?.light,
    }),
    cursor: "pointer",
    ":hover": {
      background: theme.palette?.primary?.light,
    },
  })
);

export const ListWrapper = styled(Box)(() => ({
  overflow: "auto",
  marginBottom: "72px",
  ...scrollbarStyle(),
}));

export const UserDetailsWrapper = styled(Box)(() => ({
  textAlign: "center",
}));
