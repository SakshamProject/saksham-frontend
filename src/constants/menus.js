import {
  AccountCircle,
  AccountTree,
  Business,
  Dashboard,
  FormatListBulleted,
  ManageAccounts,
  People,
  Person,
} from "@mui/icons-material";
import { ROUTE_PATHS } from "../routes/routePaths";
import { CODES } from "./globalConstants";

export const RIGHT_SIDE_MENU = (role, isMobile = false) =>
  [
    role === CODES?.ADMIN && {
      label: "My Profile",
      routePath: ROUTE_PATHS?.PROFILE,
      navigateTo: ROUTE_PATHS?.PROFILE,
      value: "myProfile",
      key: "myProfile",
      icon: <AccountCircle />,
    },
    !isMobile && {
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
    icon: <Dashboard />,
  },
  {
    label: "Seva Kendra Setup",
    value: "sevaKendraSetup",
    key: CODES?.SEVAKENDRA_SETUP,
    icon: <Business />,
    options: [
      {
        name: "Seva Kendra Master",
        navigateTo: ROUTE_PATHS?.SEVA_KENDRA_MASTER_LIST,
        key: "sevaKendraMaster",
      },
      {
        name: "Designations",
        navigateTo: ROUTE_PATHS?.DESIGNATIONS_LIST,
        key: "designations",
      },
    ],
  },
  {
    label: "Seva Kendra Users",
    navigateTo: ROUTE_PATHS?.SEVA_KENDRA_USERS_LIST,
    value: "sevaKendraUsers",
    key: CODES?.SEVAKENDRA_USERS,
    icon: <Person />,
  },
  {
    label: "Type Masters",
    value: "typeMasters",
    key: CODES?.TYPE_MASTERS,
    icon: <FormatListBulleted />,
    options: [
      {
        name: "General Types",
        navigateTo: ROUTE_PATHS?.GENERAL_TYPES_LIST,
        key: "generalTypes",
      },
      {
        name: "State Master",
        navigateTo: ROUTE_PATHS?.STATE_MASTER_TALUK,
        key: "stateMaster",
      },
    ],
  },
  {
    label: "Divyang Details",
    navigateTo: ROUTE_PATHS?.DIVYANG_DETAILS_LIST,
    value: "divyangDetails",
    key: CODES?.DIVYANG_DETAILS,
    icon: <People />,
  },
  {
    label: "Service Master",
    navigateTo: ROUTE_PATHS?.SERVICE_MASTER_LIST,
    value: "serviceMaster",
    key: CODES?.SERVICE_MASTER,
    icon: <ManageAccounts />,
  },
  {
    label: "Service Mapping",
    navigateTo: ROUTE_PATHS?.SERVICE_MAPPING_LIST,
    value: "serviceMapping",
    key: CODES?.SERVICE_MAPPING,
    icon: <AccountTree />,
  },
];

const DIVYANG_SIDE_MENU = [
  {
    label: "My Profile",
    value: "myProfile",
    navigateTo: ROUTE_PATHS?.MY_PROFILE,
    key: CODES?.DIVYANG_DETAILS,
    icon: <AccountCircle />,
  },
  {
    label: "My Services",
    value: "myServices",
    navigateTo: ROUTE_PATHS?.MY_SERVICES_LIST,
    key: CODES?.DIVYANG_DETAILS,
    icon: <ManageAccounts />,
  },
];

export const getSideMenus = ({ role, designations = [], isMobile = false }) => {
  if (role === CODES?.ADMIN)
    return isMobile
      ? [...RIGHT_SIDE_MENU(role, isMobile), ...ADMIN_SIDE_MENUS]
      : ADMIN_SIDE_MENUS;

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
