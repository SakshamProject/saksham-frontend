import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../routes/routePaths";
import {
  CancelButton,
  FourNotFour,
  NotFoundContainer,
  NotFoundMessage,
} from "../../styles";
import { removeAllCookie } from "../../utils/cookie";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <NotFoundContainer>
      <FourNotFour>404</FourNotFour>
      <NotFoundMessage>Oops! Something is wrong...</NotFoundMessage>

      <Box sx={{ margin: "16px" }}>
        <CancelButton onClick={() => navigate(-1)}>Previous</CancelButton>

        <CancelButton
          onClick={() => {
            removeAllCookie();
            navigate(ROUTE_PATHS?.LOGIN);
          }}
        >
          Go To Login
        </CancelButton>
      </Box>
    </NotFoundContainer>
  );
};

export default NotFound;
