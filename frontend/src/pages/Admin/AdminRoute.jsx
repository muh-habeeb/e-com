import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export const AdminRoute = () => {
  const userInfo = useSelector((state) => state.auth);
  if(userInfo){

    const {isAdmin}=userInfo.userInfo;  //descturcture
      
    return userInfo.userInfo && isAdmin ? (
      <Outlet />
    ) : (
      <Navigate to="/login" replace />
    );
  }else{
    console.log('nop');
    
    toast.error("you are not authorized to access! ")
  }

  // the erro thing not working as expected
};
