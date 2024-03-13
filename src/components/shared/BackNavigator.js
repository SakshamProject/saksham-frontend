import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton, styled } from "@mui/material";
import React from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Container = styled("div")(({ disableBack }) => ({
  display: "flex",
  alignItems: "center",
  minHeight: 75,
  marginBottom: 16,
  backgroundColor: "inherit",
  marginLeft: disableBack ? 16 : "5%",
  position: "sticky",
}));

const CustomHeader = styled("div")(({ theme }) => {
  return {
    fontSize: 22,
    marginLeft: 15,
    fontFamily: "lato",
    userSelect: "none",
    color: theme?.palette?.primary?.main,
    fontWeight: "700",
  };
});

const BackIcon = styled(IconButton)(({ theme }) => ({
  color: theme?.palette?.primary?.main,
  fontSize: 22,
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
  const isViewMode = location?.state?.viewDetails;
  const mode = editId ? (isViewMode ? "VIEW" : "EDIT") : "NEW";

  return (
    <Container disableBack={disableBack}>
      {disableBack ? (
        <></>
      ) : (
        <BackIcon
          onClick={() => {
            if (handleNavigate) handleNavigate();
            else navigate(navigateTo);
          }}
        >
          <ArrowBackIcon />
        </BackIcon>
      )}
      {customTitle ? (
        <CustomHeader>{customTitle}</CustomHeader>
      ) : (
        <CustomHeader>
          {disableModes ? title : `${mode} ${title}`?.toUpperCase()}
        </CustomHeader>
      )}
    </Container>
  );
};
