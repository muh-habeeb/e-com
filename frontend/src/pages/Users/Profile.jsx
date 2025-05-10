import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
//user profile page
const Profile = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password do not match");
    } else {
      try {
        const result = await updateProfile({
          _id: userInfo.id,
          username,
          email,
          password,
        }).unwrap(); //pass the data to update

        dispatch(setCredentials({ ...result }));
        toast.success("Profile updated successfully");
      } catch (error) {
        toast.error(error?.data?.MESSAGE || "error happened", error);
      }
    }
  };
  return (
    <div className=" container text-white">
      <div className=" relative flex justify-center items-center h-[100vh] md:flex-col md:space-x-4">
        <div className="md:w-1/3">
          <h2 className="text-2xl font-semibold mb-4 capitalize">
            Update Profile
          </h2>

          <form className="" onSubmit={submitHandler} autoComplete="true">
            <div className="mb-4">
              <label htmlFor="username">UserName</label>
              <input
                type="text"
                value={username}
                id="username"
                name="username"
                autoComplete="true"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter Username"
                className=" form-input text-pink-400 outline-pink-600 border-none p-4 rounded-sm w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                autoComplete="true"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className=" form-input text-pink-400 outline-pink-600 border-none p-4 rounded-sm w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                value={password}
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className=" form-input text-pink-400 outline-pink-600 border-none p-4 rounded-sm w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="text"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Enter password again to confirm"
                className=" form-input text-pink-400 outline-pink-600 border-none p-4 rounded-sm w-full"
              />
            </div>
            <div className="flex justify-between text-white ">
              <button
                disabled={loadingUpdateProfile}
                type="submit"
                className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600"
              >
                Update
              </button>
              <Link
                to="/user-orders"
                className="capitalize bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700 1"
              >
                My orders{" "}
              </Link>
            </div>
          </form>
        </div>
        {loadingUpdateProfile && <Loader />}
      </div>
    </div>
  );
};

export default Profile;
