import { useNavigate } from "react-router-dom";
const ErrorPage = () => {
  const navigate = useNavigate();

  const GoHome = () => {
    // Redirect to login after a short delay or immediately
    navigate("/login");
  };
  return (
    <div className="flex items-center justify-center h-screen w-screen text-center flex-col gap-5">
      <p className="text-[150px] text-white tracking-[1px] animate-bounce animat">
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
  );
};

export default ErrorPage;
