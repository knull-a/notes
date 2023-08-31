import { Suspense } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";

import { NotesPageAsync } from "@/pages/NotesPage/NotesPage.async";
import { TestPageAsync } from "@/pages/TestPage/TestPage.async";

import { CustomLoader } from "@/components/Custom/CustomLoader";
import { NotePageAsync } from "@/pages/NotePage/NotePage.async";

export const AppRoutes = () => {
  const location = useLocation();

  const { state: locationState } = location;

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
      <Routes location={previousLocation || location}>
        <Route path="/" element={<Navigate to={"/notes"} replace />} />
        <Route path="/notes" element={<NotesPageAsync />}></Route>
        <Route path="test" element={<TestPageAsync />} />
      </Routes>
      {previousLocation && (
        <Routes>
          <Route path="/notes/:id" element={<NotePageAsync />} />
        </Routes>
      )}
    </Suspense>
  );
};
