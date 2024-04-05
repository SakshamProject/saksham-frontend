import { styled } from "@mui/material";
import { Suspense } from "react";
import {
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { STEPS } from "../../../../constants/typeMasters/stateMaster";
import { ROUTE_PATHS } from "../../../../routes/routePaths";
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

const FormContainer = styled("div")({
  display: "flex",
  maxHeight: "100%",
  overflow: "auto",
  justifyContent: "center",
  alignItems: "start",
  width: "100%",
  "&::-webkit-scrollbar": {
    width: "5px",
    height: "5px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#6E6E6E60",
    borderRadius: 5,
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#555",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "#F5F5F5",
  },
});

const Form = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [params] = useSearchParams();

  const allSteps = STEPS.map((item) => item.value);
  const activeStep = allSteps?.indexOf(pathname.split("/")[3]);

  const onChange = (step) => navigate(step?.route);

  return (
    <>
      <BackNavigator
        title={"State Types"}
        disableBack={true}
        disableModes={true}
      />
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
