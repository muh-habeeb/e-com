import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <>
      <ToastContainer />
      <Navigation />
      <main className="bg-slate-400 " style={{transitionDuration:3000,transitionProperty:"all"}}>
      <Outlet />
      </main>
    </>
  );
};

export default App;
