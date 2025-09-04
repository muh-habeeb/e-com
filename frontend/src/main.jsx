// This file is the entry point of the React application
// Imports for React and ReactDOM
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Imports for routing
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router";

// Redux store provider
import { Provider } from "react-redux";


// Main app and styles
import App from "./App";
import "./index.css";

// Component imports
import ErrorPage from "./components/ErrorPage.jsx";
import store from "./redux/store.js";

// Auth related components
import Login from "./pages/Auth/Login.jsx";
import Logout from "./pages/Auth/LogOut.jsx";
import Register from "./pages/Auth/Register.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

// User components
import Profile from "./pages/Users/Profile.jsx";

// Admin components
import AdminRoute from "./pages/Admin/AdminRoute.jsx";
import UserList from "./pages/Admin/UserList.jsx";
import CategoryList from "./pages/Admin/CategoryList.jsx";
import ProductList from "./pages/Admin/ProductList.jsx";
import ProductUpdate from "./pages/Admin/ProductUpdate.jsx";
import AllProducts from "./pages/Admin/AllProducts.jsx";

// Product related components
import Home from "./pages/Home.jsx";
import Favorites from "./pages/products/Favorites.jsx";
import ProductDetails from "./pages/products/ProductDetails.jsx";

// cart related components
import Cart from "./pages/Cart.jsx";

// cart related components
import Shop from "./pages/Shop.jsx";
import Shipping from "./pages/Orders/Shipping.jsx";
import Order from "./pages/Orders/Order.jsx";
import PlaceOrder from "./pages/Orders/PlaceOrder.jsx";
import UserOrder from "./pages/Users/UserOrder.jsx";
//  define routes

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* for error redetection */}
      {/* <Route path="*" element={<ErrorPage />} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/logout" element={<Logout />} />
      <Route pah="" index={true} element={<Home />} /> {/* main HOME page*/}
      <Route path="/favorite" element={<Favorites />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      {/*cart page */}
      <Route path="/cart" element={<Cart />} />
      <Route path="/shop" element={<Shop />} /> {/*shop page */}
      <Route path="/user-orders" element={<UserOrder />} /> {/*shop page */}
      {/* private  for registered users*/}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/shipping" element={<Shipping />} /> {/*shipping page */}
        <Route path="/placeorder" element={<PlaceOrder />} />
        {/*shipping page */}
        <Route path="/order/:id" element={<Order />} /> {/*order page */}
      </Route>
      {/* admin route */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route path="userList" element={<UserList />} />
        <Route path="categoryList" element={<CategoryList />} />
        <Route path="productlist" element={<ProductList />} />
        <Route path="allproductslist" element={<AllProducts />} />
        <Route path="product/update/:_id" element={<ProductUpdate />} />
      </Route>
    </Route>
  )
);
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {""}
    {/* redux thing*/}
    <StrictMode>
        <RouterProvider router={router} /> {/* router dom thing*/}
    </StrictMode>
  </Provider>
);
