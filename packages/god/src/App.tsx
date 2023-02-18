import 'index.css';
import React, { Suspense } from 'react';

const DevilApp = React.lazy(() => import('Devil/App'));

export default function App() {
  return (
    <>
      <h1>AMA GOD</h1>
      <Suspense fallback="CARREGANDO....">
        <DevilApp />
      </Suspense>
    </>
  );
}
