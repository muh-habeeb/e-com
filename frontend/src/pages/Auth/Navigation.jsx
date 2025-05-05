import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
  AiOutlineLogin,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./navigation.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const toggleSideBar = () => {
    setShowSidebar(!showSidebar);
  };
  const closeSidebar = () => {
    setShowSidebar(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLoginMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };
  // console.log('userinfo',userInfo,'uname',userInfo.username)
  return (
    <div
      style={{ zIndex: 999 }}
      id="navigation-container"
      className={`${
        showSidebar ? "hidden" : "flex"
      } xl:flex lg:flex md:flex sm:hidden flex-col justify-between p-4 text-white bg-black w-[4%] hover:w-[15%] h-[100vh] fixed `}
    >
      <div className="flex flex-col my-3  items-start justify-center ">
        <Link
          to="/"
          className=" flex items-center justify-start transition-transform transform hover:translate-x-2 hover:duration-300  "
        >
          <AiOutlineHome id="home" size={26} className=" mr-2 mt-[3rem] " />
          <span className="nav-item-name hidden  mt-[3rem] uppercase transition-opacity duration-500 ">
            Home
          </span>
        </Link>
        <Link
          to="/shop"
          className="flex items-center justify-start transition-transform transform hover:translate-x-2 hover:duration-300"
        >
          <AiOutlineShopping size={26} className=" mr-2 mt-[3rem]" />
          <span className="nav-item-name hidden  mt-[3rem] uppercase transition-opacity duration-500 ">
            shop
          </span>
        </Link>
        <Link
          to="/cart"
          className="flex items-center justify-start transition-transform transform hover:translate-x-2 hover:duration-300"
        >
          <AiOutlineShoppingCart size={26} className=" mr-2 mt-[3rem]" />
          <span className="nav-item-name hidden  mt-[3rem] uppercase transition-opacity duration-500 ">
            cart
          </span>
        </Link>
        <Link
          to="/favorite"
          className="flex items-center justify-start transition-transform transform hover:translate-x-2 hover:duration-300"
        >
          <FaHeart size={24} className=" mr-2 mt-[3rem]" />
          <span className="nav-item-name hidden  mt-[3rem] uppercase transition-opacity duration-500 ">
            favorite
          </span>
        </Link>
      </div>
      <div className="relative flex items-center text-gray-800 focus:outline-none ">
        <button onClick={toggleDropdown}>
          {userInfo ?  (
            <span className="text-white ">{userInfo.username}</span>
          ) : (
            <></>
          )}
        </button>
      </div>
      <ul
        className="flex flex-col items-start justify-start"
      >
        <li>
          <Link
            to="/login"
            className="flex items-center justify-start transition-transform transform hover:translate-x-2 hover:duration-300"
          >
            <AiOutlineLogin size={24} className=" mr-2 mt-[3rem]" />
            <span className="nav-item-name hidden  mt-[3rem] uppercase transition-opacity duration-500 ">
              Login
            </span>
          </Link>
        </li>
        <li>
          <Link
            to="/register"
            className="flex items-center justify-start transition-transform transform hover:translate-x-2 hover:duration-300"
          >
            <AiOutlineUserAdd size={24} className=" mr-2 mt-[3rem]" />
            <span className="nav-item-name hidden  mt-[3rem] uppercase transition-opacity duration-500 ">
              register
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
