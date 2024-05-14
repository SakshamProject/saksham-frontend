import { Box, Pagination, Typography } from "@mui/material";
import React, { Fragment } from "react";
import { theme } from "../../styles";
import { scrollbarStyle } from "../../styles/scrollbarStyle";
import { EditPopover, WithCondition } from "./index";

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
      <WithCondition isValid={rawData?.length <= 0}>
        <Box sx={{ textAlign: "center" }}>
          <Typography fontSize={"20px"}>No Data</Typography>
          <Typography>There seems to be no data found.</Typography>
        </Box>
      </WithCondition>

      <WithCondition isValid={rawData?.length > 0}>
        <Box
          sx={{
            overflow: "auto",
            height: "calc(100vh - (56px + 80px + 24px))",
            ...scrollbarStyle(true),
            [theme.breakpoints.down("sm")]: {
              height: "auto",
            },
          }}
        >
          <Box sx={{ marginBottom: "24px" }}>
            {rawData?.map((cardItem, rawDataKey) => (
              <Box
                key={rawDataKey + cardItem?.id}
                sx={{
                  width: "100%",
                  padding: "8px 40px 8px 8px",
                  border: "1px solid black",
                  borderRadius: "8px",
                  marginBottom: "16px",
                  minHeight: "64px",
                  position: "relative",
                }}
              >
                {columnData?.map((card, key) => (
                  <Fragment key={card?.Header + key}>
                    <WithCondition isValid={!!card?.inputValues}>
                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                        }}
                      >
                        <EditPopover
                          inputValues={
                            card?.inputValues
                              ? card?.inputValues({
                                  row: cardItem,
                                  index: rawDataKey,
                                })
                              : []
                          }
                          disable={card?.disable}
                        />
                      </Box>
                    </WithCondition>

                    <WithCondition isValid={card?.Header?.trim()}>
                      <Box
                        sx={{
                          padding: "4px 0",
                          width: "100%",
                          display: "flex",
                        }}
                      >
                        <Box sx={{ flex: "1" }}>{card?.Header}</Box>
                        <Box
                          sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            flex: "1",
                          }}
                        >
                          &nbsp;:&nbsp;
                          {card?.responsiveCell
                            ? card?.responsiveCell({
                                row: cardItem,
                                value: accessProperty(cardItem, card?.accessor),
                              }) || "--"
                            : accessProperty(cardItem, card?.accessor) || "--"}
                        </Box>
                      </Box>
                    </WithCondition>
                  </Fragment>
                ))}
              </Box>
            ))}
          </Box>

          <WithCondition
            isValid={!disablePagination && Math.ceil(count / 10) > 1}
          >
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                paddingBottom: "16px",
              }}
            >
              <Pagination
                count={Math.ceil(count / 10) || 0}
                page={currentPage}
                onChange={(_, page) => onPageNumberChange(page)}
              />
            </Box>
          </WithCondition>
        </Box>
      </WithCondition>
    </>
  );
};

export default ResponsiveList;
