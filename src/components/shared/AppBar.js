import { Typography, styled } from "@mui/material";

import companyLogo from "../../assets/logo.png";
import { AppBarLayout, AppLogo } from "../../styles";

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
        <StyledLogo src={companyLogo} alt="company logo" />
        <StyledTitle>Saksham</StyledTitle>
      </AppLogo>

      {/* <AppProfile>
        <Box>
          <CustomTypography fontSize={18} fontWeight={500}></CustomTypography>
          <CustomTypography fontSize={14}></CustomTypography>
        </Box>

        <CommonAvatar />
      </AppProfile> */}

      {/* <RightMenu /> */}
    </AppBarLayout>
  );
};
