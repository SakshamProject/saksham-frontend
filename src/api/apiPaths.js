export const API_PATHS = {
  // Login
  LOGIN: "/auth/user/login",
  LOGIN_DIVYANG: "/auth/divyang/login",
  LOGIN_ADMIN: "auth/admin/login",

  // Logout
  LOGOUT: "/auth/user/logout",
  LOGOUT_DIVYANG: "/auth/divyang/logout",

  // Forget Password
  FORGET_PASSWORD: "/auth/user/forgetpassword",
  FORGET_PASSWORD_DIVYANG: "/auth/divyang/forgetpassword",

  // Update Password
  UPDATE_PASSWORD: "/auth/updatePassword",

  // Divyang signup
  SIGNUP: "/auth/divyang/signup",

  // Reset Password
  REST_PASSWORD: "/users/resetpassword",
  REST_PASSWORD_DIVYANG: "/divyangdetails/resetpassword",

  // Setup master
  SEVAKENDRA: "/sevakendras",
  SEVAKENDRA_LIST: "/api/sevakendras/list",

  // Designation
  DESIGNATION: "/designation",
  DESIGNATIONS: "/designations",
  FEATURES: "/api/designation/features",
  DESIGNATION_LIST: "/api/designation/list",

  // Seva kendra users
  SEVAKENDRA_USERS_LIST: "/api/users/list",
  SEVAKENDRA_USERS: "/api/users",

  // State master
  STATE_MASTER: "/api/typemaster/statemaster",
  TALUK: "/taluks",
  MUNICIPALITY: "/municipalities",
  CORPORATION: "/corporations",
  PANCHAYAT_UNION: "/panchayat-unions",
  TOWN_PANCHAYAT: "/town-panchayats",
  MLA_CONSTITUENCY: "/mla-constituencies",
  MP_CONSTITUENCY: "/mp-constituencies",

  // General types
  GENERAL_MASTER_SEED: "/api/typemaster/generalmaster/generalmasterseed",
  EDUCATION_QUALIFICATION:
    "/api/typemaster/generalmaster/education-qualification",
  COMMUNITY_CATEGORY: "/api/typemaster/generalmaster/communitycategory",
  DISABILITY_TYPE: "/api/typemaster/generalmaster/disabilitytype",
  SERVICE_TYPES: "/api/typemaster/generalmaster/servicetype",
  STATES: "/api/typemaster/generalmaster/states",
  DISTRICTS: "/api/typemaster/generalmaster/districts",

  // Divyang details
  DIVYANG_DETAILS: "/api/divyangDetails",
  DIVYANG_DETAILS_LIST: "/api/divyangDetails/list",

  // Service master
  SERVICES: "/api/services",
  SERVICES_LIST: "/api/services/list",

  // Service Mapping
  SERVICE_MAPPING: "/api/servicemapping",
  SERVICE_MAPPING_LIST: "/api/servicemapping/list",

  // Active
  ACTIVE: (path) => `${path}?status=ACTIVE`,
};
