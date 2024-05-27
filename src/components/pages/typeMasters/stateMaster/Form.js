import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Box, styled } from "@mui/material";
import { Suspense } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { STEPS } from "../../../../constants/typeMasters/stateMaster";
import useResponsive from "../../../../hooks/useResponsive";
import { CustomHeader, StyledIconButton } from "../../../../styles";
import { scrollbarStyle } from "../../../../styles/scrollbarStyle";
import {
  BackNavigator,
  CustomLoader,
  CustomStepper,
  WithCondition,
} from "../../../shared";

const FormLayout = styled("div")({
  display: "flex",
  alignItems: "start",
  gap: "24px",
  height: "calc(100% - 100px)",
});

const StepperContainer = styled("div")({
  minWidth: "230px",
  display: "flex",
  maxHeight: "100%",
});

const FormContainer = styled("div")({
  display: "flex",
  height: "100%",
  overflow: "auto",
  justifyContent: "center",
  alignItems: "start",
  width: "100%",
  padding: "0 0 8px 0",
  ...scrollbarStyle(true),
});

const ResponsiveStepperContainer = styled(Box)(() => ({
  width: "100%",
  marginBottom: "16px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const ResponsiveHeader = styled(CustomHeader)(() => ({
  fontSize: 20,
  fontWeight: 500,
  textTransform: "uppercase",
}));

const Form = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isMobile } = useResponsive();

  const allSteps = STEPS?.map((item) => item.value);
  const activeStep = allSteps?.indexOf(pathname.split("/")[3]);

  const onChange = (step) => navigate(step?.route);

  return (
    <>
      <BackNavigator title={"State Types"} disableModes disableBack />

      <WithCondition isValid={isMobile}>
        <ResponsiveStepperContainer>
          <StyledIconButton
            disabled={activeStep <= 0}
            onClick={() => onChange(STEPS[activeStep - 1])}
          >
            <ArrowBackIos />
          </StyledIconButton>

          <ResponsiveHeader>{STEPS?.[activeStep]?.label}</ResponsiveHeader>

          <StyledIconButton
            disabled={activeStep >= STEPS?.length - 1}
            onClick={() => onChange(STEPS[activeStep + 1])}
          >
            <ArrowForwardIos />
          </StyledIconButton>
        </ResponsiveStepperContainer>
      </WithCondition>

      <FormLayout>
        <WithCondition isValid={!isMobile}>
          <StepperContainer>
            <CustomStepper
              steps={STEPS}
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
