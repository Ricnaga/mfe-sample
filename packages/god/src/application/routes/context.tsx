import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RoutesPages } from '.';

type RouterContextProps = Partial<Record<'children', ReactNode | JSX.Element>>;

export function RouterContext({ children }: RouterContextProps) {
  return (
    <BrowserRouter>
      {children}
      <RoutesPages />
    </BrowserRouter>
  );
}
