// Login Component
// Handles user authentication
// Features:
// - Form validation
// - Redux integration for state management
// - Redirect after successful login
// - Toast notifications for feedback

import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
const Login = () => {
  //state to mange the input in modern way
  let [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleFormData = (e) => {
    setFormData((old) => ({ ...old, [e.target.id]: e.target.value }));
  };
  //destructuring for pacing the values to sever
  let { email, password } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("/redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      //user info can be  c.log
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  //submit handler function

  const submitHandler = async (e) => {
    e.preventDefault();
    //  show error if email or password is not provided
    if (!email) {
      toast.warn("Provide email");
      return;
    }
    if (!password) {
      toast.warn("Provide password");
      return;
    }
    try {
      const result = await login({ email, password });
      //check for errors
      if (result.error) {
        const { status, data } = result.error; //destructure the result

        if (data?.MESSAGE === "NO_USER") {
          toast.error(`No user found for Email: ${email}`);
          return;
        }

        if (data?.MESSAGE === "WRONG_PASSWORD") {
          toast.error("Password is wrong");
          return;
        }

        if (status === 500) {
          toast.error("Server error");
          return;
        }

        if (status === 404 || data?.code === 404) {
          toast.error("Email or Password is wrong");
          return;
        }
      } else {
        // SUCCESS 🎉
        // ✅ Redirect user after login
        dispatch(setCredentials(result.data));
        toast.success(`Welcome ${result?.data?.username}`);
      }
    } catch (error) {
      toast.error(error?.data?.message || "Unexpected error");
    }
  };

  return (
    <div>
      <section className="login bg-stoke2 bg-cover bg-center pl-[10rem] flex flex-wrap justify-center items-center w-full h-[100vh]  ">
        <div className=" mr-[4rem] mt-[5rem] p-4 flex flex-col items-center justify-center  backdrop-blur-[10px] rounded-2xl">
          <h1 className="text-2xl font-semibold mb-4 text-slate-100">
            Sign In
          </h1>
          <form
            onSubmit={submitHandler}
            className="container w-[40rem] flex flex-col items-center justify-center  gap-2"
          >
            <div className="w-full  h-[40px] mb-5 ">
              <label
                htmlFor="email"
                className="block text-md font-medium text-white"
              >
                Email Address
              </label>
              <input
                type="text"
                id="email"
                name="email"
                className="mt-1 text-white bg-transparent text-slate-800p-2 border outline-pink-600 rounded w-full h-full"
                value={formData.email}
                onChange={handleFormData}
              />
            </div>

            <div className="w-full h-[40px] mb-5 ">
              <label
                htmlFor="password"
                className="block text-md font-medium text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 text-white bg-transparent text-slate-800p-2 border outline-pink-600 rounded w-full h-full"
                value={formData.password}
                onChange={handleFormData}
              />
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className=" bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem] w-auto flex items-center justify-center hover:bg-pink-600"
            >
              <span>{isLoading ? <Loader /> : "Sign Up"}</span>
            </button>
          </form>

          <div className="mt-4">
            <p className="text-white">
              {"New Customer ? "}
              <Link
                to={redirect ? `/register?${redirect}` : "/register"}
                className="text-pink-800 hover:bg-pink-900 hover:duration-300 duration-500 rounded-lg hover:px-2 py-[2px]  text-center leading-3 no-underline hover:text-white"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
