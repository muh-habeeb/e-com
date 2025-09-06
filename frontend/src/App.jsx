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
      {/* {console.clear()} */}
      <main
        className=" dark:bg-gray-900 min-h-screen  text-white"
        style={{ transitionDuration: 3000, transitionProperty: "all" }}
      >
        
        
        <Outlet >
        </Outlet>
      </main>
          <AdminMenu />
    </div>
  );
};

export default App;