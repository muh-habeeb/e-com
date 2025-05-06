import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Perform any logout logic here if needed
    navigate("/login");
  }, [navigate]);

  return null; // Or a loading spinner if you want
}

export default Logout;
