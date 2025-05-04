// import { useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { useLoginMutation } from "../../redux/api/usersApiSlice";
// import { setCredentials } from "../../redux/features/auth/authSlice";
// import { toast } from "react-toastify";
// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [login, { isLoading }] = useLoginMutation();
//   const { userInfo } = useSelector((state) => state.auth);
//   const [search] = useLocation();
//   const sp = new URLSearchParams(search);
//   const redirect = sp.get("redirect") || "/";

//   useEffect(() => {
//     if (userInfo) {
//       navigate(redirect);
//     }
//   }, [navigate, redirect, userInfo]);
//   return (
//     <div>
//       <section className="pl-[10rem] flex flex-wrap ">
//         <div className="mr-[4rem] mt-[5rem] ">
//           <h1 className="text-2xl font-semibold mb-4">Sign In</h1>
//         </div>
//       </section>
//       Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam inventore aperiam illo corporis consequatur omnis laboriosam. Minima unde deleniti nihil in ad totam voluptates voluptatem distinctio voluptas ipsum! Molestiae excepturi repudiandae vero ipsa amet libero maiores totam iure fugiat iste.
//     </div>
//   );
// };

// export default Login;


import React from 'react'

export default function Login() {
  return (
    <div className='ml-[100px] text-red-600'>Login</div>
  )
}
