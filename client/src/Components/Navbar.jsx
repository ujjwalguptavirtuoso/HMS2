import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";

export const Navbar = () => {
  const patient = { name: "Patient" };
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  // console.log(Context);

  // const handleLogout = async () => {
  //   await axios
  //     .get("http://localhost:8000/api/v1/users/patient/logout", {
  //       //withCredentials: true,
  //       headers: { "Content-Type": "application/json" },
  //     })
  //     .then((res) => {
  //       console.log(res)
  //       toast.success(res.data.message);
  //       setIsAuthenticated(false);
  //       navigateTo("/");
  //     })
  //     .catch((err) => {
  //       toast.error(err.response.data.message);
  //     });
  // };

  const handleLogout = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/users/patient/logout",
        {
          withCredentials: true, // Include cookies in the request
          headers: { "Content-Type": "application/json" },
        }
      );
      // console.log(res);
      toast.success(res.data.message);
      setIsAuthenticated(false);
      localStorage.removeItem("authToken"); // Remove token from localStorage
      localStorage.removeItem("patient");
      navigateTo("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed");
    }
  };
  const handleLogoutDoctor = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/users/doctor/logout",
        {
          withCredentials: true, // Include cookies in the request
          headers: { "Content-Type": "application/json" },
        }
      );
      // console.log(res);
      toast.success(res.data.message);
      setIsAuthenticated(false);
      localStorage.removeItem("authToken"); // Remove token from localStorage
      localStorage.removeItem("doctor");
      navigateTo("/logindoctor");
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed");
    }
  };
  // const Duser = localStorage.getItem("doctor");
  // console.log(Duser)
  // const Puser = localStorage.getItem("patient");
  // console.log(Puser)
  function checkPatient() {
    const token = localStorage.getItem("patient");
    if (token) {
      return true;
    } else {
      return false;
    }
  }
  const patientExists = checkPatient();
  // console.log(patientExists);
  function checkDoctor() {
    const token = localStorage.getItem("doctor");
    if (token) {
      return true;
    } else {
      return false;
    }
  }
  const doctorExists = checkDoctor();
  // console.log(doctorExists);

  const clickHandler = ()=>{
    {patientExists ?handleLogout():handleLogoutDoctor()}
  }

  const navigateTo = useNavigate();

  const goToLogin = () => {
    navigateTo("/login");
  };

  const goToRegister = () => {
    navigateTo("/register");
  };

  return (
    <nav className="w-full h-16 flex justify-between items-center px-5">
      <div className="logo w-10">
        <Link to={"/"}>
          <img className="ml-10" src="./image.png" alt="" />
        </Link>
      </div>
      <div className="nav-contains w-1/2 text-xl font-sans font-bold">
        <ul className="flex justify-between">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/appointment"}>Chat with Curesync AI</Link>
          </li>
          <li>
            <Link to={"/appointment"}>Appointment</Link>
          </li>
          {/* <li>
            <Link to={"/aboutus"}>About us</Link>
          </li>
          <li>
            <Link to={"/quick-help"}>Quick Help</Link>
          </li> */}
        </ul>
      </div>
      {isAuthenticated ? (
        <div className="flex items-center gap-6">
          <button
            className="w-32 h-10 bg-[#76dbcf] rounded-2xl font-semibold"
            onClick={clickHandler}
          >
            LOGOUT
          </button>
          <div className="profile w-14">
            {patientExists ? (
              <Link to={"/patient-home"}>
                <img src="/profile.png" alt="" />
              </Link>
            ) : (
              <Link to={"/doctor-home"}>
                <img src="/profile.png" alt="" />
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div className="flex">
          <button
            className="w-36 h-12 bg-[#76dbcf] rounded-2xl font-semibold mr-3"
            onClick={goToRegister}
          >
            REGISTER FOR DOCTOR
          </button>
          <button
            className="w-36 h-12 bg-[#76dbcf] rounded-2xl font-semibold mr-3"
            onClick={goToRegister}
          >
            REGISTER FOR PATIENT
          </button>
          <div>
            <button
              className=" realtive w-36 h-12 bg-[#76dbcf] rounded-2xl font-semibold"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              LOGIN
            </button>
            {isOpen && (
              <div className="bg-[#76dbcf] absolute flex flex-col rounded-xl w-32 mt-3 font-semibold items-center">
                <Link to={"/login"} className="py-2">
                  Patient
                </Link>
                <Link to={"/logindoctor"} state="Doctor" className="">
                  Doctor
                </Link>
                <Link to={"/loginadmin"} state="Admin" className="py-2">
                  Admin
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
