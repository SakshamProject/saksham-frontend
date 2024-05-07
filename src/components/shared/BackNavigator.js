import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton, styled } from "@mui/material";
import propTypes from "prop-types";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Container = styled("div")(({ theme, disableBack }) => ({
  display: "flex",
  alignItems: "center",
  minHeight: 75,
  marginBottom: 16,
  backgroundColor: theme.palette?.commonColor?.white,
  marginLeft: disableBack ? 16 : "5%",
  position: "sticky",
}));

const CustomHeader = styled("div")(({ theme }) => {
  return {
    fontSize: 22,
    marginLeft: 15,
    userSelect: "none",
    color: theme?.palette?.commonColor?.black,
    fontWeight: "600",
  };
});

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
    <Container disableBack={disableBack}>
      {disableBack ? (
        <></>
      ) : (
        <BackIcon onClick={onClick}>
          <ArrowBackIcon />
        </BackIcon>
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
