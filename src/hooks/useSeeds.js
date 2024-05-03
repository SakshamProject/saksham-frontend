import { useQueries } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getApiService, postApiService } from "../api/api";
import { dispatchSeeds } from "../utils/dispatch";

function useSeeds(seedPaths = []) {
  const seeds = useSelector((state) => state?.seeds);

  // useQueries(
  //   seedPaths.map(({ path, name }) => ({
  //     queryKey: ["seedData", path],
  //     queryFn: () => getSeedService(path),
  //     enabled: !seeds?.[name] && !!path,
  //     onSuccess: ({ data }) => {
  //       dispatch(setSeed({ [name]: [...data] }));
  //     },
  //   }))
  // );

  useQueries({
    queries: seedPaths.map(({ path, name, isGet = true }) => ({
      queryKey: ["seedData", path],
      queryFn: async () => {
        const response = isGet ? getApiService(path) : postApiService(path, {});
        dispatchSeeds({ [name]: response?.data });
        return response;
      },
      enabled: !seeds?.[name] && !!path,
    })),
  });

  return { ...seeds };
}

export default useSeeds;
