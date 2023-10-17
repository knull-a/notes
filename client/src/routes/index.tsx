import { Suspense } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";

import { CustomLoader } from "@/components/Custom/CustomLoader";
import ArchivePage from "@/pages/ArchivePage";
import NotesPage from "@/pages/NotesPage";
import NotePage from "@/pages/NotePage";
import useModalStore from "@/stores/modal";

export const AppRoutes = () => {
  const location = useLocation();

  const { state: locationState } = location;
  const { isOpened } = useModalStore();

  const previousLocation =
    locationState?.previousLocation || window.location.pathname;

  return (
    <Suspense
      fallback={
        <div>
          <CustomLoader />
        </div>
      }
    >
      <Routes location={isOpened ? previousLocation || location : undefined}>
        <Route path="/" element={<Navigate to={"/notes"} replace />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/archive" element={<ArchivePage />} />
      </Routes>
      {previousLocation && (
        <Routes>
          <Route path={`/notes/:id`} element={<NotePage pathName="notes" />} />
          <Route
            path={`/archive/:id`}
            element={<NotePage pathName="archive" />}
          />
        </Routes>
      )}
    </Suspense>
  );
};
