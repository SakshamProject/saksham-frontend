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
  import("../components/pages/sevaKendraSetup/designations/List")
);
export const DesignationsForm = lazy(() =>
  import("../components/pages/sevaKendraSetup/designations/Form")
);

// Seva Kendra Users

export const SevaKendraUsersList = lazy(() =>
  import("../components/pages/sevaKendraUsers/List")
);
export const SevaKendraUsersForm = lazy(() =>
  import("../components/pages/sevaKendraUsers/Form")
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
