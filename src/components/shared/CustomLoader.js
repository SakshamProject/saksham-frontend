import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const Container = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "fixed",
  width: "100vw",
  height: "100vh",
  left: "0px",
  top: "0px",
  zIndex: 99,
});

const CustomSpinner = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette?.textColor?.main,
}));

export const CustomLoader = () => {
  return (
    <Container>
      <CustomSpinner />
    </Container>
  );
};
