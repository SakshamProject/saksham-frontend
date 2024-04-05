import { ROUTE_PATHS } from "../routes/routePaths";

export const SIDE_MENU = [
  {
    label: "Dashboard",
    navigateTo: ROUTE_PATHS.DASHBOARD,
    value: "dashboard",
  },
  {
    label: "Seva Kendra Setup",
    value: "sevaKendraSetup",
    options: [
      {
        name: "Seva Kendra Master",
        navigateTo: ROUTE_PATHS.SEVA_KENDRA_MASTER_LIST,
      },
      {
        name: "Designations",
        navigateTo: ROUTE_PATHS.DESIGNATIONS_LIST,
      },
    ],
  },
  {
    label: "Seva Kendra Users",
    navigateTo: ROUTE_PATHS.SEVA_KENDRA_USERS_LIST,
    value: "sevaKendraUsers",
  },
  {
    label: "Type Masters",
    value: "typeMasters",
    options: [
      {
        name: "General Types",
        navigateTo: ROUTE_PATHS.GENERAL_TYPES_LIST,
      },
      {
        name: "State Master",
        navigateTo: ROUTE_PATHS.STATE_MASTER_TALUK,
      },
    ],
  },
];

export const RIGHT_SIDE_MENU = () => [
  {
    label: "My Profile",
    routePath: ROUTE_PATHS.PROFILE,
  },
  {
    label: "Logout",
    routePath: ROUTE_PATHS.LOGIN,
  },
];
