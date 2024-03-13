import styled from "@emotion/styled";
import { Grid, Typography } from "@mui/material";
import React from "react";

const Title = styled(Typography)({
  textAlign: "left",
  font: "normal normal bold 16px/19px Lato",
  letterSpacing: "0px",
  color: "#333333",
  opacity: "1",
});

const SecTitle = styled(Typography)({
  textAlign: "left",
  font: "normal normal bold 16px/19px Lato",
  letterSpacing: "0px",
  color: "#333333",
  opacity: "1",
  marginBottom: "5px",
});

const ValueText = styled(Typography)({
  textAlign: "left",
  font: "normal normal normal 16px/19px Lato",
  letterSpacing: "0px",
  color: "#333333",
  opacity: "1",
});

const formatDate = (date) => {
  const formattedDate = new Date(date);
  const formattedTime = new Date(date);

  return `${formattedDate === "Invalid date" ? "" : formattedDate} - ${
    formattedTime === "Invalid date" ? "" : formattedTime
  }`;
};

export const AuditLog = ({ data, sx }) => {
  return (
    <Grid
      container
      rowSpacing={2}
      columnSpacing={3}
      sx={{ padding: "10px 5px 0px 20px", ...sx }}
    >
      <Grid item xs={12}>
        <Title>AUDIT LOG</Title>
      </Grid>

      <Grid item xs={6}>
        <SecTitle>Created by</SecTitle>
        <ValueText>
          {data?.createdBy?.name} - {formatDate(data?.createdAt)}
        </ValueText>
      </Grid>

      <Grid item xs={6}>
        <SecTitle>Updated by</SecTitle>
        <ValueText>
          {data?.updatedBy?.name} - {formatDate(data?.updatedAt)}
        </ValueText>
      </Grid>
    </Grid>
  );
};
