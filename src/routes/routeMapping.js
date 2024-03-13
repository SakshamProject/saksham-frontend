import { Route } from "react-router-dom";

export const routeMapping = (path, Component, children, index) => {
  return (
    <Route path={path} element={<Component />} key={index}>
      {children &&
        children?.map(({ path, element, children = null }, index) =>
          routeMapping(path, element, children, index)
        )}
    </Route>
  );
};
