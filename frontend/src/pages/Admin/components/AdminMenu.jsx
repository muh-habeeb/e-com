import { useState } from "react";
import { NavLink } from "react-router";
import { FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";

const AdminMenu = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  const { userInfo } = useSelector((state) => state.auth);
  return (
    /* Admin menu component */
    <div>
      {userInfo?.isAdmin && (
        <>
        <button
          className={`${isMenuOpen ? " top-5 right-7" : "top-5 right-7"
            } bg-[#151515] fixed rounded`}
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <FaTimes color="white" size={30} />
          ) : (
            <>
              <div className="w-6 h-1 bg-white my-1"></div>
              <div className="w-6 h-1 bg-white my-1"></div>
              <div className="w-6 h-1 bg-white my-1"></div>
            </>
          )}
        </button>
        {isMenuOpen && (
          <section className="bg-sky-950 rounded-lg p-3 fixed right-7 top-16">
            <ul className="list-none mt-2">
              <li>
                <NavLink
                  className={
                    " py-2 px-3 block mb-2 hover:bg-emerald-700 transition-all duration-200 capitalize text-md font-medium rounded-md "
                  }
                  style={({ isActive }) => ({
                    color: isActive ? "yellowgreen" : "white",
                  })}
                  to="/admin/dashboard"
                >
                  admin dashboard
                </NavLink>
              </li>

              <li>
                <NavLink
                  className={
                    " py-2 px-3 block mb-2 hover:bg-emerald-700 transition-all duration-200 capitalize text-md font-medium rounded-md "
                  }
                  style={({ isActive }) => ({
                    color: isActive ? "yellowgreen" : "white",
                  })}
                  to="/admin/categorylist"
                >
                  Category
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={
                    " py-2 px-3 block mb-2 hover:bg-emerald-700 transition-all duration-200 capitalize text-md font-medium rounded-md "
                  }
                  style={({ isActive }) => ({
                    color: isActive ? "yellowgreen" : "white",
                  })}
                  to="/admin/productlist"
                >
                  Create product
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={
                    " py-2 px-3 block mb-2 hover:bg-emerald-700 transition-all duration-200 capitalize text-md font-medium rounded-md "
                  }
                  style={({ isActive }) => ({
                    color: isActive ? "yellowgreen" : "white",
                  })}
                  to="/admin/allproductslist"
                >
                  all products
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={
                    " py-2 px-3 block mb-2 hover:bg-emerald-700 transition-all duration-200 capitalize text-md font-medium rounded-md "
                  }
                  style={({ isActive }) => ({
                    color: isActive ? "yellowgreen" : "white",
                  })}
                  to="/admin/userlist"
                >
                  manage users
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={
                    " py-2 px-3 block mb-2 hover:bg-emerald-700 transition-all duration-200 capitalize text-md font-medium rounded-md "
                  }
                  style={({ isActive }) => ({
                    color: isActive ? "yellowgreen" : "white",
                  })}
                  to="/admin/orderlist"
                >
                  manage orders
                </NavLink>
              </li>
            </ul>
          </section>
        )}
      </>
    )}
  </div>
);
}
export default AdminMenu;
