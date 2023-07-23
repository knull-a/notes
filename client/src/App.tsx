import "./index.css";

import Navbar from "@/components/Navbar/Navbar";
import { AppRoutes } from "@/routes";
import { Sidebar } from "./components/Sidebar/Sidebar";

function App() {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <AppRoutes />
    </div>
  );
}

export default App;
