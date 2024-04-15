import { useQuery } from "@tanstack/react-query";

import { postApiService } from "../../api/api";
import { API_PATHS } from "../../api/apiPaths";
import useTableCustomHooks from "../../hooks/useTableCustomHooks";
import { ROUTE_PATHS } from "../../routes/routePaths";
import { getTableSchemas } from "../../utils/tableSchemas";
import { CustomReactTable, ListTopbar, WithCondition } from "./index";

export const CommonList = ({
  listPath = "",
  formPath = "",
  apiPath = "",
  columns = [],
  label = "",
  customApiPath = "",
  disableTopBar = false,
  disableFilters = false,
  disableSearchField = false,
  disableLayout = false,
  rawDataAccessor = "",
}) => {
  const { filterFields, filterInitialValues } = getTableSchemas(columns);

  const {
    onPageNumberChange,
    onChangePageSize,
    handleTableData,
    tableReRenderActions,
  } = useTableCustomHooks(ROUTE_PATHS?.[listPath]);

  const listParams = handleTableData({});

  const { pageSize, currentPage } = tableReRenderActions();

  const { data, isLoading } = useQuery({
    queryKey: ["commonList" + API_PATHS?.[apiPath], { ...listParams }],
    queryFn: () => {
      const path = customApiPath || API_PATHS?.[apiPath];
      return postApiService(path, { ...listParams });
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
          filterFields={filterFields}
          filterFieldInitial={filterInitialValues}
          isFilterParams={!!listParams?.filters?.length}
          disableSearchField={disableSearchField}
          disableFilter={disableFilters}
        />
      </WithCondition>

      <CustomReactTable
        columnData={columns}
        rawData={data?.[rawDataAccessor] || data?.data || []}
        isLoading={isLoading}
        onPageNumberChange={onPageNumberChange}
        onChangePageSize={onChangePageSize}
        pageSize={pageSize}
        currentPage={currentPage}
        count={data?.total}
        disableLayout={disableLayout}
      />
    </>
  );
};

export default CommonList;
