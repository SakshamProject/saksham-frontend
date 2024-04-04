import { Route } from "react-router-dom";

export const routeMapping = (menu = []) =>
  menu.map(({ path, element: Component, children = null }, key) => (
    <Route path={path} element={<Component />} key={key}>
      {children && routeMapping(children)}
    </Route>
  ));
