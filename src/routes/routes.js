import { lazy } from "react";

export const Dashboard = lazy(() => import("../components/pages/Dashboard"));

export const StateMasterForm = lazy(() =>
  import("../components/pages/typeMasters/stateMaster/Form")
);
