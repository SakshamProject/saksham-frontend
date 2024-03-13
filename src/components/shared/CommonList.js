import { useQuery } from "@tanstack/react-query";
import React from "react";

import { CustomReactTable, ListTopBar, WithCondition } from ".";
import { postApiServices } from "../../api/api";
import { API_PATHS } from "../../api/apiPaths";
import useTableCustomHooks from "../../hooks/useTableCustomHooks";
import { ROUTE_PATHS } from "../../routes/routePaths";
import { getTableSchemas } from "../../utils/tableSchemas";

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
}) => {
  const { searchFields, filterFields, filterInitialValues } =
    getTableSchemas(columns);

  const {
    onPageNumberChange,
    onChangePageSize,
    handleTableData,
    tableReRenderActions,
  } = useTableCustomHooks(ROUTE_PATHS?.[listPath]);

  const listParams = handleTableData(
    searchFields,
    columns,
    defaultSortedValues
  );

  const { pageSize, currentPage } = tableReRenderActions();

  const { data, isLoading } = useQuery({
    queryKey: ["commonList" + API_PATHS?.[apiPath], listParams],
    queryFn: () => {
      const path = customApiPath || API_PATHS?.[apiPath];
      return postApiServices(path, listParams);
    },
    enabled: !!customApiPath || !!API_PATHS?.[apiPath],
  });

  return (
    <>
      <WithCondition isValid={!disableTopBar}>
        <ListTopBar
          label={label || ""}
          newFormPath={ROUTE_PATHS?.[formPath]}
          listPath={ROUTE_PATHS?.[listPath]}
          filterFields={filterFields}
          filterFieldInitial={filterInitialValues}
        />
      </WithCondition>

      <CustomReactTable
        columnData={columns || []}
        rawData={data?.data?.rows || []}
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
