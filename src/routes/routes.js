import { lazy } from "react";

// Dashboard
export const Dashboard = lazy(() =>
  import("../components/pages/dashboard/Dashboard")
);

// Seva Kendra Master
export const SevaKendraMasterList = lazy(() =>
  import("../components/pages/sevaKendraSetup/sevaKendraMaster/List")
);
export const SevaKendraMasterForm = lazy(() =>
  import("../components/pages/sevaKendraSetup/sevaKendraMaster/Form")
);

// Designations
export const DesignationsList = lazy(() =>
  import("../components/pages/sevaKendraSetup/designation/List")
);
export const DesignationsForm = lazy(() =>
  import("../components/pages/sevaKendraSetup/designation/Form")
);

// Seva Kendra Users
export const SevaKendraUsersList = lazy(() =>
  import("../components/pages/sevaKendraUsers/List")
);
export const SevaKendraUsersForm = lazy(() =>
  import("../components/pages/sevaKendraUsers/Form")
);

// Divyang Details
export const DivyangDetailsList = lazy(() =>
  import("../components/pages/divyangDetails/List")
);
export const DivyangDetailsForm = lazy(() =>
  import("../components/pages/divyangDetails/Form")
);
export const PersonalDetails = lazy(() =>
  import("../components/pages/divyangDetails/PersonalDetails")
);
export const IdProffUploads = lazy(() =>
  import("../components/pages/divyangDetails/IdProffUploads")
);
export const Address = lazy(() =>
  import("../components/pages/divyangDetails/Address")
);
export const DisabilityDetails = lazy(() =>
  import("../components/pages/divyangDetails/DisabilityDetails")
);
export const EmploymentDetails = lazy(() =>
  import("../components/pages/divyangDetails/EmploymentDetails")
);

// State Master
export const StateMasterForm = lazy(() =>
  import("../components/pages/typeMasters/stateMaster/Form")
);
export const StateType = lazy(() =>
  import("../components/pages/typeMasters/stateMaster/StateType")
);

// General Types
export const GeneralTypesList = lazy(() =>
  import("../components/pages/typeMasters/generalTypes/List")
);
export const GeneralTypesForm = lazy(() =>
  import("../components/pages/typeMasters/generalTypes/Form")
);

// Service Master
export const ServiceMasterList = lazy(() =>
  import("../components/pages/serviceMaster/List")
);
export const ServiceMasterForm = lazy(() =>
  import("../components/pages/serviceMaster/Form")
);

// Service Mapping
export const ServiceMappingList = lazy(() =>
  import("../components/pages/serviceMapping/List")
);
export const ServiceMappingForm = lazy(() =>
  import("../components/pages/serviceMapping/Form")
);
