import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTER } from "../../../constant/Router";
import { GlobalProps } from "../../../interfaces/data";
import { toast } from "react-toastify";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { isValidEmail, isValidPassword } from "../../../constant/ValidRegex";
import { useGlobalContext } from "../../../context/GlobalContext";

const Login = () => {
  const {
    showPassword,
    setShowPassword,
    confirmPassword,
    setConfirmPassword,
    users,
  } = useGlobalContext() as GlobalProps;

  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const isEmpty: boolean = email === "" || password === "";

  const handleLogin = () => {
    setLoading(true);

    setTimeout(() => {
      const matchedUser = users?.find(
        (user) =>
          user.email === email.trim() && user.password === password.trim()
      );

      if (isEmpty) {
        toast.error("Please fill in all fields", {
          autoClose: 1000,
        });
        setLoading(false);
        return;
      }

      if (!matchedUser) {
        toast.error("User does not exist. Please register first", {
          autoClose: 1500,
        });
        setLoading(false);
        return;
      }

      if (!isValidEmail(email)) {
        toast.error("Invalid email address", {
          autoClose: 1500,
        });
        setLoading(false);
        return;
      }

      if (!isValidPassword(password)) {
        toast.error(
          "Password must be between 5 - 10, and contain at least 1 letter and 1 number",
          {
            autoClose: 2500,
          }
        );
        setLoading(false);
        return;
      }

      if (matchedUser.password !== password) {
        toast.error("Incorrect password. Please try again", {
          autoClose: 1500,
        });
        setLoading(false);
        return;
      }

      if (password !== confirmPassword) {
        toast.error("Password and confirm password do not match", {
          autoClose: 1500,
        });
        setLoading(false);
        return;
      }

      localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
      toast.success("Login is successful!", {
        autoClose: 1000,
      });

      setTimeout(() => {
        setLoading(false);
        navigate(ROUTER.Product);
      }, 1600);

      setTimeout(() => {
        window.location.reload();
      }, 1700);
    }, 1000);
  };

  return (
    <>
      <div className=" flex justify-center items-center h-screen">
        <div className=" bg-gray-950 px-10 py-10 rounded-md">
          <div>
            <h1 className="text-center text-blue-200 text-3xl mb-6 font-bold">
              Login
            </h1>
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" bg-gray-700 mb-4 px-4 py-4 w-full lg:w-[20em] rounded-sm text-white placeholder:text-gray-200 outline-none"
              placeholder="Email"
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=" bg-gray-700 mb-4 px-4 py-4 w-full lg:w-[20em] rounded-sm text-white placeholder:text-gray-200 outline-none"
              placeholder="Password"
            />
            {showPassword ? (
              <LuEyeOff
                className="absolute right-[3%] bottom-[30%]  text-[40px] text-stone-300  cursor-pointer hover:scale-105 transition-all duration-700"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <LuEye
                className="absolute right-[3%] bottom-[30%]  text-[40px] text-stone-300  cursor-pointer hover:scale-105 transition-all duration-700"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>
          <div>
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className=" bg-gray-600 mb-4  px-4 py-4 w-full lg:w-[20em] rounded-sm text-white placeholder:text-gray-200 outline-none"
              placeholder="Confirm_Password"
            />
          </div>
          <div className=" flex justify-center items-center flex-col mb-3">
            <button
              onClick={handleLogin}
              className="mt-1 bg-gray-800 text-gray-200 hover:bg-gray-700 p-3 rounded-md text-xl font-bold w-full transition duration-500 ease-in-out"
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </div>
          <div>
            <h2>
              <Link
                className=" text-cyan-300 font-bold mt-3 text-xl py-1 hover:opacity-90 transition duration-300 "
                to={ROUTER.Register}
              >
                Register
              </Link>
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
