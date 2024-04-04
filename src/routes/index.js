import { ROUTE_PATHS } from "./routePaths";
import * as routeElements from "./routes";

export const SUPER_ADMIN_ROUTES = [
  {
    path: ROUTE_PATHS.DASHBOARD,
    element: routeElements.Dashboard,
  },

  //state master
  {
    path: ROUTE_PATHS.STATE_MASTER,
    element: routeElements.StateMasterForm,
    children: [
      {
        path: ROUTE_PATHS.STATE_MASTER_TALUK,
        element: routeElements.StateMasterForm,
      },
      {
        path: ROUTE_PATHS.STATE_MASTER_MUNICIPALITY,
        element: routeElements.StateMasterForm,
      },
      {
        path: ROUTE_PATHS.STATE_MASTER_CORPORATION,
        element: routeElements.StateMasterForm,
      },
      {
        path: ROUTE_PATHS.STATE_MASTER_PANCHAYATUNION,
        element: routeElements.StateMasterForm,
      },
      {
        path: ROUTE_PATHS.STATE_MASTER_TOWNPANCHAYAT,
        element: routeElements.StateMasterForm,
      },
      {
        path: ROUTE_PATHS.STATE_MASTER_MLACONSTITUENCY,
        element: routeElements.StateMasterForm,
      },
      {
        path: ROUTE_PATHS.STATE_MASTER_MPCONSTITUENCY,
        element: routeElements.StateMasterForm,
      },
    ],
  },
];
