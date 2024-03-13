import { Add } from "@mui/icons-material";
import { Box, Typography, styled } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

import { NewButton } from "../../styles";
import { CustomSearchField } from "./CustomSearchField";
import { FilterModal } from "./FilterModal";

const Container = styled(Box)({
  height: 80,
  width: "89.8%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  marginLeft: "5%",
});

const ContainerAlign = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const Title = styled(Typography)(({ theme }) => ({
  color: theme?.palette?.primary?.main,
  textTransform: "uppercase",
  fontFamily: "Lato",
  fontWeight: "700",
}));

const IconsContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const ListTopBar = ({
  label,
  disableSearchField,
  disableFilter,
  disableNewForm,
  newFormPath,
  listPath,
  additionalComponent,
  filterFields,
  filterFieldInitial,
  newButtonLabel,
}) => {
  const navigate = useNavigate();

  return (
    <Container>
      <ContainerAlign>
        <Title variant="h6">{label}</Title>
        <IconsContainer>
          {!disableSearchField && <CustomSearchField />}
          {additionalComponent ? additionalComponent : <></>}
          {!disableFilter && (
            <FilterModal
              listPath={listPath}
              filterFields={filterFields}
              filterFieldInitial={filterFieldInitial}
            />
          )}
          {!disableNewForm && newFormPath ? (
            <NewButton onClick={() => navigate(newFormPath)}>
              {newButtonLabel ? newButtonLabel : <Add />}
            </NewButton>
          ) : (
            <></>
          )}
        </IconsContainer>
      </ContainerAlign>
    </Container>
  );
};
