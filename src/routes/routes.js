import { lazy } from "react";

export const Dashboard = lazy(() =>
  import("../components/pages/dashboard/Dashboard")
);
export const SevaKendraMasterList = lazy(() =>
  import("../components/pages/sevaKendraSetup/sevaKendraMaster/List")
);
export const SevaKendraMasterForm = lazy(() =>
  import("../components/pages/sevaKendraSetup/sevaKendraMaster/Form")
);
export const DesignationsList = lazy(() =>
  import("../components/pages/sevaKendraSetup/designation/List")
);
export const DesignationsForm = lazy(() =>
  import("../components/pages/sevaKendraSetup/designation/Form")
);
export const SevaKendraUsersList = lazy(() =>
  import("../components/pages/sevaKendraUsers/List")
);
export const SevaKendraUsersForm = lazy(() =>
  import("../components/pages/sevaKendraUsers/Form")
);
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
export const StateMasterForm = lazy(() =>
  import("../components/pages/typeMasters/stateMaster/Form")
);
export const StateType = lazy(() =>
  import("../components/pages/typeMasters/stateMaster/StateType")
);
export const GeneralTypesList = lazy(() =>
  import("../components/pages/typeMasters/generalTypes/List")
);
export const GeneralTypesForm = lazy(() =>
  import("../components/pages/typeMasters/generalTypes/Form")
);
export const ServiceMasterList = lazy(() =>
  import("../components/pages/serviceMaster/List")
);
export const ServiceMasterForm = lazy(() =>
  import("../components/pages/serviceMaster/Form")
);
export const ServiceMappingList = lazy(() =>
  import("../components/pages/serviceMapping/List")
);
export const ServiceMappingForm = lazy(() =>
  import("../components/pages/serviceMapping/Form")
);
export const DivyangProfile = lazy(() =>
  import("../components/pages/divyang/Profile")
);
export const DivyangServicesList = lazy(() =>
  import("../components/pages/divyang/myServices/List")
);
export const DivyangServicesForm = lazy(() =>
  import("../components/pages/divyang/myServices/Form")
);
export const ChangePassword = lazy(() =>
  import("../components/pages/login/ChangePassword")
);
export const UserProfile = lazy(() =>
  import("../components/pages/user/Profile")
);
