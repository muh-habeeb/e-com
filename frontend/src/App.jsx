import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <div className="bg-slate-800">
      <ToastContainer />
      <Navigation />
      <main className="bg-slate-700 h-[100vh]" style={{transitionDuration:3000,transitionProperty:"all"}}>
      
      <Outlet />
      
      </main>
    </div>
  );
};

export default App;
