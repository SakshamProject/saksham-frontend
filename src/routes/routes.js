import { lazy } from "react";

export const Dashboard = lazy(() => import("../components/pages/Dashboard"));

//sevakendra setup

//-- sevakendra setup -master
export const SevaKendraMasterList = lazy(() =>
  import("../components/pages/sevaKendraSetup/sevaKendraMaster/List")
);
export const SevaKendraMasterForm = lazy(() =>
  import("../components/pages/sevaKendraSetup/sevaKendraMaster/Form")
);

//designations

//-- sevakendra users
export const SevaKendraUsersList = lazy(() =>
  import("../components/pages/sevaKendraUsers/List")
);
export const SevaKendraUsersForm = lazy(() =>
  import("../components/pages/sevaKendraUsers/Form")
);

//state master
export const StateMasterForm = lazy(() =>
  import("../components/pages/typeMasters/stateMaster/Form")
);
export const StateType = lazy(() =>
  import("../components/pages/typeMasters/stateMaster/StateType")
);

//general types
export const GeneralTypesList = lazy(() =>
  import("../components/pages/typeMasters/generalTypes/List")
);
export const GeneralTypesForm = lazy(() =>
  import("../components/pages/typeMasters/generalTypes/Form")
);

//service master
export const ServiceMasterList = lazy(() =>
  import("../components/pages/serviceMaster/List")
);
export const ServiceMasterForm = lazy(() =>
  import("../components/pages/serviceMaster/Form")
);
