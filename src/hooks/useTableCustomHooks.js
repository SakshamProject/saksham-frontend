import queryString from "query-string";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { createQueryParams } from "../utils/queryParams";

const useTableCustomHooks = (path) => {
  const location = useLocation();
  const navigate = useNavigate();

  const pageParams = queryString.parse(location?.search);
  const pageSize = parseInt(pageParams?.pageSize) || 10;
  const currentPage = parseInt(pageParams?.currentPage) || 1;
  const search = location.search;
  const searchParam = useMemo(() => new URLSearchParams(search), [search]);
  const searchData = searchParam?.get("search");

  const { filterData, sortData } = useMemo(() => {
    const filterData = searchParam?.get("filter")
      ? JSON.parse(searchParam?.get("filter"))
      : [];
    const sortData = searchParam?.get("sort")
      ? JSON.parse(searchParam?.get("sort"))
      : null;

    return { filterData, sortData };
  }, [searchParam]);

  const onPageNumberChange = (page) => {
    const newParams = createQueryParams({
      ...pageParams,
      pageSize,
      currentPage: page,
    });
    return navigate(
      { pathname: path, search: newParams },
      { state: location.state || null }
    );
  };

  const onChangePageSize = (size) => {
    const newParams = createQueryParams({
      ...pageParams,
      pageSize: size,
      currentPage: size === pageSize ? currentPage : 1,
    });
    return navigate(
      { pathname: path, search: newParams },
      { state: location.state || null }
    );
  };

  const handleTableData = () => {
    const start = pageSize * (currentPage - 1) + 1;
    return {
      pagination: {
        rows: pageSize,
        start,
      },
      sorting: !!sortData
        ? sortData
        : { orderByColumn: "createdAt", sortOrder: "desc" },
      filters: filterData?.length !== 0 ? filterData : [],
      searchText: searchData || "",
    };
  };

  const tableReRenderActions = () => {
    return {
      pageSize,
      sortData,
      searchData,
      currentPage,
      filterData,
    };
  };

  return {
    onPageNumberChange,
    onChangePageSize,
    handleTableData,
    tableReRenderActions,
  };
};

export default useTableCustomHooks;
