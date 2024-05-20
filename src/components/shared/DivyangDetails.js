import { Box, Typography } from "@mui/material";
import propTypes from "prop-types";
import user from "../../assets/profile.png";
import { divyangDetailsColumn } from "../../constants/globalConstants";
import useResponsive from "../../hooks/useResponsive";
import { WithCondition } from "./WithCondition";

export const DivyangDetail = ({ divyangDetail, disableProfile }) => {
  const { theme } = useResponsive();

  return (
    <Box
      sx={{
        display: "flex",
        borderRadius: "16px",
        border: `1px solid ${theme?.palette?.shadowColor?.main}`,
        flexWrap: "wrap",
        flex: 1,
        columnGap: 2,
        padding: "8px",
      }}
    >
      <WithCondition isValid={!disableProfile}>
        <img
          style={{
            width: 120,
            aspectRatio: 1,
            objectFit: "cover",
            borderRadius: "16px",
          }}
          src={
            divyangDetail?.profileImageUrl ||
            divyangDetail?.profilePhoto ||
            user
          }
          onError={(e) => (e.target.src = user)}
          alt="divyang profile"
        />
      </WithCondition>

      <Box>
        {divyangDetailsColumn?.map((item, key) => (
          <WithCondition
            isValid={!!item?.Cell || !!divyangDetail?.[item?.accessor]}
            key={key + item?.accessor}
          >
            <Box sx={{ display: "flex" }}>
              <Typography>{`${item?.Header} :`}</Typography>
              <Typography>
                &nbsp;
                {!!item?.Cell
                  ? item?.Cell(divyangDetail)
                  : divyangDetail?.[item?.accessor]}
              </Typography>
            </Box>
          </WithCondition>
        ))}
      </Box>
    </Box>
  );
};

DivyangDetail.propTypes = {
  disableProfile: propTypes.bool,
  divyangDetail: propTypes.any,
};
