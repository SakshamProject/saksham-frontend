import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton, styled } from "@mui/material";
import propTypes from "prop-types";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import CustomTooltip from "./CustomTooltip";

const Container = styled("div")(({ theme, disableback }) => ({
  display: "flex",
  alignItems: "center",
  minHeight: 64,
  backgroundColor: theme.palette?.commonColor?.white,
  marginLeft: disableback ? 16 : "5%",
  position: "sticky",
  [theme.breakpoints.down("md")]: {
    margin: "0 16px 0 8px",
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
  const location = useLocation();
  const [params] = useSearchParams();
  const editId = params.get("editId");
  const isViewMode = location.state?.viewDetails;
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
