import { Route } from "react-router-dom";

export const routeMapping = (routes = []) =>
  routes?.map((route, key) => {
    const Component = route?.element;
    return (
      <Route path={route?.path} element={<Component />} key={route?.key + key}>
        {route?.children && routeMapping(route?.children)}
      </Route>
    );
  });
