// ErrorPage Component
// Displays a 404 error page with navigation
// Imports:
// - useNavigate: For programmatic navigation
// - Navigation: Main navigation component

import { useNavigate } from "react-router-dom";
import Navigation from "../pages/Auth/Navigation";
const ErrorPage = () => {
  const navigate = useNavigate();

  const GoHome = () => {
    // Redirect to login after a short delay or immediately
    navigate("/login");
  };
  return (
    <div className="">
      <Navigation/>
      <div className=" bg-slate-800 flex items-center justify-center h-screen w-screen text-center flex-col gap-5">
        <p className="text-[150px] text-white tracking-[1px] animate-bounce ">
          {/* 4️⃣👁️4️⃣ */}Ⅳ ⨷ Ⅳ
        </p>
        <p className="text-[30px] text-white capitalize tracking-[3px]">
          the requested <span className="uppercase">url</span> dose not exist.
        </p>
        <button
          onClick={GoHome}
          className=" uppercase px-2 py-4 rounded-lg cursor-pointer hover:font-semibold bg-pink-600 hover:bg-rose-500 text-white text-2xl"
        >
          {"go home"}
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
