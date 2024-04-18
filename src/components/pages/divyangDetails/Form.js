import React, { Suspense } from "react";
import {
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { styled, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { ROUTE_PATHS } from "../../../routes/routePaths";
import { BackNavigator, CustomLoader, CustomStepper } from "../../shared";
import { DIVYANG_STEPS } from "../../../constants/divyangDetails/divyangDetails";

const FormLayout = styled("div")(({ column }) => ({
  display: "flex",
  alignItems: "start",
  padding: "0 40px",
  gap: "24px",
  height: "calc(100% - 90px)",
  flexDirection: column ? "row" : "column",
}));

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
  scrollbarWidth: "none",
});

const Form = () => {
  const navigate = useNavigate();
  const { pathname, search, state } = useLocation();
  const [params] = useSearchParams();
  const editId = params.get("editId");
  const allSteps = DIVYANG_STEPS.map((item) => item.value);
  const activeStep = allSteps?.indexOf(pathname.split("/")[3]);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));

  const onChange = (step) =>
    editId || true ? navigate(`${step?.route}${search}`, { state }) : null;

  return (
    <>
      <BackNavigator
        title={"Divyang"}
        navigateTo={ROUTE_PATHS.DIVYANG_DETAILS_LIST}
      />
      <FormLayout column={matches}>
        <StepperContainer>
          <CustomStepper
            steps={DIVYANG_STEPS}
            activeStep={activeStep}
            onChange={onChange}
            // isHorizontal
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
