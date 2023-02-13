import React from 'react';
import { Route, Routes } from 'react-router-dom';

const Devil = React.lazy(() => import("Devil/App"));

const routes = [
  {
    path: '/*',
    element: <Devil />,
  },
];

export function RoutesPages() {
  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}