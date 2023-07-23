import "./index.css";

import Navbar from "@/components/Navbar/Navbar";
import { AppRoutes } from "@/routes";
import { Sidebar } from "./components/Sidebar/Sidebar";

function App() {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="mt-28 mx-auto max-w-7xl">
        <AppRoutes />
      </div>
    </div>
  );
}

export default App;
