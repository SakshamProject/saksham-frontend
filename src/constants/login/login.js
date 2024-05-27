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

    const designations = data?.user?.designation?.features?.map((item) => {
      const { feature = {} } = item;
      if (feature?.name === CODES?.SERVICE_MAPPING) {
        serviceMapping = true;
      }
      return feature;
    });

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
