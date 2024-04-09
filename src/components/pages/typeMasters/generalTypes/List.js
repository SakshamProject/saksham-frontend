import { useQuery } from "@tanstack/react-query";

import { getApiService } from "../../../../api/api";
import { API_PATHS } from "../../../../api/apiPaths";
import { generalTypeColumns } from "../../../../constants/typeMasters/generalTypes";
import { ROUTE_PATHS } from "../../../../routes/routePaths";
import { CustomReactTable, ListTopbar } from "../../../shared";

const List = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["get all general types"],
    queryFn: () => getApiService(API_PATHS.GENERAL_MASTER_SEED),
    select: ({ data }) => data?.data,
  });

  return (
    <>
      <ListTopbar
        label="General Type"
        newFormPath={ROUTE_PATHS.GENERAL_TYPES_FORM}
        listPath={ROUTE_PATHS.GENERAL_TYPES_LIST}
        disableFilter
        disableSearchField
      />

      <CustomReactTable
        columnData={generalTypeColumns || []}
        rawData={data || []}
        isLoading={isLoading}
        maxHeight="430px"
        disablePagination
        manualSort
      />
    </>
  );
};

export default List;
