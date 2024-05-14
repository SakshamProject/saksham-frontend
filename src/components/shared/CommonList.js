import { useQuery } from "@tanstack/react-query";
import propTypes from "prop-types";
import { getApiService, postApiService } from "../../api/api";
import { API_PATHS } from "../../api/apiPaths";
import useResponsive from "../../hooks/useResponsive";
import useTableCustomHooks from "../../hooks/useTableCustomHooks";
import { ROUTE_PATHS } from "../../routes/routePaths";
import { getTableSchemas } from "../../utils/tableSchemas";
import ResponsiveList from "./ResponsiveList";
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
        <ResponsiveList
          columnData={columns}
          rawData={data?.[rawDataAccessor] || data?.data}
          onPageNumberChange={onPageNumberChange}
          currentPage={currentPage}
          count={data?.total}
        />
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
