import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.warn("provide email");
      return;
    } else if (!password) {
      toast.warn("provide password");
      return;
    } else {
      try {
        const result = await login({ email, password });
        // if (result.error.data.code == 404)
        if (result.error.data.MESSAGE === "NO_USER") {//check for the user existence and show error if no user is fond
          toast.error(`No user found  Email:${email}`);
          // throw new Error(`No user found for Email ${email}`)
          return; //exist teh function
        }
         if (result.error.data.MESSAGE === "WRONG_PASSWORD") {
          toast.error(`Password or Email is wrong `);
          return; //exist teh function
        }else if( result.error.status == 404 ||
          (result.error.data.code == 404) ){
            toast.error(`Email or Password is wrong `);
            return;
        } 
          console.log("await result ", result);
          dispatch(setCredentials({ ...result }));
      
      } catch (error) {
        toast.error(error?.data?.message || error);
      }
    }
  };
  return (
    <div>
      <section className="login bg-gray-900 pl-[10rem] flex flex-wrap justify-center items-center w-full h-[100vh] ">
        <div className="mr-[4rem] mt-[5rem] flex flex-col items-center justify-center">
          <h1 className="text-2xl font-semibold mb-4 text-white">Sign In</h1>
          <form
            onSubmit={submitHandler}
            className="container w-[40rem] flex flex-col items-center justify-center "
          >
            <div className="my-[2rem] w-full ">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white "
              >
                Email Address
              </label>
              <input
                type="text"
                id="email"
                name="email"
                className="mt-1 p-2 border outline-pink-600 rounded w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-[5px]  w-full">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 p-2 border outline-pink-600 rounded w-full "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className=" bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem] w-auto flex items-center justify-center"
            >
              {/* {isLoading ? "Signing In..." : "Sign In"}{" "} */}
              <span>{isLoading ? <Loader /> : "Sign In"}</span>
            </button>
          </form>

          <div className="mt-4">
            <p className="text-white">
              New Customer ? {""}
              <Link
                to={redirect ? `/register/redirect=${redirect} ` : "/register"}
                className="text-pink-500 hover:underline"
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
