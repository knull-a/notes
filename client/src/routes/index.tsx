import React, { Suspense } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";

import { CustomLoader } from "@/components/Custom/CustomLoader";

export const AppRoutes = () => {
  const location = useLocation();

  const { state: locationState } = location;

  const previousLocation =
    locationState?.previousLocation || window.location.pathname;

    const NotePage = React.lazy(() => import("@/pages/NotePage"))
    const ArchivePage = React.lazy(() => import("@/pages/ArchivePage"))
    const NotesPage = React.lazy(() => import("@/pages/NotesPage"))

  return (
    <Suspense
      fallback={
        <div>
          <CustomLoader />
        </div>
      }
    >
      <Routes location={previousLocation || location}>
        <Route path="/" element={<Navigate to={"/notes"} replace />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/archive" element={<ArchivePage />} />
      </Routes>
      {previousLocation && (
        <Routes>
          <Route path={`/notes/:id`} element={<NotePage pathName="notes" />} />
          <Route path={`/archive/:id`} element={<NotePage pathName="archive" />} />
        </Routes>
      )}
    </Suspense>
  );
};
