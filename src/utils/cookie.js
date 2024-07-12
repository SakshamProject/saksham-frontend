import Cookies from "universal-cookie";

const cookies = new Cookies();

export const getCookie = (name) => {
  return cookies.get(name);
};

export const setCookie = (name, value) => {
  const expireDate = new Date();
  expireDate.setDate(expireDate.getDate() + 7);

  cookies.set(name, value, {
    path: "/",
    expires: expireDate,
  });
};

export const removeCookie = (name) => {
  cookies.remove(name, { path: "/" });
};

export const removeAllCookie = () => {
  const cookieKeys = cookies.getAll();
  Object.keys(cookieKeys)?.forEach((key) => cookies.remove(key, { path: "/" }));
};
