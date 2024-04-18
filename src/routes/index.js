import { ROUTE_PATHS } from "./routePaths";
import * as routeElements from "./routes";

export const SUPER_ADMIN_ROUTES = [
  {
    path: ROUTE_PATHS?.DASHBOARD,
    element: routeElements?.Dashboard,
  },

  //seva kendra setup
  {
    path: ROUTE_PATHS?.SEVA_KENDRA_MASTER_LIST,
    element: routeElements?.SevaKendraMasterList,
  },
  {
    path: ROUTE_PATHS?.SEVA_KENDRA_MASTER_FORM,
    element: routeElements?.SevaKendraMasterForm,
  },

  //designation
  {
    path: ROUTE_PATHS?.DESIGNATIONS_LIST,
    element: routeElements?.DesignationsList,
  },
  {
    path: ROUTE_PATHS?.DESIGNATIONS_FORM,
    element: routeElements?.DesignationsForm,
  },
  //seva kendra users
  {
    path: ROUTE_PATHS?.SEVA_KENDRA_USERS_LIST,
    element: routeElements?.SevaKendraUsersList,
  },
  {
    path: ROUTE_PATHS?.SEVA_KENDRA_USERS_FORM,
    element: routeElements?.SevaKendraUsersForm,
  },

  //general types
  {
    path: ROUTE_PATHS?.GENERAL_TYPES_LIST,
    element: routeElements?.GeneralTypesList,
  },
  {
    path: ROUTE_PATHS?.GENERAL_TYPES_FORM,
    element: routeElements?.GeneralTypesForm,
  },

  //state master
  {
    path: ROUTE_PATHS?.STATE_MASTER,
    element: routeElements?.StateMasterForm,
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
  },
  {
    path: ROUTE_PATHS?.DIVYANG_DETAILS_FORM,
    element: routeElements?.DivyangDetailsForm,
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
  },
  {
    path: ROUTE_PATHS?.SERVICE_MASTER_FORM,
    element: routeElements?.ServiceMasterForm,
  },

  //service mapping
  {
    path: ROUTE_PATHS?.SERVICE_MAPPING_LIST,
    element: routeElements?.ServiceMappingList,
  },
  {
    path: ROUTE_PATHS?.SERVICE_MAPPING_FORM,
    element: routeElements?.ServiceMappingForm,
  },
];
