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

//  define routes

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App></App>}>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/logout" element={<Logout />}></Route>
      <Route path="/register" element={<Register />}></Route>
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
