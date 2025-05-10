import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navigation />
      <main className="bg-slate-900 h-[100vh] w-screen" style={{transitionDuration:3000,transitionProperty:"all"}}>
      
      <Outlet />
      
      </main>
    </div>
  );
};

export default App;
