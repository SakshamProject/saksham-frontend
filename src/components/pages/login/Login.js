import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { ROUTE_PATHS } from "../../../routes/routePaths";
import {
  StyledButtonContainer,
  SubmitButton,
} from "../../../styles/buttonStyle";
import {
  LoginContainer,
  LoginHeading,
  LoginWrapper,
} from "../../../styles/login";
import { setCookie } from "../../../utils/cookie";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    setCookie("token", "testing token");
    navigate(ROUTE_PATHS.DASHBOARD);
  };

  return (
    <LoginWrapper container>
      <LoginContainer>
        <Grid container gap={2}>
          <Grid item xs={12}>
            <LoginHeading>Login</LoginHeading>
          </Grid>

          

          <Grid item xs={12}>
            <StyledButtonContainer sx={{ justifyContent: "center" }}>
              <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
            </StyledButtonContainer>
          </Grid>
        </Grid>
      </LoginContainer>
    </LoginWrapper>
  );
};

export default Login;
