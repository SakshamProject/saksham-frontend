import { useQueries } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getApiService } from "../api/api";
import { dispatchSeeds } from "../utils/dispatch";

const useSeeds = (seedPaths = []) => {
  const seeds = useSelector((state) => state?.seeds);

  useQueries({
    queries: seedPaths.map(({ path, name }) => ({
      queryKey: ["seedData", path],
      queryFn: async () => {
        const response = await getApiService(path);
        const data = response?.data || [];
        dispatchSeeds({ [name]: [...data] });
        return response;
      },
      enabled: !seeds?.[name] && !!path,
      select : ()
    })),
  });

  return { ...seeds };
};

export default useSeeds;
