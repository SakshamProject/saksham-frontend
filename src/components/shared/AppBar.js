import { Box, Typography, styled } from "@mui/material";

import { RightMenu } from ".";
import { AppBarLayout, AppLogo, AppProfile, CommonAvatar } from "../../styles";

const CustomTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "Roboto, Helvetica, Arial, sans-serif",
  color: theme?.palette?.textColor?.main,
}));

const StyledLogo = styled("img")(({ theme }) => {
  return {
    height: "50px",
    width: "50px",
  };
});

const StyledTitle = styled("div")(({ theme }) => {
  return {
    fontFamily: "Roboto",
    fontSize: "24px",
    color: theme?.palette?.textColor?.main,
    fontWeight: "600",
  };
});

export const AppBar = () => {
  return (
    <AppBarLayout>
      <AppLogo>
        <StyledLogo />
        <StyledTitle>Saksham</StyledTitle>
      </AppLogo>

      <AppProfile>
        <Box className="appProfileDetails">
          <CustomTypography fontSize={18} fontWeight={500}></CustomTypography>
          <CustomTypography fontSize={14}></CustomTypography>
        </Box>

        <CommonAvatar />
      </AppProfile>

      <RightMenu />
    </AppBarLayout>
  );
};
