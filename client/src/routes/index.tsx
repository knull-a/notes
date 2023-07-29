import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { NotesPageAsync } from "@/pages/NotesPage/NotesPage.async";
import { TestPageAsync } from "@/pages/TestPage/TestPage.async";

import { CustomLoader } from "@/components/Custom/CustomLoader";

export const AppRoutes = () => {
  return (
    <Suspense fallback={<div><CustomLoader /></div>}>
      
      <Routes>
        <Route path="/" element={<NotesPageAsync />} />
        <Route path="test" element={<TestPageAsync />} />
      </Routes>
    </Suspense>
  )
}
