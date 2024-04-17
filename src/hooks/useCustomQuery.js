/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useCustomQuery = ({
  dependency = "",
  queryKey = "fetch",
  queryFn,
  onSuccess = () => {},
  enabled = true,
  invokeSuccess,
  select,
}) => {
  const [successCount, setSuccessCount] = useState(-1);
  const query = useQuery({
    queryKey: [queryKey, dependency],
    queryFn: queryFn,
    enabled: enabled,
    select: select,
  });

  useEffect(() => {
    if (query?.data || invokeSuccess) {
      setSuccessCount((prev) => prev + 1);
      onSuccess(query?.data);
    }
  }, [query.data]);

  query.successCount = successCount;

  return query;
};
