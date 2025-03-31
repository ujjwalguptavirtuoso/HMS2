import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import axios from "axios";
import Sidebar from "../Components/Sidebar";

const AddDoctor = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [doctorDepartment, setDoctorDepartment] = useState("");
  const [docAvatar, setDocAvatar] = useState("");
  const [docAvatarPreview, setDocAvatarPreview] = useState("");

  const navigateTo = useNavigate();

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setDocAvatarPreview(reader.result);
      setDocAvatar(file);
    };
  };

  const handleAddNewDoctor = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("nic", nic);
      formData.append("dob", dob);
      formData.append("gender", gender);
      formData.append("doctorDepartment", doctorDepartment);
      formData.append("avatar", docAvatar);
      await axios
        .post(
          "http://localhost:8000/api/v1/users/doctor/register",
          // "https://e-healthcare-management-system-2.onrender.com/api/v1/users/doctor/register",
          formData,
          {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigateTo("/admin");
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setNic("");
          setDob("");
          setGender("");
          setPassword("");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className=" w-full flex items-center">
        <div className="w-full pl-7 pt-7 pr-7">
          <div className="add-admin-form bg-sky-200 w-full h-fit rounded-2xl px-5 py-3 flex flex-col items-center">
            <h1 className="font-semibold text-3xl mt-3 mb-5">Add New Doctor</h1>
            <div className="w-full h-fit mb-10">
              <form onSubmit={handleAddNewDoctor}>
                <div className="flex justify-around mb-6 items-center">
                  <input
                    className="h-10 bg-zinc-200 rounded-2xl px-4 items-center"
                    type="file"
                    onChange={handleAvatar}
                  />
                </div>
                <div className="flex justify-around mb-6">
                  <input
                    className="w-1/3 h-10 bg-zinc-200 rounded-2xl px-4"
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <input
                    className="w-1/3 h-10 bg-zinc-200 rounded-2xl px-4"
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="flex justify-around mb-6">
                  <input
                    className="w-1/3 h-10 bg-zinc-200 rounded-2xl px-4"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    className="w-1/3 h-10 bg-zinc-200 rounded-2xl px-4"
                    type="number"
                    placeholder="Mobile Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="flex justify-around mb-6">
                  <input
                    className="w-1/3 h-10 bg-zinc-200 rounded-2xl px-4"
                    type="text"
                    placeholder="Aadhar No."
                    value={nic}
                    onChange={(e) => setNic(e.target.value)}
                  />
                  <input
                    className="w-1/3 h-10 bg-zinc-200 rounded-2xl px-4"
                    type="text"
                    placeholder="Date Of Birth"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                </div>
                <div className="flex justify-around mb-6">
                  <label className="w-1/3 h-10 bg-zinc-200 rounded-2xl px-4">
                    <select
                      className="w-full h-10 bg-zinc-200 rounded-2xl border-0"
                      name="selectedGender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option className="w-fit" value="">
                        Gender
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">prefer not to say</option>
                    </select>
                  </label>
                  <input
                    className="w-1/3 h-10 bg-zinc-200 rounded-2xl px-4"
                    type="text"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="w-full flex justify-center">
                  <label className="w-1/3 h-10 bg-zinc-200 rounded-2xl px-4">
                    <select
                      className="w-fit h-10 bg-zinc-200 rounded-2xl  border-0"
                      name="selectedGender"
                      value={doctorDepartment}
                      onChange={(e) => {
                        setDoctorDepartment(e.target.value);
                      }}
                    >
                      <option value="">Select Department</option>
                      {departmentsArray.map((depart, index) => {
                        return (
                          <option value={depart} key={index}>
                            {depart}
                          </option>
                        );
                      })}
                    </select>
                  </label>
                </div>
                <div className="flex w-full justify-center mt-6">
                  <button
                    className="w-96 bg-[#76dbcf] rounded-2xl h-10 font-semibold"
                    type="submit"
                  >
                    ADD NEW DOCTOR
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDoctor;
