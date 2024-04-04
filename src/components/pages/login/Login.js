import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../../routes/routePaths";

const Login = () => {
  const navigate = useNavigate();

  return <Button onClick={() => navigate(ROUTE_PATHS.DASHBOARD)}>Login</Button>;
};

export default Login;
