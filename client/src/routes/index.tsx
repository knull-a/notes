import { ReactNode, Suspense, useEffect } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";

import { CustomLoader } from "@/components/Custom/CustomLoader";
import ArchivePage from "@/pages/ArchivePage";
import NotesPage from "@/pages/NotesPage";
import NotePage from "@/pages/NotePage";
import useModalStore from "@/stores/modal";
import { AuthPage } from "@/pages/AuthPage";
import { useAuthStore } from "@/stores/auth";

export const AppRoutes = () => {
  const location = useLocation();

  const { state: locationState } = location;
  const { isOpened } = useModalStore();
  const authStore = useAuthStore();

  const previousLocation =
    locationState?.previousLocation || window.location.pathname;

  const PrivateRoute = ({
    children,
    condition = !!localStorage.getItem("token"),
    navigate = "/auth"
  }: {
    children: ReactNode;
    condition?: boolean;
    navigate?: string
  }) => {
    if (condition) {
      return children;
    }

    return <Navigate to={navigate} />;
  };

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
        <Route
          path="/notes"
          element={
            <PrivateRoute>
              <NotesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/archive"
          element={
            <PrivateRoute>
              <ArchivePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/auth"
          element={
            <PrivateRoute condition={!localStorage.getItem("token")} navigate="/">
              <AuthPage />
            </PrivateRoute>
          }
        />
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
