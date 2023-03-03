import React, { ReactNode } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Devil } from './remotes';

type RouteData = Array<{
  path: string;
  element: ReactNode | JSX.Element;
}>;

const routes: RouteData = [
  {
    path: '/devil',
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
