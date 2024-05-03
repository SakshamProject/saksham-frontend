import { Route } from "react-router-dom";

export const routeMapping = (menu = []) => {
  return menu?.map(({ path, element: Component, children = null }, key) => (
    <Route path={path} element={<Component />} key={key + path}>
      {children && routeMapping(children)}
    </Route>
  ));
};
