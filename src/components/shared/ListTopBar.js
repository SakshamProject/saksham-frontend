import { Add, Download } from "@mui/icons-material";
import { Box, Typography, styled } from "@mui/material";
import propTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import useResponsive from "../../hooks/useResponsive";
import { NewButton } from "../../styles";
import CustomTooltip from "./CustomTooltip";
import { CustomSearchField, FilterModal, WithCondition } from "./index";

const Container = styled(Box)(({ theme }) => ({
  height: 80,
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    marginBottom: 24,
  },
}));

const ContainerAlign = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    rowGap: "8px",
    marginTop: "16px",
    alignItems: "flex-start",
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  color: theme?.palette?.commonColor?.black,
  textTransform: "uppercase",
  fontWeight: "600",
  fontSize: "1.3rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.2rem",
  },
}));

const IconsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    justifyContent: "space-between",
  },
}));

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
  style,
  placeholder,
}) => {
  const navigate = useNavigate();
  const { isMobile } = useResponsive();

  return (
    <Container sx={style}>
      <ContainerAlign>
        <Title variant="h6">{label}</Title>

        <IconsContainer>
          <WithCondition isValid={!disableSearchField}>
            <CustomSearchField placeholder={placeholder} />
          </WithCondition>

          {additionalComponent || <></>}

          <WithCondition isValid={!disableFilter && !isMobile}>
      
              <FilterModal
                listPath={listPath}
                filterFields={filterFields}
                filterFieldInitial={filterFieldInitial}
              />
         
          </WithCondition>

          <WithCondition isValid={!disableNewForm && newFormPath}>
            <CustomTooltip title={"New"}>
              <NewButton onClick={() => navigate(newFormPath)}>
                {newButtonLabel || <Add />}
              </NewButton>
            </CustomTooltip>
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

ListTopbar.propTypes = {
  label: propTypes.string,
  disableSearchField: propTypes.bool,
  disableFilter: propTypes.bool,
  disableNewForm: propTypes.bool,
  newFormPath: propTypes.string,
  listPath: propTypes.string,
  additionalComponent: propTypes.any,
  filterFields: propTypes.array,
  filterFieldInitial: propTypes.object,
  newButtonLabel: propTypes.string,
  onDownload: propTypes.func,
  style: propTypes.object,
  placeholder: propTypes.string,
};
