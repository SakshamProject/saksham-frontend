import { Box, Pagination, Typography, styled } from "@mui/material";
import propTypes from "prop-types";
import React, { Fragment } from "react";
import { scrollbarStyle } from "../../styles/scrollbarStyle";
import { EditPopover, WithCondition } from "./index";

const CardWrapper = styled(Box)(({ theme }) => ({
  overflow: "auto",
  height: "calc(100vh - (56px + 80px + 24px))",
  ...scrollbarStyle(true),
  [theme.breakpoints.down("sm")]: {
    height: "auto",
  },
}));

const CardContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  padding: "8px 40px 8px 8px",
  border: `1px solid ${theme.palette?.commonColor?.black}`,
  borderRadius: "8px",
  marginBottom: "16px",
  minHeight: "64px",
  position: "relative",
}));

const MoreButtonContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  right: 0,
}));

const CardDetailsContainer = styled(Box)(() => ({
  padding: "4px 0",
  width: "100%",
  display: "flex",
}));

const CardDetail = styled(Box)(() => ({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  flex: "1",
}));

const PaginationContainer = styled(Box)(() => ({
  display: "flex",
  width: "100%",
  justifyContent: "center",
  paddingBottom: "16px",
}));

const ResponsiveList = ({
  columnData,
  rawData,
  onPageNumberChange,
  currentPage,
  count,
  disablePagination,
}) => {
  const accessProperty = (obj, accessorString) => {
    const accessors = accessorString?.split(".");
    if (!accessors || accessors.length === 0) {
      return undefined;
    }
    let value = obj;
    for (const element of accessors) {
      value = value?.[element];
      if (value === undefined) {
        return undefined;
      }
    }
    return value;
  };

  return (
    <>
      <WithCondition isValid={!rawData?.length}>
        <Box sx={{ textAlign: "center" }}>
          <Typography fontSize={"20px"}>No Data</Typography>
          <Typography>There seems to be no data found.</Typography>
        </Box>
      </WithCondition>

      <WithCondition isValid={!!rawData?.length}>
        <CardWrapper>
          <Box sx={{ marginBottom: "24px" }}>
            {rawData?.map((cardItem, rawDataKey) => (
              <CardContainer key={rawDataKey + cardItem?.id}>
                {columnData?.map((card, key) => (
                  <Fragment key={card?.Header + key}>
                    <WithCondition isValid={!!card?.inputValues}>
                      <MoreButtonContainer>
                        <EditPopover
                          inputValues={
                            card?.inputValues
                              ? card?.inputValues({
                                  row: cardItem,
                                  index: rawDataKey,
                                  value: accessProperty(
                                    cardItem,
                                    card?.accessor
                                  ),
                                })
                              : []
                          }
                          disable={card?.disable}
                        />
                      </MoreButtonContainer>
                    </WithCondition>

                    <WithCondition isValid={card?.Header?.trim()}>
                      <CardDetailsContainer>
                        <Box sx={{ flex: "1" }}>{card?.Header}</Box>
                        <CardDetail>
                          &nbsp;:&nbsp;
                          {card?.responsiveCell
                            ? card?.responsiveCell({
                                row: cardItem,
                                value: accessProperty(cardItem, card?.accessor),
                              }) || "--"
                            : accessProperty(cardItem, card?.accessor) || "--"}
                        </CardDetail>
                      </CardDetailsContainer>
                    </WithCondition>
                  </Fragment>
                ))}
              </CardContainer>
            ))}
          </Box>

          <WithCondition
            isValid={!disablePagination && Math.ceil(count / 10) > 1}
          >
            <PaginationContainer>
              <Pagination
                count={Math.ceil(count / 10) || 0}
                page={currentPage}
                onChange={(_, page) => onPageNumberChange(page)}
              />
            </PaginationContainer>
          </WithCondition>
        </CardWrapper>
      </WithCondition>
    </>
  );
};

export default ResponsiveList;

ResponsiveList.propTypes = {
  columnData: propTypes.array,
  rawData: propTypes.array,
  onPageNumberChange: propTypes.func,
  currentPage: propTypes.number,
  count: propTypes.number,
  disablePagination: propTypes.bool,
};
