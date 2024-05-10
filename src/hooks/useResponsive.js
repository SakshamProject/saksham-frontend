import { useMediaQuery, useTheme } from "@mui/material";

const useResponsive = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablets = useMediaQuery(theme.breakpoints.down("md"));

  return { theme, isMobile, isTablets };
};

export default useResponsive;
