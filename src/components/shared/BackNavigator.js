import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, IconButton, styled } from "@mui/material";
import propTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import useResponsive from "../../hooks/useResponsive";
import CustomTooltip from "./CustomTooltip";
import { WithCondition } from "./WithCondition";

const Container = styled("div")(({ theme, disableback }) => ({
  display: "flex",
  alignItems: "center",
  minHeight: 64,
  backgroundColor: theme.palette?.commonColor?.white,
  marginLeft: disableback ? 16 : "0",
  position: "sticky",
  marginBottom: "16px",
  [theme.breakpoints.down("sm")]: {
    position: "fixed",
    backgroundColor: theme.palette?.commonColor?.white,
    width: "100%",
    zIndex: 10,
  },
}));

const CustomHeader = styled("div")(({ theme }) => ({
  fontSize: 22,
  marginLeft: 15,
  userSelect: "none",
  color: theme?.palette?.commonColor?.black,
  fontWeight: "600",
  [theme.breakpoints.down("md")]: {
    fontSize: 18,
  },
}));

const BackIcon = styled(IconButton)(({ theme }) => ({
  color: theme?.palette?.commonColor?.black,
  fontSize: 24,
}));

export const BackNavigator = ({
  title,
  navigateTo,
  disableModes,
  handleNavigate,
  customTitle,
  disableBack,
}) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { isMobile } = useResponsive();
  const editId = state?.editId;
  const isViewMode = state?.viewDetails;
  const mode = () => {
    if (editId) return isViewMode ? "VIEW" : "EDIT";
    return "NEW";
  };

  const onClick = () => {
    if (handleNavigate) {
      handleNavigate();
      return;
    }
    navigate(navigateTo);
  };

  return (
    <>
      <Container disableback={disableBack}>
        {disableBack ? (
          <></>
        ) : (
          <CustomTooltip title={"Back"}>
            <BackIcon onClick={onClick}>
              <ArrowBackIcon />
            </BackIcon>
          </CustomTooltip>
        )}
        {customTitle ? (
          <CustomHeader>{customTitle}</CustomHeader>
        ) : (
          <CustomHeader>
            {disableModes
              ? `${title}`?.toUpperCase()
              : `${mode()} ${title}`?.toUpperCase()}
          </CustomHeader>
        )}
      </Container>

      <WithCondition isValid={isMobile}>
        <Box sx={{ height: 64 }}></Box>
      </WithCondition>
    </>
  );
};

BackNavigator.propTypes = {
  title: propTypes.string,
  navigateTo: propTypes.string,
  disableModes: propTypes.bool,
  handleNavigate: propTypes.func,
  customTitle: propTypes.string,
  disableBack: propTypes.bool,
};
