import { lazy } from "react";

export const Dashboard = lazy(() => import("../components/pages/Dashboard"));

//state master
export const StateMasterForm = lazy(() =>
  import("../components/pages/typeMasters/stateMaster/Form")
);
export const StateType = lazy(() =>
  import("../components/pages/typeMasters/stateMaster/StateType")
);
