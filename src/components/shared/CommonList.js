import { useQuery } from "@tanstack/react-query";

import { postApiService } from "../../api/api";
import useTableCustomHooks from "../../hooks/useTableCustomHooks";
import { ROUTE_PATHS } from "../../routes/routePaths";
import { getTableSchemas } from "../../utils/tableSchemas";
import { CustomReactTable, ListTopbar, WithCondition } from "./index";
import { API_PATHS } from "../../api/apiPaths";

export const CommonList = ({
  listPath,
  formPath,
  apiPath,
  columns,
  label,
  defaultSortedValues,
  disableTopBar,
  disableLayout,
  customApiPath,
  disableFilters,
  disableSearchField,
  dataAccessor,
}) => {
  const { filterFields, filterInitialValues } = getTableSchemas(columns);
  const {
    onPageNumberChange,
    onChangePageSize,
    handleTableData,
    tableReRenderActions,
  } = useTableCustomHooks(ROUTE_PATHS?.[listPath]);

  const listParams = handleTableData(columns, defaultSortedValues);

  const filters = [];

  const { pageSize, currentPage } = tableReRenderActions();

  const { data, isLoading } = useQuery({
    queryKey: ["commonList" + API_PATHS?.[apiPath], { ...listParams, filters }],
    queryFn: () => {
      const path = customApiPath || API_PATHS?.[apiPath];
      return postApiService(path, { ...listParams, filters });
    },
    enabled: !!customApiPath || !!API_PATHS?.[apiPath],
  });

  return (
    <>
      <WithCondition isValid={!disableTopBar}>
        <ListTopbar
          label={label || ""}
          newFormPath={ROUTE_PATHS?.[formPath]}
          listPath={ROUTE_PATHS?.[listPath]}
          filterFields={filterFields}
          filterFieldInitial={filterInitialValues}
          isFilterParams={!!listParams?.filters?.length}
          disableSearchField={disableSearchField}
          disableFilter={disableFilters}
        />
      </WithCondition>

      <CustomReactTable
        columnData={columns || []}
        rawData={data?.data?.[dataAccessor] || data?.data || []}
        isLoading={isLoading}
        onPageNumberChange={onPageNumberChange}
        onChangePageSize={onChangePageSize}
        pageSize={pageSize}
        currentPage={currentPage}
        count={data?.data?.count}
        disableLayout={disableLayout}
      />
    </>
  );
};

export default CommonList;
