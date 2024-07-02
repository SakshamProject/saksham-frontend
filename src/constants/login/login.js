import { ADMIN_ROUTES } from "../../routes";
import { CODES } from "../globalConstants";

export const initialValues = {
  userName: "",
  password: "",
  rememberMe: false,
};

export const fields = {
  userName: {
    label: "User Name",
    name: "userName",
  },
  password: {
    label: "Password",
    name: "password",
  },
  rememberMe: {
    label: "Remember me",
    name: "rememberMe",
  },
};

export const getUserInfo = (data) => {
  if (data?.user) {
    let serviceMapping = false;

    const designations = (data?.user?.designation?.features || [])
      ?.sort(
        (a, b) =>
          ADMIN_ROUTES.findIndex(
            (item) => item.key === (a?.feature?.name || "")
          ) -
          ADMIN_ROUTES.findIndex(
            (item) => item.key === (b?.feature?.name || "")
          )
      )
      ?.map((item) => {
        // if (item?.feature?.name === CODES?.SERVICE_MAPPING)
        //   serviceMapping = true;
        return item?.feature;
      });

    serviceMapping = designations?.some(
      (designation) => designation?.name === CODES.SERVICE_MAPPING
    );

    if (!serviceMapping) {
      designations?.push({ id: "12345", name: CODES.SERVICE_MAPPING });
    }

    return {
      serviceMapping,
      userId: data?.user?.id,
      role: CODES?.SEVA_KENDRA,
      name: data?.user?.person?.userName,
      profileUrl: data?.file?.profilePhoto?.url,
      designation: {
        id: data?.user?.designation?.id,
        name: data?.user?.designation?.name,
        designations,
      },
      person: {
        id: data?.user?.person?.id,
        name: data?.user?.person?.userName,
      },
    };
  }

  if (data?.divyang) {
    return {
      userId: data?.divyang?.id,
      role: CODES?.DIVYANG,
      name: `${data?.divyang?.firstName} ${data?.divyang?.lastName}`,
      profileUrl: data?.file?.profilePhoto?.url,
      designation: {
        name: CODES?.DIVYANG,
      },
      person: {
        ...data?.divyang?.person,
      },
    };
  }

  return {
    role: CODES?.ADMIN,
    name: data?.superAdmin,
    designation: {
      name: CODES?.ADMIN,
    },
  };
};
