// Main application component that sets up the basic layout

// Router components for navigation
import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";

// Toast notifications
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Admin components
import AdminMenu from "./pages/Admin/components/AdminMenu";

// This component is the root layout component that includes:
// - Toast notifications
// - Navigation bar
// - Main content area with outlet for child routes
const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navigation />
      <main
        className=" text-white overflow-auto bg-slate-900 min-h-[100vh] max-h-full min-w-[100vw] w-[100%] "
        style={{ transitionDuration: 3000, transitionProperty: "all" }}
      >
        
        <Outlet />
      </main>
    </div>
  );
};

export default App;