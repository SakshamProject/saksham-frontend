import { Grid } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { postApiService } from "../../../api/api";
import { API_PATHS } from "../../../api/apiPaths";
import {
  StyledButtonContainer,
  SubmitButton,
} from "../../../styles/buttonStyle";
import {
  LoginContainer,
  LoginHeading,
  LoginWrapper,
} from "../../../styles/login";

const Login = () => {
  const { mutate: onSubmit } = useMutation({
    mutationKey: ["login"],
    mutationFn: () => postApiService(API_PATHS.LOGIN, values),
    onSuccess: () => {},
  });

  const formik = useFormik({
    onSubmit,
  });

  const { values, handleSubmit } = formik;

  return (
    <LoginWrapper container>
      <LoginContainer>
        <Grid container gap={2}>
          <Grid item xs={12}>
            <LoginHeading>Login</LoginHeading>
          </Grid>

          <Grid item xs={12}>
            <StyledButtonContainer sx={{ justifyContent: "center" }}>
              <SubmitButton
                color="primary"
                onClick={handleSubmit}
                sx={{ padding: "6px 24px !important" }}
              >
                Submit
              </SubmitButton>
            </StyledButtonContainer>
          </Grid>
        </Grid>
      </LoginContainer>
    </LoginWrapper>
  );
};

export default Login;
