import { styled } from "@mui/material";
import { Suspense } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { STEPS } from "../../../../constants/typeMasters/stateMaster";
import { BackNavigator, CustomLoader, CustomStepper } from "../../../shared";

const FormLayout = styled("div")({
  display: "flex",
  alignItems: "start",
  padding: "0 40px",
  gap: "24px",
  height: "calc(100% - 90px)",
});

const StepperContainer = styled("div")({
  minWidth: "230px",
  display: "flex",
  maxHeight: "100%",
});

const FormContainer = styled("div")(({ theme }) => ({
  display: "flex",
  maxHeight: "100%",
  overflow: "auto",
  justifyContent: "center",
  alignItems: "start",
  width: "100%",
  scrollbarWidth: "none",
  // scrollbarColor: `${theme?.palette?.backgroundColor?.grey} ${theme?.palette?.backgroundColor?.lightGrey}`,
}));

const Form = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const allSteps = STEPS.map((item) => item.value);
  const activeStep = allSteps?.indexOf(pathname.split("/")[3]);

  const onChange = (step) => navigate(step?.route);

  return (
    <>
      <BackNavigator title={"State Types"} disableBack disableModes />
      <FormLayout>
        <StepperContainer>
          <CustomStepper
            steps={STEPS}
            activeStep={activeStep}
            onChange={onChange}
          />
        </StepperContainer>
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
