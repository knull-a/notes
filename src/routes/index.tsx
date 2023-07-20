import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { NotesPageAsync } from "@/pages/NotesPage/NotesPage.async";
import { TestPageAsync } from "@/pages/TestPage/TestPage.async";

export const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading</div>}>
      
      <Routes>
        <Route path="/" element={<NotesPageAsync />} />
        <Route path="test" element={<TestPageAsync />} />
      </Routes>
    </Suspense>
  )
}
