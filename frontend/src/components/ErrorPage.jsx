
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login after a short delay or immediately
    navigate("/login");
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen text-center">
      <h1 className="text-xl text-red-600">Redirecting to login...</h1>
    </div>
  );
};

export default ErrorPage;
