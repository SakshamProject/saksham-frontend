import styled from "@emotion/styled";
import { Done } from "@mui/icons-material";
import { Box, Step, StepLabel, Stepper } from "@mui/material";
import { useLocation } from "react-router-dom";

const StepperContainer = styled(Box)(({ isHorizontal }) => ({
  backgroundColor: "white",
  display: isHorizontal ? "block" : "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  border: "1px solid #707070",
  borderWidth: isHorizontal ? 0 : 1,
  padding: isHorizontal ? "0 0 40px" : "0 20px",
  width: "100%",
  overflowY: "scroll",
  borderRadius: "8px",

  "::-webkit-scrollbar": {
    display: "none",
  },
  // height: "100%",
}));

const StyledStepper = styled(Stepper)(({ theme, isHorizontal }) => {
  return {
    maxHeight: "100%",
    boxSizing: "border-box",
    padding: "16px 0",
    width: "100%",
    cursor: "pointer",
    overflowX: "visible",
    paddingBottom: 16,
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    ".MuiStepConnector-root": {
      marginLeft: isHorizontal ? "0" : "14px",
      marginBlock: "-16px",
      width: "1%",
    },
    "MuiStepLabel-label.Mui-completed": {
      color: theme.palette.primary.main,
      fontWeight: "900 ",
    },
    "& .Mui-active": {
      "& .MuiStepConnector-line": {
        borderColor: theme.palette.primary.main,
        borderWidth: "2px",
      },
    },
    "& .MuiStepConnector-line": {
      borderWidth: "2px",
      borderColor: theme.palette.primary.main,
      transform: isHorizontal
        ? "translateX(16px) translateY(3px)"
        : "translateX(3px)",
      minHeight: isHorizontal ? "0" : "32px",
    },

    ".MuiStepLabel-iconContainer": {
      padding: "0 !important",
      border: `1px solid ${theme.palette.primary.main}`,
      color: theme.palette.primary.main,
      borderRadius: "60px",
      height: "14px",
      width: "14px",
      background: "#F4F6FF",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    ".MuiStepLabel-iconContainer.Mui-active": {
      backgroundColor: theme.palette.primary.main,
    },
    ".MuiStepLabel-iconContainer.Mui-completed": {
      backgroundColor: theme.palette.primary.main,
    },
    ".MuiStepLabel-root.MuiStepLabel-horizontal": {
      display: "block !important",
    },
    ".MuiStep-root.MuiStep-horizontal": {
      width: "10px !important",
      padding: "0 13px",
    },
    ".MuiStepLabel-root": {
      paddingInline: "10px",
      height: "30px",
    },
  };
});

const StyledStepLabel = styled(StepLabel)(({ theme, isHorizontal }) => ({
  "& .MuiStepLabel-label ": {
    color: theme.palette.text.grey,
    fontWeight: "700",
    fontSize: "14px",
    width: "max-content",
    paddingLeft: isHorizontal ? "0" : "10px",
  },

  ".MuiStepLabel-label.Mui-active": {
    color: theme.palette.text.grey,
    fontWeight: "700 ",
    paddingLeft: isHorizontal ? "0" : "10px",
  },
  "& .Mui-disabled": {
    color: theme.palette.primary.main,
    fontWeight: "900 ",
  },
  ".MuiStepLabel-label.Mui-completed": {
    color: theme.palette.primary.main,
    fontWeight: "900 ",
  },
}));

export const CustomStepper = ({
  activeStep,
  steps,
  onChange,
  isLinear,
  isHorizontal,
}) => {
  const location = useLocation();

  return (
    <StepperContainer isHorizontal={isHorizontal}>
      <StyledStepper
        activeStep={activeStep}
        orientation={isHorizontal ? "horizontal" : "vertical"}
        nonLinear={!isLinear}
        isHorizontal={isHorizontal}
      >
        {steps.map((step, index) => (
          <Step
            key={step.label}
            sx={{
              background:
                step?.route === location?.pathname && "rgb(232, 237, 255)",
              borderRadius: step?.route === location?.pathname && "3px",
              zIndex: step?.route === location?.pathname && 999,
              paddingBlock: 1,
            }}
            onClick={() => onChange && onChange(step)}
          >
            <StyledStepLabel
              isHorizontal={isHorizontal}
              key={step.label}
              StepIconComponent={() => ""}
            >
              {step.label}
            </StyledStepLabel>
          </Step>
        ))}
      </StyledStepper>
    </StepperContainer>
  );
};
