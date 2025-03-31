import React, { useContext, useState } from "react";
import { MdOutlineMailLock } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoRemoveOutline } from "react-icons/io5";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { useLocation } from "react-router-dom";

const login = () => {
  // const location= useLocation()
  // const patient = location.state?.patient
  // console.log(patient)
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();
  const goToRegister = () => {
    navigateTo("/register");
  };
  const goToHome = () => {
    navigateTo("/");
  };

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axios
  //       .post(
  //         "http://localhost:8000/api/v1/users/login",
  //         { email, password, confirmPassword: password, role: "Patient" },
  //         {
  //           //withCredentials: true,
  //           headers: { "Content-Type": "application/json" },
  //         }
  //       )
  //       .then((res) => {
  //         toast.success(res.data.message);
  //         setIsAuthenticated(true);
  //         navigateTo("/");
  //         setEmail("");
  //         setPassword("");
  //       });
  //   } catch (error) {
  //     toast.error(error.response.data.message);
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        { email, password, confirmPassword: password, role: "Patient" },
        {
          // headers: {
          //   "Content-Type": "application/json",
          // },
          withCredentials:true,
        }
      );

      const { token, user } = response.data;
      localStorage.setItem("authToken", token); // Save the token to localStorage
      localStorage.setItem("patient", JSON.stringify(user));

      toast.success(response.data.message);
      setIsAuthenticated(true);
      navigateTo("/");
      setEmail("");
      setPassword("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="flex">
        <div className="w-1/2 h-screen flex flex-col place-content-center">
          <h2 className="text-4xl flex w-full mb-5 justify-center font-bold">
            Sign In
          </h2>
          <div>
            <form
              className="flex flex-col justify-center items-center"
              onSubmit={handleLogin}
            >
              <div className="flex items-center w-72 h-10 bg-zinc-200 px=5 rounded-2xl mb-6">
                <MdOutlineMailLock className="ml-4" />
                <input
                  className="bg-zinc-200 h-10 px-5 outline-none"
                  type="email"
                  placeholder="Email"
                  required="required"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex items-center w-72 h-10 bg-zinc-200 px=5 rounded-2xl mb-6">
                <RiLockPasswordLine className="ml-4" />
                <input
                  className="bg-zinc-200 h-10 px-5 outline-none"
                  type="password"
                  placeholder="Password"
                  required="required"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                className="w-40 bg-[#76dbcf] rounded-2xl h-10 font-semibold"
                type="submit"
              >
                Login
              </button>
            </form>
          </div>
        </div>
        <div className="w-1/2 h-screen bg-[#76dbcf] flex flex-col place-content-center items-center rounded-l-full">
          <h2 className="text-4xl flex w-full justify-center font-bold">
            Hello, We are CureSync!!
          </h2>
          <IoRemoveOutline size={80} />
          <p className="text-2xl flex w-full justify-center mb-6">
            We care for our patient's health
          </p>
          <button
            className="w-40  rounded-2xl h-10 font-semibold border-solid border-2 border-black"
            onClick={goToRegister}
          >
            Sign Up
          </button>
          <button
            className="w-44 mt-5 rounded-2xl h-10 font-semibold border-solid border-2 border-black"
            onClick={goToHome}
          >
            Home
          </button>
        </div>
      </div>
    </>
  );
};

export default login;
