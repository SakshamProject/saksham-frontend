import { Box, styled } from "@mui/material";
import React, { Suspense } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { DIVYANG_STEPS } from "../../../constants/divyangDetails/divyangDetails";
import useResponsive from "../../../hooks/useResponsive";
import { ROUTE_PATHS } from "../../../routes/routePaths";
import { scrollbarStyle } from "../../../styles/scrollbarStyle";
import {
  BackNavigator,
  CustomLoader,
  CustomStepper,
  WithCondition,
} from "../../shared";
import { CustomHeader, StyledIconButton } from "../../../styles";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const FormLayout = styled("div")(({ matches }) => ({
  display: "flex",
  alignItems: "start",
  gap: "24px",
  height: "calc(100% - 100px)",
}));

const StepperContainer = styled("div")(({ matches }) => ({
  minWidth: "230px",
  display: "flex",
  maxHeight: "100%",
}));

const FormContainer = styled("div")(({ matches }) => ({
  display: "flex",
  height: "100%",
  overflow: "auto",
  justifyContent: "center",
  alignItems: "start",
  width: "100%",
  padding: "0 0 8px 0",
  ...scrollbarStyle(true),
}));

const Form = () => {
  const navigate = useNavigate();
  const { pathname, search, state } = useLocation();
  const params = new URLSearchParams(search);
  const action = params.get("action");
  const editId = state?.editId;
  const allSteps = DIVYANG_STEPS.map((item) => item.value);
  const activeStep = allSteps?.indexOf(pathname.split("/")[3]);
  const { isMobile } = useResponsive(state, search);

  const onChange = (step) =>
    editId
      ? navigate(
          { pathname: step?.route, search: search },
          { state: { ...state } }
        )
      : null;

  const getTitle = () => {
    if (!action) return "NEW DIVYANG";
    return action === "view" ? "VIEW DIVYANG" : "EDIT DIVYANG";
  };

  return (
    <>
      <BackNavigator
        navigateTo={ROUTE_PATHS?.DIVYANG_DETAILS_LIST}
        customTitle={getTitle()}
      />

      <WithCondition isValid={isMobile}>
        <Box
          sx={{
            width: "100%",
            marginBottom: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <StyledIconButton
            disabled={activeStep === 0}
            onClick={() => onChange(DIVYANG_STEPS[activeStep - 1])}
          >
            <ArrowBackIos />
          </StyledIconButton>

          <CustomHeader
            sx={{ fontSize: 20, fontWeight: 500, textTransform: "uppercase" }}
          >
            {DIVYANG_STEPS?.[activeStep]?.label}
          </CustomHeader>

          <StyledIconButton
            disabled={activeStep === DIVYANG_STEPS?.length - 1 || !editId}
            onClick={() => onChange(DIVYANG_STEPS[activeStep + 1])}
          >
            <ArrowForwardIos />
          </StyledIconButton>
        </Box>
      </WithCondition>

      <FormLayout>
        <WithCondition isValid={!isMobile}>
          <StepperContainer>
            <CustomStepper
              steps={DIVYANG_STEPS}
              activeStep={activeStep}
              onChange={onChange}
            />
          </StepperContainer>
        </WithCondition>

        <Suspense fallback={<CustomLoader />}>
          <FormContainer>
            <Outlet />
          </FormContainer>
        </Suspense>
      </FormLayout>
    </>
  );
};

export default Form;
