import { Add, Download } from "@mui/icons-material";
import { Box, Typography, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { NewButton } from "../../styles";
import { CustomSearchField, FilterModal, WithCondition } from "./index";

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
  color: theme.palette?.textColor?.black,
  textTransform: "uppercase",
  fontWeight: "600",
  fontSize: "1.3rem",
}));

const IconsContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const ListTopbar = ({
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
  onDownload,
  isFilterParams,
}) => {
  const navigate = useNavigate();

  return (
    <Container>
      <ContainerAlign>
        <Title variant="h6">{label}</Title>

        <WithCondition isValid={!!isFilterParams}>
          <Typography sx={{ fontSize: "1.1rem" }}>Filtered Result</Typography>
        </WithCondition>

        <IconsContainer>
          {!disableSearchField && <CustomSearchField />}

          {additionalComponent ? additionalComponent : <></>}

          <WithCondition isValid={!disableFilter}>
            <FilterModal
              listPath={listPath}
              filterFields={filterFields}
              filterFieldInitial={filterFieldInitial}
            />
          </WithCondition>

          <WithCondition isValid={!disableNewForm && newFormPath}>
            <NewButton onClick={() => navigate(newFormPath)}>
              {newButtonLabel ? newButtonLabel : <Add />}
            </NewButton>
          </WithCondition>

          <WithCondition isValid={!!onDownload}>
            <NewButton onClick={onDownload}>
              <Download />
            </NewButton>
          </WithCondition>
        </IconsContainer>
      </ContainerAlign>
    </Container>
  );
};
