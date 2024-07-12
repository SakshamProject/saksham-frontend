import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useCustomQuery = ({
  dependency = "",
  queryKey = "fetch",
  queryFn,
  onSuccess = () => {},
  enabled = true,
  invokeSuccess,
  select,
}) => {
  const query = useQuery({
    queryKey: [queryKey, dependency],
    queryFn: queryFn,
    enabled: enabled,
    select: select,
  });

  useEffect(() => {
    if (query?.data || invokeSuccess) {
      onSuccess(query?.data);
    }
  }, [query?.data]); //eslint-disable-line

  return query;
};
