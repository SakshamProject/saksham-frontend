import { ROUTE_PATHS } from "../routes/routePaths";
import { CODES } from "./globalConstants";

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

const SIDE_MENUS = [
  {
    label: "Dashboard",
    navigateTo: ROUTE_PATHS.DASHBOARD,
    value: "dashboard",
    key: CODES.DASHBOARD,
  },
  {
    label: "Seva Kendra Setup",
    value: "sevaKendraSetup",
    key: CODES.SEVAKENDRA_SETUP,
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
    key: CODES.SEVAKENDRA_USERS,
  },
  {
    label: "Type Masters",
    value: "typeMasters",
    key: CODES.TYPE_MASTERS,
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
  {
    label: "Divyang Details",
    navigateTo: ROUTE_PATHS.DIVYANG_DETAILS_LIST,
    value: "divyangDetails",
    key: CODES.DIVYANG_DETAILS,
  },
  {
    label: "Service Master",
    navigateTo: ROUTE_PATHS.SERVICE_MASTER_LIST,
    value: "serviceMaster",
    key: CODES.SERVICE_MASTER,
  },
  {
    label: "Service Mapping",
    navigateTo: ROUTE_PATHS.SERVICE_MAPPING_LIST,
    value: "serviceMapping",
    key: CODES.SERVICE_MAPPING,
  },
];

export const getSideMenus = ({ all = false, designations = [] }) => {
  if (all) return SIDE_MENUS;

  return designations?.reduce((acc, designation) => {
    const validMenu = SIDE_MENUS?.filter(
      (menu) => designation?.feature?.name === menu?.key
    );
    return [...acc, ...validMenu];
  }, []);
};
