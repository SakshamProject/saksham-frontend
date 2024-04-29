import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../../routes/routePaths";
import {
  StyledButtonContainer,
  SubmitButton,
  LoginContainer,
  LoginHeading,
  LoginWrapper,
} from "../../../styles";
import { setCookie } from "../../../utils/cookie";
import { useQuery } from "@tanstack/react-query";
import { postApiService } from "../../../api/api";
import axios from "axios";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    setCookie("token", "testing token");
    navigate(ROUTE_PATHS.DASHBOARD);
  };

  //   {
  //   "userName": "Maignanaganapathy",
  //     "password": "Abcd@123"
  // }

  // const { data } = useQuery({
  //   queryKey: ["communityCategory"],
  //   queryFn: () =>
  //     axios.post("http://localhost:3000/auth/user/login", {
  //       userName: "admin",
  //       password: "Abcd@123",
  //     }),
  // });

  // useEffect(() => {
  //   if (data) {
  //     setCookie("token", data?.data?.token);
  //   }
  // }, [data]);

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
