import { useEffect, useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";

const Register = () => {
  //   const [username, setUsername] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [email, setEmail] = useState("");
  //   const [confirmPassword, setConfirmPassword] = useState("");

  let [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
  });

  let { username, email, password,confirmPassword } = formData;
  let handleFormData = (e) => {
    setFormData((old) => ({ ...old, [e.target.id]: e.target.value }));
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("/redirect") || "/";
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    //  show error if email or password username is not provided
    if (!username) {
      toast.warn("Provide username");
      return;
    }
    if (!email) {
      toast.warn("Provide email");
      return;
    }
    if (!password) {
      toast.warn("Provide password");
      return;
    }
    if (confirmPassword !== password) {
      toast.error("Password do not match!");
    }

    try {
      const result = await register({ username, email, password });
      //check for errors
      if (result.error) {
        //destructure the result
        const { status, data } = result.error;

        if (data?.MESSAGE === "USER_EXIST_WITH_THE_EMAIL") {
          toast.error(`User exist with Email: ${email}`);
          return;
        }
        if (data?.MESSAGE === "INVALID_DATA") {
          toast.error(`Invalid data !`);
          return;
        }
        if (status === 500) {
          toast.error("Server error");
          return;
        }
      } else {
        // no errors dispatch to root
        // SUCCESS 🎉
        // ✅ Redirect user after register
        dispatch(setCredentials(result.data));
        toast.success(`User registered successfully! `);
      }
    } catch (error) {
      toast.error(error?.data?.message || "Unexpected error");
    }
  };

  return (
    <div>
      <section className="register   bg-gradientTexture  bg-cover  bg-no-repeat bg-center  pl-[10rem] flex flex-wrap justify-center items-center w-full h-[100vh] ">
        <div className="mr-[4rem] mt-[5rem] flex flex-col items-center justify-center backdrop-blur-3xl p-[50px]">
          <h1 className="text-2xl font-semibold mb-4 text-white">Sign Up</h1>
          <form
            onSubmit={submitHandler}
            className="container w-[40rem] flex flex-col items-center justify-center  gap-2 sm:gap-3 md:gap-3 xl:gap-4"
          >
            <div className=" w-full ">
              <label
                htmlFor="username"
                className="block capitalize text-sm font-medium text-white "
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="mt-1 p-2 border bg-transparent text-white  outline-pink-600 rounded w-full"
                value={formData.username}
                onChange={handleFormData}
              />
            </div>
            <div className=" w-full ">
              <label
                htmlFor="email"
                className="block capitalize text-sm font-medium text-white "
              >
                Email Address
              </label>
              <input
                type="text"
                id="email"
                name="email"
                className="mt-1 p-2 border bg-transparent text-white  outline-pink-600 rounded w-full"
                value={formData.email}
                onChange={handleFormData}
              />
            </div>

            <div className=" w-full">
              <label
                htmlFor="password"
                className="block capitalize text-sm font-medium text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 p-2 border bg-transparent text-white  outline-pink-600 rounded w-full "
                value={formData.password}
                onChange={handleFormData}
              />
            </div>
            <div className=" w-full">
              <label
                htmlFor="confirmPassword"
                className="block capitalize text-sm font-medium text-white"
              >
                confirm Password
              </label>
              <input
                type="text"
                id="confirmPassword"
                name="confirmPassword"
                className="mt-1 p-2 border bg-transparent text-white  outline-pink-600 rounded w-full "
                value={formData.confirmPassword}
                onChange={handleFormData}
              />
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className=" bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem] w-auto flex items-center justify-center"
            >
              <span>{isLoading ? <Loader /> : "Sign In"}</span>
            </button>
          </form>

          <div className="mt-4">
            <p className="text-white">
              {" Already a customer? "}
              <Link
                to={redirect ? `/login?redirect=${redirect}` : "/login"}
                className="text-pink-500 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
