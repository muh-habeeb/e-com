/* eslint-disable no-unused-vars */
// Navigation Component
// Main navigation bar with responsive design
// Features:
// - User dropdown menu
// - Responsive sidebar
// - Authentication status handling
// - Favorite products count

import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
  AiOutlineLogin,
  AiOutlineUser,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./navigation.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoriteCount from "../products/FavoriteCount";
const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const {cartItems} = useSelector((state) => state.cart);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  //for responsive
  const toggleSideBar = () => {
    setShowSidebar(!showSidebar);
  };
  const closeSidebar = () => {
    setShowSidebar(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("logout error ", error);
    }
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div
      style={{ zIndex: 999 }}
      id="navigation-container"
      className={`${
        showSidebar ? "hidden" : "flex"
      } xl:flex lg:flex md:flex sm:flex hidden xs:hidden flex-col justify-between p-4 text-white bg-black w-[4%] hover:w-[15%] h-[100vh] fixed `}
    >
      <div className="flex flex-col my-3  items-start justify-center  ">
        <Link
          to="/"
          className=" flex items-center justify-start transition-transform transform hover:translate-x-2 hover:duration-300  "
        >
          <AiOutlineHome
            title="Home"
            id="home"
            size={26}
            className=" mr-2 mt-[3rem] "
          />
          <span className="nav-item-name hidden  mt-[3rem] uppercase transition-opacity duration-500 ">
            Home
          </span>
        </Link>
        <Link
          to="/shop"
          className="flex items-center justify-start transition-transform transform hover:translate-x-2 hover:duration-300"
        >
          <AiOutlineShopping
            title="Shope"
            size={26}
            className=" mr-2 mt-[3rem]"
          />
          <span className="nav-item-name hidden  mt-[3rem] uppercase transition-opacity duration-500 ">
            shop
          </span>
        </Link>
        <Link
          to="/cart"
          className="flex items-center justify-start transition-transform transform hover:translate-x-2 hover:duration-300"
        >
          <AiOutlineShoppingCart
            title="Cart"
            size={26}
            className=" mr-2 mt-[3rem]"
          />
          <span className="nav-item-name hidden  mt-[3rem] uppercase transition-opacity duration-500 ">
            cart
          </span>
          <div className="absolute top-7">
            {cartItems.length > 0 && (
              <span>
                <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
                  {cartItems.reduce((acc, ci) => acc + ci.qty, 0)}
                </span>
              </span>
            )}
          </div>
        </Link>
        <Link
          to="/favorite"
          className="flex items-center justify-start transition-transform transform hover:translate-x-2 hover:duration-300"
        >
          <FaHeart size={24} className=" mr-2 mt-[3rem]" title="favorite" />
          <span className="nav-item-name hidden  mt-[3rem] uppercase transition-opacity duration-500 ">
            favorite
          </span>
          <FavoriteCount /> {/*count of the favorite items*/}
        </Link>
      </div>
      <div className="relative flex  text-white focus:outline-none  w-full ">
        <button
          onClick={toggleDropdown}
          className="flex items-center gap-1 text-white capitalize"
        >
          {userInfo ? (
            <div className="flex items-center justify-center  gap-2">
              <AiOutlineUser size={23} />
              {
                <span className="nav-item-name  uppercase transition-opacity duration-500 ">
                  {userInfo?.username || ""}
                </span>
              }
              {/* <span className="text-white"></span> */}
            </div>
          ) : (
            <></>
          )}

          {userInfo ? dropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown /> : ""}
        </button>

        <div className="relative flex items-center justify-center ml-[20px] ">
          {dropdownOpen && userInfo && (
            <ul
              className={`dashboard-ul absolute ${
                userInfo.isAdmin ? " -top-80" : "-top-24"
              } outline-none border-none flex flex-col items-center justify-center -ml-[50px] bg-white text-gray-600 w-[135px] border rounded z-50`}
            >
              <span className="mask absolute bg-black top-0 left-0 h-[100%] w-[100%] pointer-events-none "></span>
              {/*  if the user is admin show all the possible places he can go */}
              {userInfo.isAdmin && (
                <>
                  <li className="dashboard-item rounded-xl hover:transform hover:scale-[0.9] m-0 p-0 hover:transition-all hover:text-pink-500 active:font-semibold   hover:duration-200">
                    <Link
                      to="/admin/dashboard"
                      className="block px-4 py-2 hover:bg-gray-100 capitalize"
                    >
                      Dashboard
                    </Link>
                  </li>

                  <li className="dashboard-item rounded-xl hover:transform hover:scale-[0.9] m-0 p-0 hover:transition-all hover:text-pink-500 active:font-semibold   hover:duration-200">
                    <Link
                      to="/admin/productlist"
                      className="block px-4 py-2 hover:bg-gray-100 capitalize"
                    >
                      Add products
                    </Link>
                  </li>
                  <li className="dashboard-item rounded-xl hover:transform hover:scale-[0.9] m-0 p-0 hover:transition-all hover:text-pink-500 active:font-semibold   hover:duration-200">
                    <Link
                      to="/admin/categorylist"
                      className="block px-4 py-2 hover:bg-gray-100 capitalize"
                    >
                      category
                    </Link>
                  </li>
                  <li className="dashboard-item rounded-xl hover:transform hover:scale-[0.9] m-0 p-0 hover:transition-all hover:text-pink-500 active:font-semibold   hover:duration-200">
                    <Link
                      to="/admin/orderList"
                      className="block px-4 py-2 hover:bg-gray-100 capitalize"
                    >
                      orders
                    </Link>
                  </li>
                  <li className="dashboard-item rounded-xl hover:transform hover:scale-[0.9] m-0 p-0 hover:transition-all hover:text-pink-500 active:font-semibold   hover:duration-200">
                    <Link
                      to="/admin/userList"
                      className="block px-4 py-2 hover:bg-gray-100 capitalize"
                    >
                      users
                    </Link>
                  </li>
                </>
              )}
              {/*  if the user is user show all the possible places he can go which ,is profile and logout  */}
              <li className="dashboard-item rounded-xl hover:transform hover:scale-[0.9] m-0 p-0 hover:transition-all hover:text-pink-500 active:font-semibold   hover:duration-200">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100 capitalize"
                >
                  profile
                </Link>
              </li>
              <li className="dashboard-item rounded-xl hover:transform hover:scale-[0.9] m-0 p-0 hover:transition-all hover:text-pink-500 active:font-semibold   hover:duration-200">
                <Link
                  to="/logout"
                  onClick={logoutHandler}
                  className="block px-4 py-2 hover:bg-gray-100 capitalize"
                >
                  logout
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* LOGIN AND REGISTER */}
      {/* IF THE USER IS NOT LOGGED SHOW LOGIN REGISTER BUTTON   */}
      {!userInfo && (
        <ul className="flex flex-col items-start justify-start">
          <li>
            <Link
              to="/login"
              className="flex items-center justify-start transition-transform transform hover:translate-x-2 hover:duration-300"
            >
              <AiOutlineLogin
                size={24}
                title="Login"
                className=" mr-2 mt-[3rem]"
              />
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
              <AiOutlineUserAdd
                size={24}
                title="Register"
                className=" mr-2 mt-[3rem]"
              />
              <span className="nav-item-name hidden  mt-[3rem] uppercase transition-opacity duration-500 ">
                register
              </span>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navigation;
