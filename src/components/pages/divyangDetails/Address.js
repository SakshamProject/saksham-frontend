import React from "react";
import { Grid } from "@mui/material";

import { DivyangDetail } from "../../shared";
import { CustomTypography, StyledFormContainer, theme } from "../../../styles";

const Address = () => {
  return (
    <Grid container direction={"column"} width={"100%"} rowSpacing={2}>
      <Grid item xs={12}>
        <DivyangDetail />
      </Grid>
      <Grid item xs={12}>
        <StyledFormContainer width="100%">
          <Grid container columnSpacing={3} rowSpacing={1}>
            <Grid item xs={12}>
              <CustomTypography
                capitalize
                variant="h6"
                style={{ fontSize: "24px" }}
              >
                Permanent address
              </CustomTypography>
            </Grid>
          </Grid>
        </StyledFormContainer>
      </Grid>
    </Grid>
  );
};

export default Address;
