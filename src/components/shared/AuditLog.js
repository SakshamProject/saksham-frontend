import styled from "@emotion/styled";
import { Grid, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import propTypes from "prop-types";
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

const ValueText = styled(Typography)(({ theme, matches }) => ({
  textAlign: "left",
  font: "normal normal normal 16px/19px Lato",
  letterSpacing: "0px",
  color: theme.palette?.commonColor?.black,
  opacity: "1",
  display: "flex",
  flexDirection: matches === "true" ? "row" : "column",
}));

const Texts = styled("span")({
  font: "normal normal normal 16px/19px Lato",
  padding: "0 4px 2px 0",
});

export const AuditLog = ({ auditLog, style, hide }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));

  if (hide) return null;

  return (
    <Grid container rowSpacing={2} columnSpacing={3} sx={{ ...style }}>
      <Grid item xs={12}>
        <Title>AUDIT LOG</Title>
      </Grid>

      <Grid item xs={6}>
        <SecTitle>Created&nbsp;by</SecTitle>
        <ValueText matches={`${matches}`}>
          {auditLog?.createdBy ? (
            <>
              <Texts>{auditLog?.createdBy}</Texts>
              <Texts>{matches ? "-" : ""}</Texts>
              <Texts>
                {formatDate({
                  date: auditLog?.createdAt,
                  format: "DD-MM-YYYY",
                })}
              </Texts>
              <Texts>{matches ? "-" : ""}</Texts>
              <Texts>
                {formatDate({
                  date: auditLog?.createdAt,
                  format: "hh:MM AM/PM",
                })}
              </Texts>
            </>
          ) : (
            <Texts>N/A</Texts>
          )}
        </ValueText>
      </Grid>

      <Grid item xs={6}>
        <SecTitle>Updated&nbsp;by</SecTitle>
        <ValueText matches={`${matches}`}>
          {auditLog?.updatedBy ? (
            <>
              <Texts>{auditLog?.updatedBy}</Texts>
              <Texts>{matches ? "-" : ""}</Texts>
              <Texts>
                {formatDate({
                  date: auditLog?.updatedAt,
                  format: "DD-MM-YYYY",
                })}
              </Texts>
              <Texts>{matches ? "-" : ""}</Texts>
              <Texts>
                {formatDate({
                  date: auditLog?.updatedAt,
                  format: "hh:MM AM/PM",
                })}
              </Texts>
            </>
          ) : (
            <Texts>N/A</Texts>
          )}
        </ValueText>
      </Grid>
    </Grid>
  );
};

AuditLog.propTypes = {
  auditLog: propTypes.object,
  style: propTypes.string,
  hide: propTypes.bool,
};
