import React, { Suspense } from 'react';

const DevilRemote = React.lazy(() => import('Devil/App'));

export function Devil() {
  return (
    <Suspense fallback="CARREGANDO....">
      <DevilRemote />
    </Suspense>
  );
}
