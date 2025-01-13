import { User, GlobalProps } from "../../../interfaces/data";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ROUTER } from "../../../constant/Router";
import React, { useState } from "react";
import { addUser } from "../../../services";
import { LuEye, LuEyeOff } from "react-icons/lu";
import {
  isValidEmail,
  isValidPassword,
  isValidPhone,
} from "../../../constant/ValidRegex";
import { useGlobalContext } from "../../../context/GlobalContext";

const initialStateUser: User = {
  name: "",
  email: "",
  password: "",
  address: "",
  image: "",
  phone: "",
  type: "USER",
};

const Register = () => {
  const { showPassword, setShowPassword, confirmPassword, setConfirmPassword } =
    useGlobalContext() as GlobalProps;
  const [newUser, setNewUser] = useState<User>(initialStateUser);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "confirmPassword") {
      setConfirmPassword(value);
    } else {
      setNewUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
  };

  const isEmpty: boolean = Object.values(newUser).some((value) => value === "");
  const isPasswordMismatch: boolean = newUser.password !== confirmPassword;

  const handleSubmit = async () => {
    if (isEmpty) {
      toast.error("Please fill in all fields", {
        autoClose: 1000,
      });
      return;
    }

    if (!isValidEmail(newUser.email)) {
      toast.error("Invalid email address", {
        autoClose: 1500,
      });
      return;
    }

    if (!isValidPhone(newUser.phone)) {
      toast.error("Invalid phone number", {
        autoClose: 1500,
      });
      return;
    }
    if (!isValidPassword(newUser.password)) {
      toast.error(
        "Password must be between 5 - 10 , at least 1 letter and 1 number",
        {
          autoClose: 3000,
        }
      );
      return;
    }
    if (isPasswordMismatch) {
      toast.error("Password and confirm password do not match", {
        autoClose: 1000,
      });
      return;
    }
    try {
      setLoading(true);
      await addUser(newUser);
      toast.success("Register is successfully!", {
        autoClose: 1500,
      });
      localStorage.setItem("loggedInUser", JSON.stringify(newUser));
      setNewUser(initialStateUser);
      setConfirmPassword("");
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      setTimeout(() => {
        navigate(ROUTER.Home);
      }, 1500);
      setTimeout(() => {
        window.location.reload();
      }, 1600);
    } catch (error) {
      console.error("Error adding User:", error);
      toast.error("Error adding User", {
        autoClose: 1000,
      });
    }
  };

  return (
    <>
      <div className=" flex justify-center items-center h-screen">
        <div className="  bg-gray-950 px-10 py-7 rounded-md">
          <div className="">
            <h1 className="text-center text-blue-200 text-2xl mb-3 font-bold">
              Register
            </h1>
          </div>
          <div>
            <input
              type="text"
              name="name"
              value={newUser.name}
              onChange={handleInputChange}
              className=" bg-gray-600 mb-4 px-4 py-4 w-full lg:w-[20em] rounded-sm text-white placeholder:text-gray-200 outline-none"
              placeholder="Name"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
              className=" bg-gray-600 mb-4  px-4 py-4 w-full lg:w-[20em] rounded-sm text-white placeholder:text-gray-200 outline-none"
              placeholder="Email"
            />
          </div>
          <div>
            <input
              type="text"
              name="image"
              value={newUser.image}
              onChange={handleInputChange}
              className=" bg-gray-600 mb-4  px-4 py-4 w-full lg:w-[20em] rounded-sm text-white placeholder:text-gray-200 outline-none"
              placeholder="Image_URL"
            />
          </div>
          <div>
            <input
              type="text"
              name="address"
              value={newUser.address}
              onChange={handleInputChange}
              className=" bg-gray-600 mb-4  px-4 py-4 w-full lg:w-[20em] rounded-sm text-white placeholder:text-gray-200 outline-none"
              placeholder="Address"
            />
          </div>
          <div>
            <input
              type="text"
              name="phone"
              value={newUser.phone}
              onChange={handleInputChange}
              className=" bg-gray-600 mb-4  px-4 py-4 w-full lg:w-[20em] rounded-sm text-white placeholder:text-gray-200 outline-none"
              placeholder="Phone"
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={newUser.password}
              onChange={handleInputChange}
              className=" bg-gray-600 mb-4  px-4 py-4 w-full lg:w-[20em] rounded-sm text-white placeholder:text-gray-200 outline-none"
              placeholder="Password"
            />
            {showPassword ? (
              <LuEyeOff
                className="absolute right-[3%] bottom-[32%]  text-[36px] text-stone-300  cursor-pointer hover:scale-105 transition-all duration-700"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <LuEye
                className="absolute right-[3%] bottom-[32%]  text-[36px] text-stone-300  cursor-pointer hover:scale-105 transition-all duration-700"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>
          <div>
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleInputChange}
              className=" bg-gray-600 mb-6  px-4 py-4 w-full lg:w-[20em] rounded-sm text-white placeholder:text-gray-200 outline-none"
              placeholder="Confirm_Password"
            />
          </div>
          <div className=" flex justify-center items-center flex-col mb-3">
            <button
              onClick={handleSubmit}
              className="bg-gray-800 text-gray-200 hover:bg-gray-700 p-3 rounded-md text-xl font-bold w-full transition duration-500 ease-in-out"
            >
              {loading ? "Loading..." : "Register"}
            </button>
          </div>
          <div>
            <h2>
              <Link
                className=" text-cyan-300 font-bold mt-3 text-xl py-1 hover:opacity-90 transition duration-300 "
                to={ROUTER.Login}
              >
                Login
              </Link>
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
