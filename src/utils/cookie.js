import Cookies from "universal-cookie";

const cookies = new Cookies();

export const getCookie = (name) => {
  return cookies.get(name);
};

export const setCookie = (name, value) => {
  cookies.set(name, value, { path: "/" });
};

export const removeCookie = (name) => {
  cookies.remove(name, { path: "/" });
};

export const removeAllCookie = () => {
  const cookieKeys = cookies.getAll();
  Object.keys(cookieKeys).map((key) => cookies.remove(key, { path: "/" }));
};
