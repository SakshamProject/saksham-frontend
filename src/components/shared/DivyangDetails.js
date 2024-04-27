import { Box, Grid, Typography, styled } from "@mui/material";
import propTypes from "prop-types";
import user from "../../assets/profile.png";
import { WithCondition } from "./WithCondition";
import { divyangDetailsColumn } from "../../constants/globalConstants";

const StyledImage = styled("img")({
  width: 140,
  aspectRatio: 1,
  objectFit: "cover",
  borderRadius: 16,
});

const DetailSection = styled(Box)({
  display: "flex",
});

const Title = styled(Typography)({
  width: 180,
  display: "flex",
  justifyContent: "space-between",
  marginRight: 16,
  fontWeight: 700,
});

export const DivyangDetail = ({ divyangDetail, disableProfile }) => {
  return (
    <>
      <WithCondition isValid={!disableProfile}>
        <Grid item xs={4}>
          <StyledImage
            src={divyangDetail?.profileImageUrl || user}
            onError={(e) => (e.target.src = user)}
            alt="Profile picture"
          />
        </Grid>
      </WithCondition>

      <Grid item xs={8}>
        {divyangDetailsColumn?.map((item, key) => (
          <WithCondition
            isValid={!!divyangDetail?.[item?.accessor]}
            key={key + item?.accessor}
          >
            <DetailSection sx={{ display: "flex" }}>
              <Title>{`${item?.Header} : `}</Title>
              <Typography>{divyangDetail?.[item?.accessor]}</Typography>
            </DetailSection>
          </WithCondition>
        ))}
      </Grid>
    </>
  );
};

DivyangDetail.propTypes = {
  disableProfile: propTypes.bool,
  divyangDetail: propTypes.any,
};
