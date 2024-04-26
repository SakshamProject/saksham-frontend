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

const FormLayout = styled("div")(({ matches }) => ({
  display: "flex",
  alignItems: "start",
  padding: "0 40px",
  gap: "24px",
  height: "calc(100% - 90px)",
  flexDirection: matches ? "row" : "column",
  overflow: !matches && "auto",
  scrollbarWidth: "none",
}));

const StepperContainer = styled("div")(({ matches }) => ({
  minWidth: matches ? "230px" : "100%",
  maxWidth: "100%",
  display: "flex",
  maxHeight: "100%",
}));

const FormContainer = styled("div")(({ matches }) => ({
  display: "flex",
  maxHeight: "100%",
  overflow: matches && "auto",
  justifyContent: "center",
  alignItems: "start",
  width: "100%",
  scrollbarWidth: "none",
}));

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
      <FormLayout matches={matches}>
        <StepperContainer matches={matches}>
          <CustomStepper
            steps={DIVYANG_STEPS}
            activeStep={activeStep}
            onChange={onChange}
            ishorizontal={!matches}
          />
        </StepperContainer>
        <Suspense fallback={<CustomLoader />}>
          <FormContainer matches={matches}>
            <Outlet />
          </FormContainer>
        </Suspense>
      </FormLayout>
    </>
  );
};

export default Form;
