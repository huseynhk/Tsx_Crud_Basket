import { useEffect, useState } from "react";
import { ROUTER } from "../../constant/Router";
import { useParams, useNavigate } from "react-router-dom";
import { updateUser } from "../../services";
import { toast } from "react-toastify";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { User, GlobalProps } from "../../interfaces/data";
import {
  isValidEmail,
  isValidPassword,
  isValidPhone,
} from "../../constant/ValidRegex";
import { useGlobalContext } from "../../context/GlobalContext";

const initialStateUser: User = {
  name: "",
  email: "",
  password: "",
  address: "",
  image: "",
  phone: "",
  type: "USER",
};

const UserEdit = () => {
  const { showPassword, setShowPassword, loggedInUser } =
    useGlobalContext() as GlobalProps;
  const { id } = useParams();
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState<User>(initialStateUser);
  const [loading, setLoading] = useState(false);
  const isEmpty: boolean = Object.values(newUser).some((value) => value === "");

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

    try {
      setLoading(true);
      await updateUser(Number(id), newUser);
      localStorage.setItem("loggedInUser", JSON.stringify(newUser));
      setNewUser(initialStateUser);
      toast.success("User edited successfully!", {
        autoClose: 1500,
      });
      setTimeout(() => {
        navigate(ROUTER.User);
      }, 1500);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (loggedInUser) {
      setNewUser(loggedInUser);
    }
  }, [loggedInUser]);

  return (
    <>
      <div className=" flex justify-center items-center h-screen">
        <div className="  bg-gray-950 px-10 py-10 rounded-md">
          <div className="">
            <h1 className="text-center text-blue-200 text-3xl mb-4 font-bold">
              Edit User
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

          <div className=" flex justify-center items-center flex-col mb-3">
            <button
              onClick={handleSubmit}
              className="bg-gray-800 text-gray-200 py-1 px-4 rounded-md text-xl font-bold"
            >
              {loading ? "Editing" : "Edit"}
            </button>
          </div>
          <div>
            <button
              onClick={() => navigate(ROUTER.User)}
              className="text-cyan-300 font-bold ml-3 text-xl hover:opacity-90 transition duration-300"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserEdit;
