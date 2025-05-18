import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminMenu from "./pages/Admin/components/AdminMenu";
const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navigation />
      <main
        className="overflow-auto bg-slate-900 min-h-[100vh] max-h-full min-w-[100vw] w-[100%] "
        style={{ transitionDuration: 3000, transitionProperty: "all" }}
      >
        
        <Outlet />
      </main>
    </div>
  );
};

export default App;
