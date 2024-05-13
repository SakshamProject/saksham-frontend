import Cookies from "universal-cookie";

const cookies = new Cookies();

export const getCookie = (name) => {
  return cookies.get(name);
};

export const setCookie = (name, value) => {
  const currentDate = new Date();
  const expirationDate = new Date(
    currentDate.getTime() + 7 * 24 * 60 * 60 * 1000
  );

  cookies.set(name, value, {
    path: "/",
    expires: expirationDate,
  });
};

export const removeCookie = (name) => {
  cookies.remove(name, { path: "/" });
};

export const removeAllCookie = () => {
  const cookieKeys = cookies.getAll();
  Object.keys(cookieKeys)?.forEach((key) => cookies.remove(key, { path: "/" }));
};
