import { useMediaQuery } from "@mui/material";
import { theme } from "../styles/theme";

const useResponsive = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablets = useMediaQuery(theme.breakpoints.down("md"));

  return { theme, isMobile, isTablets };
};

export default useResponsive;
