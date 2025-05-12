import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import store from "./redux/store.js";
import Login from "./pages/Auth/Login.jsx";
import Logout from "./pages/Auth/LogOut.jsx";
import Register from "./pages/Auth/Register.jsx";
import { PrivateRoute } from "./components/PrivateRoute.jsx";
import Profile from "./pages/Users/Profile.jsx";
import { AdminRoute } from "./pages/Admin/AdminRoute.jsx";
import { UserList } from "./pages/Admin/UserList.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import CategoryList from "./pages/Admin/CategoryList.jsx";

//  define routes

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      {""}
      {/* for error redetection */}

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
      </Route>
      {/* admin route */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route path="userlist" element={<UserList />} />
        <Route path="categorylist" element={<CategoryList />} />
      </Route>
    </Route>
  )
);
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* <StrictMode> */}
    <RouterProvider router={router} />
    {/* </StrictMode> */}
  </Provider>
);
