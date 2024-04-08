import { ROUTE_PATHS } from "./routePaths";
import * as routeElements from "./routes";

export const SUPER_ADMIN_ROUTES = [
  {
    path: ROUTE_PATHS.DASHBOARD,
    element: routeElements.Dashboard,
  },

  //sevakendra setup
  {
    path: ROUTE_PATHS.SEVA_KENDRA_MASTER_LIST,
    element: routeElements.SevaKendraMasterList,
  },
  {
    path: ROUTE_PATHS.SEVA_KENDRA_MASTER_FORM,
    element: routeElements.SevaKendraMasterForm,
  },

  //state master
  {
    path: ROUTE_PATHS.STATE_MASTER,
    element: routeElements.StateMasterForm,
    children: [
      {
        path: ROUTE_PATHS.STATE_MASTER_TALUK,
        element: routeElements.StateType,
      },
      {
        path: ROUTE_PATHS.STATE_MASTER_MUNICIPALITY,
        element: routeElements.StateType,
      },
      {
        path: ROUTE_PATHS.STATE_MASTER_CORPORATION,
        element: routeElements.StateType,
      },
      {
        path: ROUTE_PATHS.STATE_MASTER_PANCHAYAT_UNION,
        element: routeElements.StateType,
      },
      {
        path: ROUTE_PATHS.STATE_MASTER_TOWN_PANCHAYAT,
        element: routeElements.StateType,
      },
      {
        path: ROUTE_PATHS.STATE_MASTER_MLA_CONSTITUENCY,
        element: routeElements.StateType,
      },
      {
        path: ROUTE_PATHS.STATE_MASTER_MP_CONSTITUENCY,
        element: routeElements.StateType,
      },
    ],
  },
];
