import ForgetPassword from "../components/pages/login/ForgetPassword";
import Login from "../components/pages/login/Login";
import ResetPassword from "../components/pages/login/ResetPassword";
import Signup from "../components/pages/login/Signup";
import { CODES } from "../constants/globalConstants";
import { ROUTE_PATHS } from "./routePaths";
import * as routeElements from "./routes";

export const GENERAL_ROUTES = [
  {
    path: ROUTE_PATHS?.LOGIN,
    element: Login,
    key: "login",
  },
  {
    path: ROUTE_PATHS?.FORGOT_PASSWORD,
    element: ForgetPassword,
    key: "forgetPassword",
  },
  {
    path: ROUTE_PATHS?.RESET_PASSWORD,
    element: ResetPassword,
    key: "resetPassword",
  },
  {
    path: ROUTE_PATHS?.SIGNUP,
    element: Signup,
    key: "signup",
  },
  {
    path: ROUTE_PATHS?.LOGIN_ADMIN,
    element: Login,
    key: "adminLogin",
  },
];

const ADMIN_ROUTES = [
  {
    path: ROUTE_PATHS?.DASHBOARD,
    element: routeElements?.Dashboard,
    key: CODES?.DASHBOARD,
  },

  //seva kendra setup
  {
    path: ROUTE_PATHS?.SEVA_KENDRA_MASTER_LIST,
    element: routeElements?.SevaKendraMasterList,
    key: CODES?.SEVAKENDRA_SETUP,
  },
  {
    path: ROUTE_PATHS?.SEVA_KENDRA_MASTER_FORM,
    element: routeElements?.SevaKendraMasterForm,
    key: CODES?.SEVAKENDRA_SETUP,
  },

  //designation
  {
    path: ROUTE_PATHS?.DESIGNATIONS_LIST,
    element: routeElements?.DesignationsList,
    key: CODES?.SEVAKENDRA_SETUP,
  },
  {
    path: ROUTE_PATHS?.DESIGNATIONS_FORM,
    element: routeElements?.DesignationsForm,
    key: CODES?.SEVAKENDRA_SETUP,
  },

  //seva kendra users
  {
    path: ROUTE_PATHS?.SEVA_KENDRA_USERS_LIST,
    element: routeElements?.SevaKendraUsersList,
    key: CODES?.SEVAKENDRA_USERS,
  },
  {
    path: ROUTE_PATHS?.SEVA_KENDRA_USERS_FORM,
    element: routeElements?.SevaKendraUsersForm,
    key: CODES?.SEVAKENDRA_USERS,
  },

  //general types
  {
    path: ROUTE_PATHS?.GENERAL_TYPES_LIST,
    element: routeElements?.GeneralTypesList,
    key: CODES?.TYPE_MASTERS,
  },
  {
    path: ROUTE_PATHS?.GENERAL_TYPES_FORM,
    element: routeElements?.GeneralTypesForm,
    key: CODES?.TYPE_MASTERS,
  },

  //state master
  {
    path: ROUTE_PATHS?.STATE_MASTER,
    element: routeElements?.StateMasterForm,
    key: CODES?.TYPE_MASTERS,
    children: [
      {
        path: ROUTE_PATHS?.STATE_MASTER_TALUK,
        element: routeElements?.StateType,
      },
      {
        path: ROUTE_PATHS?.STATE_MASTER_MUNICIPALITY,
        element: routeElements?.StateType,
      },
      {
        path: ROUTE_PATHS?.STATE_MASTER_CORPORATION,
        element: routeElements?.StateType,
      },
      {
        path: ROUTE_PATHS?.STATE_MASTER_PANCHAYAT_UNION,
        element: routeElements?.StateType,
      },
      {
        path: ROUTE_PATHS?.STATE_MASTER_TOWN_PANCHAYAT,
        element: routeElements?.StateType,
      },
      {
        path: ROUTE_PATHS?.STATE_MASTER_MLA_CONSTITUENCY,
        element: routeElements?.StateType,
      },
      {
        path: ROUTE_PATHS?.STATE_MASTER_MP_CONSTITUENCY,
        element: routeElements?.StateType,
      },
    ],
  },

  //divyang details
  {
    path: ROUTE_PATHS?.DIVYANG_DETAILS_LIST,
    element: routeElements?.DivyangDetailsList,
    key: CODES?.DIVYANG_DETAILS,
  },
  {
    path: ROUTE_PATHS?.DIVYANG_DETAILS_FORM,
    element: routeElements?.DivyangDetailsForm,
    key: CODES?.DIVYANG_DETAILS,
    children: [
      {
        path: ROUTE_PATHS?.DIVYANG_DETAILS_FORM_PERSONAL,
        element: routeElements?.PersonalDetails,
      },
      {
        path: ROUTE_PATHS?.DIVYANG_DETAILS_FORM_IDPROOF,
        element: routeElements?.IdProffUploads,
      },
      {
        path: ROUTE_PATHS?.DIVYANG_DETAILS_FORM_ADDRESS,
        element: routeElements?.Address,
      },
      {
        path: ROUTE_PATHS?.DIVYANG_DETAILS_FORM_DISABILITY,
        element: routeElements?.DisabilityDetails,
      },
      {
        path: ROUTE_PATHS?.DIVYANG_DETAILS_FORM_EMPLOYMENT,
        element: routeElements?.EmploymentDetails,
      },
    ],
  },

  //service master
  {
    path: ROUTE_PATHS?.SERVICE_MASTER_LIST,
    element: routeElements?.ServiceMasterList,
    key: CODES?.SERVICE_MASTER,
  },
  {
    path: ROUTE_PATHS?.SERVICE_MASTER_FORM,
    element: routeElements?.ServiceMasterForm,
    key: CODES?.SERVICE_MASTER,
  },

  //service mapping
  {
    path: ROUTE_PATHS?.SERVICE_MAPPING_LIST,
    element: routeElements?.ServiceMappingList,
    key: CODES?.SERVICE_MAPPING,
  },
  {
    path: ROUTE_PATHS?.SERVICE_MAPPING_FORM,
    element: routeElements?.ServiceMappingForm,
    key: CODES?.SERVICE_MAPPING,
  },
];

const DIVYANG_ROUTES = [
  {
    path: ROUTE_PATHS?.DIVYANG_PROFILE,
    element: routeElements?.DivyangDetailsList,
    key: CODES?.DIVYANG_DETAILS,
  },
  {
    path: ROUTE_PATHS?.DIVYANG_SERVICE_LIST,
    element: "",
    key: CODES?.DIVYANG_DETAILS,
  },
  {
    path: ROUTE_PATHS?.DIVYANG_SERVICE_FORM,
    element: "",
    key: CODES?.DIVYANG_DETAILS,
  },
  {
    path: ROUTE_PATHS?.DIVYANG_FORM,
    element: "",
    key: CODES?.DIVYANG_DETAILS,
  },
  {
    path: ROUTE_PATHS?.DIVYANG_CHANGE_PASSWORD,
    element: "",
    key: CODES?.DIVYANG_DETAILS,
  },
];

export const getRoutes = ({ role, designations = [] }) => {
  if (role === CODES?.ADMIN) return ADMIN_ROUTES;

  if (role === CODES?.DIVYANG) return DIVYANG_ROUTES;

  if (role === CODES?.SEVA_KENDRA && designations?.length > 0)
    return designations?.reduce((acc, designation) => {
      const validRoutes = ADMIN_ROUTES?.filter(
        (route) => designation?.name === route?.key
      );
      return [...acc, ...validRoutes];
    }, []);

  return [];
};
