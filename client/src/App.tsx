import "./index.css";

import { Navbar } from "@/components/Navbar/Navbar";
import { AppRoutes } from "@/routes";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "./stores/auth";

function App() {
  const { pathname } = useLocation();

  const authStore = useAuthStore()
  useEffect(() => {
    if (localStorage.getItem("token")) {
      authStore.checkAuth()
    }
  }, [])
  return (
    <div>
      {pathname !== "/auth" && (
        <>
          <Navbar />
          <Sidebar />
        </>
      )}
      <div className="mt-28 mx-auto px-72 font-sans">
        <AppRoutes />
      </div>
    </div>
  );
}

export default App;
