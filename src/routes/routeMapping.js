import { Route } from "react-router-dom";

export const routeMapping = (menu = []) =>
  menu.map(({ path, element, children = null }, key) => (
    <Route path={path} element={element} key={key}>
      {children && routeMapping(children)}
    </Route>
  ));
