import { useQueries } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";

import { getSeedService } from "../api/api";
import { setSeed } from "../redux/slice";

const useSeeds = (seedPaths = []) => {
  const seeds = useSelector((state) => state?.seeds);
  const dispatch = useDispatch();

  useQueries({
    queries: seedPaths.map(({ path, name }) => ({
      queryKey: ["seedData", path],
      queryFn: async () => {
        const response = await getSeedService(path);
        dispatch(setSeed({ [name]: response?.data || [] }));
        return response;
      },
      enabled: !seeds?.[name] && !!path,
    })),
  });

  return { ...seeds };
};

export default useSeeds;
