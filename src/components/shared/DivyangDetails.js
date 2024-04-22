import { Box, Grid, Typography, styled } from "@mui/material";

import user from "../../assets/profile.png";
import { WithCondition } from "./WithCondition";

const StyledImage = styled("img")({
  width: 175,
  height: 200,
  objectFit: "cover",
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

const defaultDivyangDetailColumns = [
  {
    accessor: "name",
    Header: "Name",
  },
  {
    accessor: "mobileNo",
    Header: "Mobile No",
  },
  {
    accessor: "divyangId",
    Header: "Divyang Id",
  },
  {
    accessor: "aadharNo",
    Header: "Aadhar No",
  },
];

const DivyangDetail = ({
  divyangDetail,
  disableProfile = false,
  divyangDetailColumns = [],
}) => {
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
        {defaultDivyangDetailColumns?.map((item, key) => (
          <WithCondition isValid={!!divyangDetail?.[item?.accessor]}>
            <DetailSection key={key + item?.accessor} sx={{ display: "flex" }}>
              <Title>{`${item?.Header} : `}</Title>
              <Typography>{divyangDetail?.[item?.accessor]}</Typography>
            </DetailSection>
          </WithCondition>
        ))}
      </Grid>
    </>
  );
};

export default DivyangDetail;
