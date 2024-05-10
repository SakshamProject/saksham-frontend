import { ROUTE_PATHS } from "../routes/routePaths";
import { CODES } from "./globalConstants";

export const RIGHT_SIDE_MENU = (role) =>
  [
    role === CODES?.ADMIN && {
      label: "My Profile",
      routePath: ROUTE_PATHS?.PROFILE,
    },
    {
      label: "Logout",
      routePath: ROUTE_PATHS?.LOGIN,
    },
  ].filter((item) => item);

const ADMIN_SIDE_MENUS = [
  {
    label: "Dashboard",
    navigateTo: ROUTE_PATHS?.DASHBOARD,
    value: "dashboard",
    key: CODES?.DASHBOARD,
  },
  {
    label: "Seva Kendra Setup",
    value: "sevaKendraSetup",
    key: CODES?.SEVAKENDRA_SETUP,
    options: [
      {
        name: "Seva Kendra Master",
        navigateTo: ROUTE_PATHS?.SEVA_KENDRA_MASTER_LIST,
      },
      {
        name: "Designations",
        navigateTo: ROUTE_PATHS?.DESIGNATIONS_LIST,
      },
    ],
  },
  {
    label: "Seva Kendra Users",
    navigateTo: ROUTE_PATHS?.SEVA_KENDRA_USERS_LIST,
    value: "sevaKendraUsers",
    key: CODES?.SEVAKENDRA_USERS,
  },
  {
    label: "Type Masters",
    value: "typeMasters",
    key: CODES?.TYPE_MASTERS,
    options: [
      {
        name: "General Types",
        navigateTo: ROUTE_PATHS?.GENERAL_TYPES_LIST,
      },
      {
        name: "State Master",
        navigateTo: ROUTE_PATHS?.STATE_MASTER_TALUK,
      },
    ],
  },
  {
    label: "Divyang Details",
    navigateTo: ROUTE_PATHS?.DIVYANG_DETAILS_LIST,
    value: "divyangDetails",
    key: CODES?.DIVYANG_DETAILS,
  },
  {
    label: "Service Master",
    navigateTo: ROUTE_PATHS?.SERVICE_MASTER_LIST,
    value: "serviceMaster",
    key: CODES?.SERVICE_MASTER,
  },
  {
    label: "Service Mapping",
    navigateTo: ROUTE_PATHS?.SERVICE_MAPPING_LIST,
    value: "serviceMapping",
    key: CODES?.SERVICE_MAPPING,
  },
];

const DIVYANG_SIDE_MENU = [
  {
    label: "My Profile",
    value: "myProfile",
    navigateTo: ROUTE_PATHS?.MY_PROFILE,
    key: CODES?.DIVYANG_DETAILS,
  },
  {
    label: "My Services",
    value: "myServices",
    navigateTo: ROUTE_PATHS?.MY_SERVICES_LIST,
    key: CODES?.DIVYANG_DETAILS,
  },
];

export const getSideMenus = ({ role, designations = [] }) => {
  if (role === CODES?.ADMIN) return ADMIN_SIDE_MENUS;

  if (role === CODES?.DIVYANG) return DIVYANG_SIDE_MENU;

  if (role === CODES?.SEVA_KENDRA && designations?.length > 0)
    return designations?.reduce((acc, designation) => {
      const validMenu = ADMIN_SIDE_MENUS?.filter(
        (menu) => designation?.name === menu?.key
      );
      return [...acc, ...validMenu];
    }, []);

  return [];
};
