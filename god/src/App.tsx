import React from "react";

const DevilApp = React.lazy(() => import("Devil/App"));

export default function App() {
  return (
    <React.Suspense fallback="Carregando....">
      <h1>AMA GOD</h1>
      <DevilApp />
    </React.Suspense>
  );
}
