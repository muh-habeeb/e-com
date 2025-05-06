import { useEffect, useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

function Register() {
  return <div>Register</div>;
}

export default Register;
