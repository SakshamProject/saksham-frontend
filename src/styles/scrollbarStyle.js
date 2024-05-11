import { theme } from "./theme";

export const scrollbarStyle = (disable = false) => {
  const { userAgent } = navigator;
  const userAgentArray = userAgent?.split(" ");
  const currentBrowser = userAgentArray[userAgentArray?.length - 1]?.split("/");

  if (currentBrowser?.length && currentBrowser[0] === "Firefox") {
    return disable
      ? {
          scrollbarWidth: "none",
        }
      : {
          scrollbarWidth: "thin",
          scrollbarColor: `${theme.palette?.scrollbarColor?.thumb} ${theme.palette?.scrollbarColor?.track}`,
        };
  } else {
    return disable
      ? {
          "&::-webkit-scrollbar": {
            width: "0px",
            height: "0px",
          },
        }
      : {
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: theme.palette?.scrollbarColor?.track,
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: theme.palette?.scrollbarColor?.thumb,
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: theme.palette?.scrollbarColor?.hover,
          },
        };
  }
};
