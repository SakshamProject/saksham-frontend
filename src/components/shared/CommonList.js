import { MoreHoriz } from "@mui/icons-material";
import { Box, Pagination } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import propTypes from "prop-types";
import { getApiService, postApiService } from "../../api/api";
import { API_PATHS } from "../../api/apiPaths";
import useResponsive from "../../hooks/useResponsive";
import useTableCustomHooks from "../../hooks/useTableCustomHooks";
import { ROUTE_PATHS } from "../../routes/routePaths";
import { StyledIconButton } from "../../styles";
import { scrollbarStyle } from "../../styles/scrollbarStyle";
import { getTableSchemas } from "../../utils/tableSchemas";
import { CustomReactTable, ListTopbar, WithCondition } from "./index";

export const CommonList = ({
  listPath,
  formPath,
  apiPath,
  columns,
  label,
  customApiPath,
  disableTopBar,
  disableFilters,
  disableSearchField,
  disableLayout,
  disablePagination,
  disableColumnHiding,
  isGetApi,
  manualSort,
  rawDataAccessor,
  disableNewForm,
}) => {
  const { isMobile } = useResponsive();
  const { filterFields, filterInitialValues } = getTableSchemas(columns);

  const {
    onPageNumberChange,
    onChangePageSize,
    handleTableData,
    tableReRenderActions,
  } = useTableCustomHooks(ROUTE_PATHS?.[listPath]);

  const listParams = handleTableData();

  const { pageSize, currentPage } = tableReRenderActions();

  const { data, isLoading } = useQuery({
    queryKey: ["commonList" + API_PATHS?.[apiPath], listParams],
    queryFn: () => {
      const path = customApiPath || API_PATHS?.[apiPath];
      return isGetApi
        ? getApiService(path)
        : postApiService(path, { ...listParams });
    },
    enabled: !!customApiPath || !!API_PATHS?.[apiPath],
    select: ({ data }) => data,
  });

  const accessProperty = (obj, accessorString) => {
    const accessors = accessorString.split(".");
    let value = obj;
    for (const element of accessors) {
      value = value[element];
      if (!value) {
        return undefined;
      }
    }
    return value;
  };

  return (
    <>
      <WithCondition isValid={!disableTopBar}>
        <ListTopbar
          label={label}
          newFormPath={ROUTE_PATHS?.[formPath]}
          listPath={ROUTE_PATHS?.[listPath]}
          filterFields={filterFields || []}
          filterFieldInitial={filterInitialValues}
          disableSearchField={disableSearchField}
          disableFilter={disableFilters}
          disableNewForm={disableNewForm}
        />
      </WithCondition>

      <WithCondition isValid={!isMobile}>
        <CustomReactTable
          columnData={columns || []}
          rawData={data?.[rawDataAccessor] || data?.data || []}
          isLoading={isLoading}
          onPageNumberChange={onPageNumberChange}
          onChangePageSize={onChangePageSize}
          pageSize={pageSize}
          currentPage={currentPage}
          count={data?.total}
          disableLayout={disableLayout}
          disablePagination={disablePagination}
          disableColumnHiding={disableColumnHiding}
          manualSort={manualSort}
        />
      </WithCondition>

      <WithCondition isValid={isMobile}>
        <Box
          sx={{
            overflow: "auto",
            height: "calc(100vh - (56px + 80px + 24px))",
            ...scrollbarStyle(true),
          }}
        >
          <Box sx={{ marginBottom: "24px" }}>
            {(data?.[rawDataAccessor] || data?.data || [])?.map(
              (cardItem, key) => (
                <Box
                  key={key + cardItem?.id}
                  sx={{
                    width: "100%",
                    padding: "8px 40px 8px 8px",
                    border: "1px solid black",
                    borderRadius: "8px",
                    marginBottom: "24px",
                    minHeight: "64px",
                    position: "relative",
                  }}
                >
                  <StyledIconButton
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                    }}
                  >
                    <MoreHoriz />
                  </StyledIconButton>

                  {columns?.map((card, key) => (
                    <Box
                      key={card?.Header + key}
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
                        &nbsp;:&nbsp;{accessProperty(cardItem, card?.accessor)}
                      </Box>
                    </Box>
                  ))}
                </Box>
              )
            )}
          </Box>

          <WithCondition isValid={Math.ceil(data?.total / 10) > 1}>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                background: "red",
              }}
            >
              <Pagination
                count={Math.ceil(data?.total / 10)}
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

export default CommonList;

CommonList.propTypes = {
  listPath: propTypes.string,
  formPath: propTypes.string,
  apiPath: propTypes.string,
  columns: propTypes.array,
  label: propTypes.string,
  customApiPath: propTypes.string,
  disableTopBar: propTypes.bool,
  disableFilters: propTypes.bool,
  disableSearchField: propTypes.bool,
  disableLayout: propTypes.bool,
  disablePagination: propTypes.bool,
  disableColumnHiding: propTypes.bool,
  isGetApi: propTypes.bool,
  manualSort: propTypes.bool,
  rawDataAccessor: propTypes.string,
  disableNewForm: propTypes.bool,
};
