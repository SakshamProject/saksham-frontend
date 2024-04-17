import styled from "@emotion/styled";
import { Grid, Typography } from "@mui/material";
import React from "react";
import { formatDate } from "../../utils/common";

const Title = styled(Typography)(({ theme }) => ({
  textAlign: "left",
  font: "normal normal bold 16px/19px Lato",
  letterSpacing: "0px",
  color: theme.palette?.commonColor?.black,
  opacity: "1",
}));

const SecTitle = styled(Typography)(({ theme }) => ({
  textAlign: "left",
  font: "normal normal bold 16px/19px Lato",
  letterSpacing: "0px",
  color: theme.palette?.commonColor?.black,
  opacity: "1",
  marginBottom: "5px",
}));

const ValueText = styled(Typography)(({ theme }) => ({
  textAlign: "left",
  font: "normal normal normal 16px/19px Lato",
  letterSpacing: "0px",
  color: theme.palette?.commonColor?.black,
  opacity: "1",
}));

export const AuditLog = ({
  createdAt,
  updatedAt,
  createdByName,
  updatedByName,
  sx,
  hide,
}) => {
  if (hide) return null;

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
          {createdByName
            ? `${createdByName} - ${formatDate({
                date: createdAt,
                format: "DD-MM-YYYY",
              })}`
            : `${formatDate({
                date: createdAt,
                format: "DD-MM-YYYY",
              })}`}
        </ValueText>
      </Grid>

      <Grid item xs={6}>
        <SecTitle>Updated by</SecTitle>
        <ValueText>
          {updatedByName
            ? `${updatedByName} - ${formatDate({
                date: updatedAt,
                format: "DD-MM-YYYY",
              })}`
            : `${formatDate({
                date: updatedAt,
                format: "DD-MM-YYYY",
              })}`}
        </ValueText>
      </Grid>
    </Grid>
  );
};
